import usePost from '@base/hooks/usePost';
import usePublicPost from '@base/hooks/publics/usePublicPost';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { GET_PUBLIC_TICKET_CLASSIFICATION_SETTING, GET_TICKET_CLASSIFICATION_SETTING } from '@settings/preferences/services/graphql/desk';
import { TicketClassification } from '@settings/preferences/types/desk/ticketClassification';
import { SearchFilter } from '@base/types/app';

export const useTicketClassificationsSetting = (isPublic?: boolean, token?: string, filter?: SearchFilter) => {
  //let queryKey = ['desk_ticketClassifications'];
  let variables = {};
  if (filter) {
    variables = {
      filter
    };
  }

  let response = null;
  if (isPublic) {
    response = usePublicPost<BaseResponse<TicketClassification[]>>(
      [queryKeys.publicTicketClassifications],
      GET_PUBLIC_TICKET_CLASSIFICATION_SETTING,
      { token, ...variables }
    );
  } else {
    response = usePost<BaseResponse<TicketClassification[]>>([queryKeys.ticketClassifications], GET_TICKET_CLASSIFICATION_SETTING, {
      ...variables
    });
  }

  return response;
};
