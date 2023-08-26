import { Activity } from '@activity/types/activity';
import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '../config/queryKeys';
import { GET_ALL_TICKET_REPLIED_ACTIVITIES } from '../services/graphql';
import { MENU_DESK, MENU_DESK_TICKET, MENU_SOURCE } from '@base/config/menus';
//  menuSourceId:  "dcbacf52-2332-47f3-97ba-9cd6ddf743ab",
// menuSource:"MENU_DESK_TICKET"
export const useTicketRepliedActivities = (ticketId: string) => {
  const menuSource = MENU_SOURCE[MENU_DESK_TICKET]; // nhớ chuyển về menu desk ticket khi push
  const menuSourceId = ticketId;
  let queryKey = [queryKeys.relatedActivities, menuSource, menuSourceId];
  let params = {
    source: {
      menu: menuSource,
      id: menuSourceId
    },
    filter: {
      query: 'type=TYPE_EMAIL,TYPE_SMS'
    }
  };
  const response = usePost<BaseResponse<Activity>>(queryKey, GET_ALL_TICKET_REPLIED_ACTIVITIES, params, {
    // initialData: ticketKnowledgeBasesFakeData(),
  });
  return response;
};
