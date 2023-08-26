import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@product/product/config/queryKeys';
import { GET_PRODUCTS_LIST } from '@product/product/services/graphql'; 
import { User } from '@base/types/user';

import { Customer } from '@customer/types/interface';

interface Product {
    [x: string]: any;
    createdAt?: Date;
    createdBy?: User;
    vendors?: Customer[];
  }

const useProducts = (params: any, opts?: any) => {
  const results: any = usePosts<Product[]>([queryKeys.listProduct, keyStringify(params, '')], GET_PRODUCTS_LIST, params, opts);
  return results;
};

export default useProducts