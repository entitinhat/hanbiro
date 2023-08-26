import { defaultPaging, LIST_STALE_TIME } from '@base/config/constant';
import usePost from '@base/hooks/usePost';
import usePosts from '@base/hooks/usePosts';
import { BaseResponse } from '@base/types/response';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@project/config/queryKeys';
import { GET_TASK_TEMPLATE, GET_TEMPLATE_TASKS } from '@project/services/template';
import { TaskTemplate } from '@project/types/template';

export const useTaskTemplateList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: defaultPaging };
  const { data: results = fallback, refetch } = usePosts<TaskTemplate[]>(
    [queryKeys.listTaskTemplate, keyStringify(params?.filter, '')],
    schema,
    params,
    opts
  );

  return { results, refetch };
};

export const useGetTaskTemplate = (id: string) => {
  const fallback = {} as TaskTemplate;
  const queryKey = [queryKeys.getTaskTemplate, id];
  const { data: result = fallback } = usePost<TaskTemplate>(
    queryKey,
    GET_TASK_TEMPLATE,
    {
      id: id
    },
    {
      enabled: !!id
    }
  );
  return result;
};

export const useGetTaskTemplates = () => {
  const queryKey = [queryKeys.getTaskTemplates];
  const response = usePost<BaseResponse<TaskTemplate[]>>(
    queryKey,
    GET_TEMPLATE_TASKS,
    {},
    {
      staleTime: LIST_STALE_TIME
    }
  );
  return response;
};
