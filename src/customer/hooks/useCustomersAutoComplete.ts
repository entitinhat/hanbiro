import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { customerQueryKeys } from '@customer/config/queryKeys';
import { CUSTOMER_LIST_FOR_SELECT } from '@customer/services/graphql';
import { Customer } from '@customer/types/interface';

export const useCustomersAutoComplete = (params: any, opt?: any) => {
  const usePostResult = usePosts<Customer[]>(
    [customerQueryKeys.customersGet, keyStringify(params.filter, '')],
    CUSTOMER_LIST_FOR_SELECT,
    params,
    { enabled: opt?.enabled === false ? false : true }
  );

  return usePostResult;
};
