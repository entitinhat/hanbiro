import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@product/item/config/queryKeys';
import { Item } from '@product/item/types/item';
import { GET_ITEMS } from '../services/graphql';

export const useItems = (params: any, opts?: any) => {
  const results: any = usePosts<Item[]>([queryKeys.listItem, keyStringify(params, '')], GET_ITEMS, params, opts);
  return results;
};
