import { FilterInput } from '@base/types/common';
import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { GET_DESK_TAGS } from '@settings/preferences/services/graphql/desk';
import { Tag } from '@settings/preferences/types/desk/tag';

export const useGetAllTag = (keyword: string, options?: any) => {
  let filter: FilterInput = {
    query: `name:${keyword}`
  };
  let queryKey = [queryKeys.tags, keyword];
  let params = {
    filter
  };
  const response = usePost<BaseResponse<Tag[]>>(queryKey, GET_DESK_TAGS, params, {
    ...options
  });
  return response;
};
