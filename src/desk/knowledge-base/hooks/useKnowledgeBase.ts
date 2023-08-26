import { usePost } from '@base/hooks/usePost';
import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import { getViewQuery, RESTORE_SCHEMA } from '@base/utils/helpers/schema';
import { KnowledgeBase } from '../types/knowledge';

export const useKnowledgeBase = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.viewKnowledgebase, id];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas: [schemas,RESTORE_SCHEMA].join('\n') });
  const variables: any = {
    id: id
  };
  const response = usePost<KnowledgeBase>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
  });
  return response;
};
