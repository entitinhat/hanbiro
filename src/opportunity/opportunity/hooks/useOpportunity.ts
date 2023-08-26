import { usePost } from '@base/hooks/usePost';
import { queryKeys } from '@opportunity/config/queryKeys';
import { getViewQuery } from '@base/utils/helpers/schema';
// import { Customer } from '@marketing-list/types/interface';

export const useOpportunity = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.opportunityGet, id, 'view'];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas: [schemas].join('\n') });
  const variables: any = {
    id: id
  };
  const response = usePost<any>(queryKey, query, variables, {
    enabled: schemas.length > 0,
    ...options
    // cacheTime: 0
  });
  return response;
};
