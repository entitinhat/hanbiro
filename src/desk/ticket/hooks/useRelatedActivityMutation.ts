import { DELETE_ACTIVITY } from '@activity/services/graphql';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '../config/queryKeys';

export default function useRelatedActivityMutation() {
  const mDeleteActivites: any = useMutationPost<BaseMutationResponse>(DELETE_ACTIVITY, queryKeys.deleteActivitity);

  return { mDeleteActivites };
}
