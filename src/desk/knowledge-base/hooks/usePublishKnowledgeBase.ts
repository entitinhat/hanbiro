import usePost from '@base/hooks/usePost';
import { queryKeys } from '../config/queryKeys';
import { KNOWLEDGE_DETAIL_MODAL } from '../services/graphql';
import { KnowledgeBase } from '../types/knowledge';

export const usePublishKnowledgeBase = (id: string) => {
  let queryKey = [queryKeys.knowledgebase, id];
  let params = {
    id
  };
  const response = usePost<KnowledgeBase>(queryKey, KNOWLEDGE_DETAIL_MODAL, params, {
    enabled: id != ''
  });
  return response;
};
