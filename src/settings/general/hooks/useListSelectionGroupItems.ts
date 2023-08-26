import usePost from "@base/hooks/usePost";
import { BaseResponse } from "@base/types/response";
import { GET_SELECTION_GROUP_ITEMS } from "../services/graphql";
import { Selection } from '../types/selection';

export const useListSelectionGroupItems = (parentId: string) => {
  let queryKey = ['setting_selectionGroupData', parentId];

  const response = usePost<BaseResponse<Selection[]>>(
    queryKey,
    GET_SELECTION_GROUP_ITEMS,
    {
      parentId
    },
    {
      enabled: parentId != ''
    }
  );
  return response;
};
