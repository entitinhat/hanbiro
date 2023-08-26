import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '@settings/general/config/queryKeys';
import { GET_MERGE_FIELDS } from '@settings/general/services/personalize/graphql';
import { MergeField } from '@settings/general/types/mergefield';

export const useGetMergeField = (params?: any) => {
  const paramsKey = params ? JSON.stringify(params) : '';
  const queryKey = [queryKeys.settingMergeFieldGet, paramsKey];

  const response = usePost<BaseResponse<MergeField[]>>(queryKey, GET_MERGE_FIELDS, params);
  return response;
};
