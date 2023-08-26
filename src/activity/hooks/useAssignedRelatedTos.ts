import { queryKeys } from '@activity/config/queryKeys';
import { ACTIVITY_GET_RELATEDTOS } from '@activity/services/graphql';
import { RelatedTo } from '@activity/types/activity';
import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';

export const useAssignedRelatedTos = (menuSourceId: string) => {
  const usePostResult = usePost<BaseResponse<RelatedTo[]>>([queryKeys.relatedTos], ACTIVITY_GET_RELATEDTOS, {
    id: menuSourceId
  });
  return usePostResult;
};
