import { usePost } from '@base/hooks/usePost';
import { queryKeys } from '@lead/config/queryKeys';
import { getViewQuery, RESTORE_SCHEMA } from '@base/utils/helpers/schema';

export const useLead = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.leadGet, id, 'view'];

  const query: string = getViewQuery({ queryKey, schemas: [schemas, RESTORE_SCHEMA].join('\n') });
  const variables: any = {
    id: id
  };
  const response = usePost<any>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
    // cacheTime: 0
  });
  return response;
};
