import { ctaType } from '@base/components/@hanbiro/GrapeTS/constants';
import { useConvertCtaToHTML } from '@base/components/@hanbiro/GrapeTS/containers/PreviewModal/CtaHelper';
import { authAtom } from '@base/store/atoms/auth';
import { BaseMutationResponse } from '@base/types/response';
import { SETTING_CTA_TYPE_IMAGE } from '@settings/digital/cta/config/constants';
import { useCtaAll } from '@settings/digital/cta/hooks/useCtas';
import { usGetSurveyList } from '@settings/digital/survey/hooks/useGetSurveyList';
import { useGetMergeField } from '@settings/general/hooks/merge-field/useGetMergeField';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useStorageDownloadMutation } from '../forms/useFileUploadMutation';
import { useOrg } from '../iam/useOrg';

const useRenderBlockContent = (formDownloadNodes: Element[] | null, containerNode: HTMLElement | undefined) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const auth = useRecoilValue(authAtom);
  const { id: orgId, tenantId } = useOrg();

  const { data: personalizeData } = useGetMergeField();
  const { data: surveyData } = usGetSurveyList();
  const { results: ctaData, status: ctaStatus } = useCtaAll({
    filter: {
      query: 'groupBy=all'
    }
  });

  //render personalize
  useEffect(() => {
    if (containerNode) {
      const personalizeNode = containerNode.getElementsByClassName('personalize-select');

      var nodeArr = Array.from(personalizeNode);
      nodeArr.map((node: Element) => {
        if (containerNode) {
          personalizeData?.results?.map((data: any) => {
            const fileId = node.getAttribute('source')?.split(':')[1];
            if (fileId && fileId == data.id) {
              node.outerHTML = ` <span>${data.replace}</span>`;
            }
          });
        }
      });
    }
  }, [personalizeData, formDownloadNodes]);
  //render survey
  useEffect(() => {
    if (containerNode) {
      const surveyNode = containerNode.getElementsByClassName('survey-content');
      console.log('surveyData', surveyData);
      var nodeArr = Array.from(surveyNode);
      nodeArr.map((node: Element) => {
        if (containerNode) {
          surveyData?.data?.map((data: any) => {
            if (node.getAttribute('downloadId') == data.id) {
              // node.innerHTML = ` <p>${data.replace}</p>`;
            }
          });
        }
      });
    }
  }, [surveyData, formDownloadNodes]);
  //render cta
  useEffect(() => {
    if (containerNode) {
      const ctaNode = containerNode.getElementsByClassName(ctaType);
      var nodeArr = Array.from(ctaNode);
      nodeArr.map((node: Element) => {
        if (containerNode) {
          ctaData?.data?.map((data: any) => {
            const fileId = node.getAttribute('source')?.split(':')[1];
            if (fileId && fileId == data.id) {
              console.log('~~~~ render cta data', data);
              let htmlString = '';
              switch (data?.type) {
                case SETTING_CTA_TYPE_IMAGE: {
                  htmlString = useConvertCtaToHTML.image(node, data, { auth: auth, orgId: orgId, tenantId: tenantId });
                }
              }

              // useConvertCtaToHTML.(node, data);
              node.outerHTML = htmlString;
            }
          });
        }
      });
    }
  }, [ctaData, formDownloadNodes]);
  console.log('isLoading', isLoading);
  return isLoading;
};
export default useRenderBlockContent;
