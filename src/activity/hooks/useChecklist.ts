import { queryKeys } from '@activity/config/queryKeys';
import { ACTIVITY_GET_CHECKLIST } from '@activity/services/graphql';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { TaskChecklist } from '@activity/types/task';

export const useChecklist = (params: any, opts?: any) => {
  const fallback = { data: [] };
  const { data: results = fallback } = usePosts<TaskChecklist[]>(
    [queryKeys.listChecklist, keyStringify(params?.id, '')],
    ACTIVITY_GET_CHECKLIST,
    params,
    opts
  );

  return results;
};
