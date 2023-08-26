import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import _ from 'lodash';
import { CHANGE_KB_HELPFUL_STATUS, CHANGE_KB_PUBLISH_STATUS } from '../services/graphql';

export default function useKBCategoryMutation() {
  const mChangePublishStatus: any = useMutationPost<BaseMutationResponse>(CHANGE_KB_PUBLISH_STATUS, queryKeys.changeKBPublishStatus);
  
  const mChangeHelpFulStatus: any = useMutationPost<BaseMutationResponse>(CHANGE_KB_HELPFUL_STATUS, queryKeys.changeKBHelpfulStatus);

  return { mChangePublishStatus, mChangeHelpFulStatus };
}
