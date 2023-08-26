import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import _ from 'lodash';
import { CLONE_KB } from '../services/graphql';

export default function useKBClone() {
  const mCloneKB: any = useMutationPost<BaseMutationResponse>(CLONE_KB, queryKeys.cloneKnowledgebase);

  return { mCloneKB };
}
