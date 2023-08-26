import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { getListQuery } from '@base/utils/helpers/schema';

import { queryKeys } from '@product/item/config/queryKeys';
import { Item } from '../types/item';

export const useItemList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: undefined };
  const newParams = { filter: params.filter };
  const {
    data: results = fallback,
    refetch,
    status
  } = usePosts<Item[]>(
    [queryKeys.listItem, keyStringify(params?.filter, ''), params.listType],
    getListQuery(queryKeys.listItem, schema),
    newParams,
    opts
  );

  return { results, refetch, status };
};
