import { defaultPaging } from '@base/config/constant';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@process/config/queryKeys';
import { AutomationRule } from '@process/types/automation';
import usePost from '../../base/hooks/usePost';
import { GET_AUTOMATION_RULE } from '../services/automation';

export const useAutomationList = (schema: string, params: any, opts?: any) => {
  // If the results is null, It has to define fallback as default.
  const fallback = { data: [], paging: defaultPaging };
  const {
    data: results = fallback,
    refetch,
    status
  } = usePosts<AutomationRule[]>([queryKeys.listAutomation, keyStringify(params?.filter, '')], schema, params, opts);

  return { results, refetch, status };
};

export const useGetAutomationRule = (id: string | undefined) => {
  const queryKey = [queryKeys.getAutomationRule, id];
  const response = usePost<AutomationRule>(
    queryKey,
    GET_AUTOMATION_RULE,
    {
      id: id
    },
    {
      enabled: !!id
    }
  );
  return response;
};
