import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { GET_ALL_SELECTION_GROUPS } from '../services/graphql';
import { Selection } from '../types/selection';

export const useListSelectionGroups = () => {
  let queryKey = ['setting_selectionGroups'];

  const response = usePost<BaseResponse<Selection[]>>(queryKey, GET_ALL_SELECTION_GROUPS, {});
  return response;
};
