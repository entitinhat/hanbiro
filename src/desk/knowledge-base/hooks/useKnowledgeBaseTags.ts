import usePost from '@base/hooks/usePosts';
import { FilterInput, IdName } from '@base/types/common';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '../config/queryKeys';
import { GET_ALL_TAGS } from '../services/graphql';

export const useKnowledgeBaseTags = (keyword: string) => {
  let filter: FilterInput = {
    query: 'name:' + keyword,
    filters: {}
  };
  let queryKey = [queryKeys.tags, keyword];
  let params = {
    filter
  };
  const response = usePost<IdName[]>(queryKey, GET_ALL_TAGS, params, {
    // initialData: knowledgeBaseTagsFakeData(),
  });
  return response;
};
