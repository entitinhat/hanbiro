import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';

import { queryKeys } from '../config/queryKeys';
import { GET_ALL_KNOWELEDGEBASE_INSERTED } from '../services/graphql';
import { KBInserted } from '../types/knowledge';

export default function useKBInserteds(params: any) {
  const query = params?.filter?.query ?? '';
  let queryKey = [queryKeys.kbInserteds, query];
  const response = usePost<BaseResponse<KBInserted[]>>(queryKey, GET_ALL_KNOWELEDGEBASE_INSERTED, params, {});
  return response;
}
