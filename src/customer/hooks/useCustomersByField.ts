//project
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers/generalUtils';

//menu
import { customerQueryKeys } from '@customer/config/queryKeys';
import { CUSTOMER_LIST_FOR_SELECT } from '@customer/services/graphql';

export default function useCustomersByField(params: any) {
  const usePostResult = usePosts<any[]>(
    [customerQueryKeys.customersGet, keyStringify(params?.filter, '')],
    CUSTOMER_LIST_FOR_SELECT,
    params,
    {
      enabled: params?.filter?.query?.length > 0
    }
  );

  return usePostResult;
}
