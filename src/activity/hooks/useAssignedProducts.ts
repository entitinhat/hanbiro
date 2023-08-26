import { queryKeys } from '@activity/config/queryKeys';
import { ACTIVITY_GET_PRODUCTS } from '@activity/services/graphql';
import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { ShortProduct } from '@product/product/types/product';

export const useAssignedProducts = (menuSourceId: string) => {
  const usePostResult = usePost<BaseResponse<ShortProduct[]>>([queryKeys.products], ACTIVITY_GET_PRODUCTS, {
    id: menuSourceId
  });
  return usePostResult;
};
