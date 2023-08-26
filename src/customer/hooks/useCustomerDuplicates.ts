//project
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers/generalUtils';

//menu
import { customerQueryKeys } from '@customer/config/queryKeys';
import { CUSTOMER_DUPLICATES_GET } from '@customer/services/graphql';

export default function useCustomerDuplicates(params: any) {
  const usePostResult = usePosts<any[]>(
    [customerQueryKeys.customerDuplicatesGet, keyStringify(params?.filter, '')],
    CUSTOMER_DUPLICATES_GET,
    params,
    {
      enabled: params?.filter?.query?.length > 0
    }
  );

  return usePostResult;
}
