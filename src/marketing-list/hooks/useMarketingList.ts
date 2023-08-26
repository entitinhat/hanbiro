import { usePost } from '@base/hooks/usePost';
import { marketingQueryKeys } from '@marketing-list/config/queryKeys';
import { getViewQuery } from '@base/utils/helpers/schema';
// import { Customer } from '@marketing-list/types/interface';

export const useMarketingList = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [marketingQueryKeys.marketingListGet, id, 'view'];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas: [schemas].join('\n') });
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
