import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { AssignRule } from '../types/rule';
import { ASSIGNMENT_RULE_LIST_GET } from '../services/graphql';
import usePost from '@base/hooks/usePost';

export const useAssignmentRuleList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: {} };
  const usePostResult = usePosts<AssignRule[]>([queryKeys.listRule, keyStringify(params?.filter, '')], schema, params, opts);

  return usePostResult;
};

export const useAllAssignmentRules = (params: any, opts?: any) => {
  const queryKey = [queryKeys.listRuleGet, params?.filter.module];
  const usePostResult = usePost<any>(queryKey, ASSIGNMENT_RULE_LIST_GET, params, opts);

  return usePostResult;
};
