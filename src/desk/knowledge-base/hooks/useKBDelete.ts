import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import {  DELETE_KNOWELEDGEBASE } from '../services/graphql';

export default function useKBDelete() {
  const mDeleteKB: any = useMutationPost<BaseMutationResponse>(DELETE_KNOWELEDGEBASE, queryKeys.deleteKnowledgebase);

  return { mDeleteKB };
}
