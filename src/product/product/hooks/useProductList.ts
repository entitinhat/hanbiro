import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@product/product/config/queryKeys';
import { getListQuery } from '@base/utils/helpers/schema';
import { Product } from '../types/product';
import { LIST_STALE_TIME } from '@base/config/constant';
import _ from 'lodash';
import { RESTORE_SCHEMA } from '@base/utils/helpers/schema';
import * as keyNames from '@product/product/config/keyNames';

export const useProductList = (listSchema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: undefined };

  const queryKey = [queryKeys.listProduct, keyStringify(params?.filter, '')];
  const queryString = getListQuery(queryKeys.listProduct, [listSchema, RESTORE_SCHEMA, 'isRead', keyNames.KEY_PRODUCT_CODE].join('\n'));

  const {
    data: results = fallback,
    refetch,
    status
  } = usePosts<Product[]>(queryKey, queryString, params, {
    ...opts,
    keepPreviousData: true,
    staleTime: LIST_STALE_TIME,
    enabled: listSchema != ''
  });

  return { results, refetch, status };
};
