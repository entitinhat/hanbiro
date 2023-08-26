import { queryKeys } from '@activity/config/queryKeys';
import { ACTIVITY_GET_ASSIGNTOS } from '@activity/services/graphql';
import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { ShortCustomer } from '@customer/types/interface';

export const useAssignedCustomers = (menuSourceId: string) => {
  const usePostResult = usePost<BaseResponse<any[]>>([queryKeys.assignTos], ACTIVITY_GET_ASSIGNTOS, {
    id: menuSourceId
  });

  return usePostResult;
};
