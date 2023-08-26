import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { GET_SELECTION_FIELD_ITEMS } from '../services/graphql';
import { Selection } from '../types/selection';

export const useListSelectionFieldItems = (keyName: string) => {
  let queryKey = ['setting_selectionFieldItems', keyName];

  const response = usePost<BaseResponse<Selection[]>>(
    queryKey,
    GET_SELECTION_FIELD_ITEMS,
    {
      keyName
    },
    {
      enabled: keyName != ''
    }
  );
  return response;
};
