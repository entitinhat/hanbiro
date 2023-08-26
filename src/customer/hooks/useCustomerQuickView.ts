import usePost from '@base/hooks/usePost';
import { customerQueryKeys } from '@customer/config/queryKeys';
import { CUSTOMER_CUSTOMER, CUSTOMER_QUICK_VIEW } from '@customer/services/graphql';
import { CustomerQuickView } from '@customer/types/interface';

//get customer info
export const useCustomerQuickView = (id: string, defaultOptions: any[]) => {
  let params = {
    id
  };
  let queryKeys = [customerQueryKeys.customerGet, id];
  const usePostResult = usePost<CustomerQuickView>(queryKeys, CUSTOMER_QUICK_VIEW, params, {
    enabled: defaultOptions?.length === 0 || defaultOptions === null
  });

  return usePostResult;
};
