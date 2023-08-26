import { usePost } from '@base/hooks/usePost';
import { getViewQuery, RESTORE_SCHEMA } from '@base/utils/helpers/schema';
import { queryKeys } from '@product/item/config/queryKeys';
import { Item } from '../types/item';

export const useItem = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.viewItem, id];

  const query: string = getViewQuery({ queryKey, schemas: [schemas, RESTORE_SCHEMA].join('\n') });
  const variables: any = {
    id: id
  };
  const response = usePost<Item>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
    // cacheTime: 0
  });
  return response;
};
