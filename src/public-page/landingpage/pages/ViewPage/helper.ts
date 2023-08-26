import { Token } from '@public-page/types';
import { tokenEncoded, tokenExtract } from '@public-page/utils';
import {
  TICKET_FORM_LINK_TYPE_LANDING_PAGE,
  TICKET_FORM_LINK_TYPE_SITE,
  TICKET_FORM_LINK_TYPE_SURVEY
} from '@settings/digital/ticket-form/config/constants';

export const getUrlSource = (type: string, id: string, token: string) => {
  //46890610-1f6d-4ad3-9fcb-25fbcb58e2da
  const oldParams = tokenExtract(token);
  const tokenParam: Token = {
    ...oldParams,
    D: id // docId
  };
  switch (type) {
    case TICKET_FORM_LINK_TYPE_LANDING_PAGE:
      return `/public/landingpage/view?tk=${tokenEncoded(tokenParam)}`;
    case TICKET_FORM_LINK_TYPE_SITE:
      //@TODO: remove hard code id, this is Ticket ID
      return `/public/site/view?tk=${tokenEncoded({ ...tokenParam, D: '46890610-1f6d-4ad3-9fcb-25fbcb58e2da' })}`;
    case TICKET_FORM_LINK_TYPE_SURVEY:
      return `/public/survey/view?tk=${tokenEncoded(tokenParam)}`;
  }
};
