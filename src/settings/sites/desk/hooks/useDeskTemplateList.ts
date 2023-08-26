import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';

export const useDeskTemplateList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: {} };
  const usePostResult = usePosts<any[]>([queryKeys.listRule, keyStringify(params?.filter, '')], schema, params, opts);

  return usePostResult;
};
