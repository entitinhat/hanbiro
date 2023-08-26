import { queryKeys } from '@activity/config/queryKeys';
import { getListQuery } from '@activity/services/graphql';
import { Activity } from '@activity/types/activity';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';

export const useActivityList = (schema: string, params: any, opts?: any) => {
  console.log(`~~~~PARAMS`, params);
  const fallback = { data: [], paging: undefined };
  const {
    data: results = fallback,
    refetch,
    status
  } = usePosts<Activity[]>([queryKeys.listActivity, keyStringify(params?.filter, '')], getListQuery(schema), params, opts);

  return { results, refetch, status };
};
