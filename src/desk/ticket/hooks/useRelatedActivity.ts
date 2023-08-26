import { RelatedActivity } from '@activity/types/activity';
import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '../config/queryKeys';
import { GET_ALL_TICKET_TODOS } from '../services/graphql';
export const useRelatedActivity = (menuSource: string, menuSourceId: string) => {
  let queryKey = [queryKeys.relatedActivities, menuSource, menuSourceId];
  let params = {
    source: {
      menu: menuSource,
      id: menuSourceId
    },
    filter: {
      query: ''
    }
  };
  const response = usePost<BaseResponse<RelatedActivity>>(queryKey, GET_ALL_TICKET_TODOS, params, {
    // initialData: ticketKnowledgeBasesFakeData(),
  });
  return response;
};
