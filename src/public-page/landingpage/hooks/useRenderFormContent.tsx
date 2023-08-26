import useDialog from '@base/hooks/useDialog';

import { ListType } from '@base/types/app';

import useTicketWrite from '@desk/ticket/hooks/useTicketWrite';
import { SAMPLE_FORM } from '@public-page/landingpage/configs/constants';
import { getUrlSource } from '@public-page/landingpage/pages/ViewPage/helper';

import {
  TICKET_FORM_LINK_TYPE_SITE,
  TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_PAGE,
  TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_RESOURCE,
  TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE
} from '@settings/digital/ticket-form/config/constants';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { finalizeParams } from '@public-page/landingpage/utils';
import { useTicketForm } from '@public-page/landingpage/hooks/useTicketForm';
import { getGeneratedPageURL } from '@settings/digital/utils';
var submitType = '';
//@TODO: Improve performance
const useRenderFormContent = (formIds: string[] | null, containerNode: HTMLElement | undefined, option?: any) => {
  const { readOnly = false, token } = option;
  //State
  const [formTicketId, setFormTicketID] = useState('');
  const [formTicketIds, setFormTicketIds] = useState(formIds);
  const [isFinished, setIsFinished] = useState(false);

  //using this for mode private with Iframe
  const [newSource, setNewSource] = useState<string | null>(null);

  //Dialog inform users of a process that an app has performed or will perform  //
  const { enqueueDefaultDialog } = useDialog();

  //Mutation Create Ticket
  const {
    mutationAdd,
    isSuccess: isSuccessTicketCreate,
    data: ticketCreateData
  } = useTicketWrite({ isReset: false, listType: ListType.LIST });

  const navigate = useNavigate();

  //Get Ticket Form Data form formID,
  //@TODO: build viewSchema
  const { data: formTicket, isLoading, isSuccess } = useTicketForm(token, formTicketId);

  //Reset submit type when component unmounted
  useEffect(() => {
    return () => {
      submitType = '';
    };
  }, []);

  useEffect(() => {
    if (formIds == null || formIds.length == 0) setIsFinished(true);
    if (formIds && formIds.length > 0) {
      let Ids = [...formIds];
      // Set form id ticket and remove it from array ids
      setFormTicketID(Ids[0]);
      Ids.shift();
      // console.log('formTicket Ids', Ids, formIds);
      setFormTicketIds([...Ids]);
    }
  }, [JSON.stringify(formIds)]);

  //Get data from html key -> data object is {Html: string,Css:string} and build Scripts
  useEffect(() => {
    if (formTicket && !isLoading) {
      let oldData = SAMPLE_FORM;
      //if api don't return html data we will use the default Data
      if (formTicket.html) {
        oldData = JSON.parse(formTicket.html);
      }

      // html string
      const htmlStr = oldData.Html;

      // make a new parser
      const parser = new DOMParser();

      // convert html string into DOM
      const formDocument = parser.parseFromString(htmlStr, 'text/html');

      const { submissionDisplay, displayMessage, linkToPage, linkToResource, createTicket, linkToType, html, id } = formTicket;
      const FormElement = formDocument.querySelector('form');

      //Build Script for Form Element
      if (FormElement) {
        FormElement.addEventListener('submit', (event: any) => {
          //Prvent the submit event
          event.preventDefault();
          event.stopPropagation();

          if (!readOnly) {
            if (createTicket) {
              const form = event.target;
              const data = new FormData(form);
              const newParams = finalizeParams(data);
              mutationAdd(newParams);
            }
            switch (submissionDisplay) {
              case TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE:
                enqueueDefaultDialog(`${displayMessage}`);
                // console.log('evenet', event);

                break;
              case TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_PAGE:
                window.location.replace(linkToPage);
                // alert(`Hello world  ${submissionDisplay}`);

                break;
              case TICKET_FORM_SUBMISSION_DISPLAY_LINK_TO_RESOURCE:
                const { id } = linkToResource;
                //Create Ticket

                const newUrl = getUrlSource(linkToType, id, token);
                navigate(`${newUrl}`, { replace: true });
                break;
            }
          }
        });
      }
      // Replace form select box by Form element
      if (containerNode) {
        //The format of form select box has class name 'form-select'
        //@TODO: improve this, we can't detect form node by Class Name if user wants to customize class name for this element
        const formNode = containerNode.getElementsByClassName('form-select');
        var formArr = Array.from(formNode ?? []);
        formArr.map((node: Element) => {
          //For example: format is "@ticketform:260157ed-bb79-4f14-8d5d-7d49df9ccbb5"
          const fileId = node.getAttribute('source')?.split(':')[1];
          if (fileId && fileId == formTicketId && FormElement) {
            const divElement = document.createElement('div');
            const oldFormId = FormElement.id;
            //We set id for form element make its unique
            FormElement.id = id;
            //Replace css for old id to new id
            const newCss = oldData.Css.replaceAll(`${oldFormId}`, id);

            divElement.innerHTML = `<style>${newCss}</style>`;

            divElement.appendChild(FormElement);

            node.replaceWith(divElement);
          }
        });

        //In private Mode, we need use this node to parse to blob file and build iframe from this
        if (readOnly) {
          const newNode: any = containerNode;
          const nSource = getGeneratedPageURL({ html: newNode.documentElement.innerHTML ?? '', css: oldData.Css, scale: 0.9 });
          setNewSource(nSource);
        }
      }

      if (formTicketIds && formTicketIds.length > 0) {
        let Ids = [...formTicketIds];
        setFormTicketID(formTicketIds[0]);
        Ids.shift();
        setFormTicketIds([...Ids]);
      } else {
        //After finishing,Reset form Id to ''
        submitType = submissionDisplay;
        setFormTicketID('');
        setIsFinished(true);
      }
    }
  }, [formTicket, isLoading, isSuccess]);

  //Navigate to site of new ticke if create ticket successfully, and form ticket type is "Display message"
  useEffect(() => {
    if (isSuccessTicketCreate && ticketCreateData?.id && submitType == TICKET_FORM_SUBMISSION_DISPLAY_MESSAGE) {
      const siteTicketUrl = getUrlSource(TICKET_FORM_LINK_TYPE_SITE, ticketCreateData?.id, token) ?? '';
      navigate(siteTicketUrl, { replace: true });
    }
  }, [isSuccessTicketCreate, formTicket]);
  //===============================================================Debugging================================
  // console.log('formTicket', formTicketId, formTicketIds, isSuccess);
  // console.log('formTicket', formTicketId, formTicketIds);
  //console.log('isSuccess create ticket form', isLoading);
  //============================================================================================================================

  return { isFinished, isSuccessTicketCreate, isLoading, newSource };
};
export default useRenderFormContent;
