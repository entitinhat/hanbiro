import { queryKeys } from '@product/product/config/queryKeys';
import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { User } from '@base/types/user';
import { GET_PRODUCT_ASSIGN_REPS } from '../services/graphql';

interface Props {
  prodId?: string;
}

export const useAssignRep = ({ prodId }: Props) => {
  let queryKey = [queryKeys.listAssignRep, prodId];
  const response = usePost<BaseResponse<User[]>>(queryKey, GET_PRODUCT_ASSIGN_REPS, { prodId: prodId });
  return response;
};
