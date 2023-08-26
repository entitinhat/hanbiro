import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { User } from '@base/types/user';

import { queryKeys } from '@product/item/config/queryKeys';
import { GET_ITEM_ASSIGN_REPS } from '../services/graphql';

interface Props {
  itemId?: string;
}

export const useAssignRep = ({ itemId }: Props) => {
  let queryKey = [queryKeys.listAssignRep, itemId];
  const response = usePost<BaseResponse<User[]>>(queryKey, GET_ITEM_ASSIGN_REPS, { id: itemId });
  return response;
};
