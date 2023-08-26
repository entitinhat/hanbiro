import { defaultPaging } from '@base/config/constant';
import usePost from '@base/hooks/usePost';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@project/config/queryKeys';
import { Task, TasksResponse } from '@project/types/task';

export const useTaskList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [] as Task[], paging: defaultPaging };
  const { data: results = fallback, refetch } = usePosts<Task[]>(
    [queryKeys.listTask, keyStringify(params?.filter, '')],
    schema,
    params,
    opts
  );

  return { results, refetch };
};

export const useGetTasks = (schema: string, params?: any, opts?: any) => {
  const fallback = { results: [] } as TasksResponse;
  const { data: results = fallback, refetch } = usePost<TasksResponse>([queryKeys.getTasks], schema, params, opts);

  return { results, refetch };
};
