import usePosts from '@base/hooks/usePosts';
import { Ticket } from '@desk/ticket/types/ticket';
import { queryKeys } from '@desk/ticket/config/queryKeys';
import { GET_TICKETS_AUTO_COMPLETE } from '@desk/ticket/services/graphql';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { KNOWLEDGE_AUTO_COMPLETE } from '@desk/knowledge-base/services/graphql';

export const useKnowledgeBasesAutoComplete = (params: any) => {
  const query = params?.filter?.query ?? '';
  let queryKey = ['desk_knowledgebases', query];
  const response = usePosts<KnowledgeBase[]>(queryKey, KNOWLEDGE_AUTO_COMPLETE, params, {});
  return response;
};
