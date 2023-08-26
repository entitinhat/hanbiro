import { queryKeys } from '@activity/config/queryKeys';
import { ACTIVITY_GET_SEQUENCES } from '@activity/services/graphql';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { TaskSequence } from '@activity/types/task';

export const useSequence = (params: any, opts?: any) => {
  const fallback = { data: [] };
  const { data: results = fallback } = usePosts<TaskSequence[]>(
    [queryKeys.listSequence, keyStringify(params?.id, '')],
    ACTIVITY_GET_SEQUENCES,
    params,
    opts
  );

  return results;
};
