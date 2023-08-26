import usePosts from '@base/hooks/usePosts';
import usePublicPosts from '@base/hooks/publics/usePublicPosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@product/product/config/queryKeys';
import { GET_PRODUCTS_LIST, GET_PUBLIC_PRODUCTS_LIST } from '@product/product/services/graphql';

export const useProductsAutoComplete = (params: any, isPublic?: boolean) => {
  //const menu = isPublic ? 'site_products' : 'product_products';
  let usePostResult = null;
  if (isPublic) {
    usePostResult = usePublicPosts<any[]>(
      [queryKeys.listTrackingProduct, keyStringify(params?.filter, '')],
      GET_PUBLIC_PRODUCTS_LIST,
      params
    );
  } else {
    usePostResult = usePosts<any[]>([queryKeys.listProduct, keyStringify(params?.filter, '')], GET_PRODUCTS_LIST, params);
  }

  return usePostResult;
};
