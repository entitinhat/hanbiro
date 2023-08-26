import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@product/product/config/queryKeys';
import { GET_PRODUCTS_LIST } from '../services/graphql';
import { Product } from '../types/product';

export const useProducts = (params: any, opts?: any) => {
  const results: any = usePosts<Product[]>([queryKeys.listProduct, keyStringify(params, '')], GET_PRODUCTS_LIST, params, opts);
  return results;
};
