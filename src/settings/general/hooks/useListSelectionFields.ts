import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { GET_ALL_SELECTION_FIELDS } from '../services/graphql';
import { Selection } from '../types/selection';

export const useListSelectionFields = () => {
  let queryKey = ['setting_selectionFields'];

  const response = usePost<BaseResponse<Selection[]>>(queryKey, GET_ALL_SELECTION_FIELDS, {});
  return response;
};
