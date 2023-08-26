import usePost from '@base/hooks/usePost';
import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import { ResponsePaging } from '@base/types/response';
import { keyStringify } from '@base/utils/helpers';
import { GET_ALL_KNOWLEDGES_BY_TAG } from '@settings/preferences/services/graphql/desk';
import { IKnowledgeByTag } from '@settings/preferences/types/desk/knowledgeByTag';

export const useGetAllKnowledgeByTag = (params: any) => {
  const query = params?.filter?.query ?? '';
  let queryKey = [queryKeys.listKnowledgebases, keyStringify(params?.filter, '')];
  const response = usePost<ResponsePaging<IKnowledgeByTag[]>>(queryKey, GET_ALL_KNOWLEDGES_BY_TAG, params, {});
  return response;
};
