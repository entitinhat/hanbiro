import { queryKeys } from '@activity/config/queryKeys';
import { ACTIVITY_GET_TAGS } from '@activity/services/graphql';
import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';

export const useAssignedTags = (menuSourceId: string) => {
  const usePostResult = usePost<BaseResponse<string[]>>([queryKeys.tags], ACTIVITY_GET_TAGS, {
    id: menuSourceId
  });

  return usePostResult;
};
