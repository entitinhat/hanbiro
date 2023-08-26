import { defaultPaging } from '@base/config/constant';
import usePost from '@base/hooks/usePost';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@project/config/queryKeys';
import { Project } from '@project/types/project';

export const useProjectList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: defaultPaging };
  const { data: results = fallback, refetch } = usePosts<Project[]>(
    [queryKeys.listProject, keyStringify(params?.filter, '')],
    schema,
    params,
    opts
  );

  return { results, refetch };
};

export const useGetProject = (schema: string, params?: any, opts?: any) => {
  const fallback = {} as Project;
  let queryKey = [queryKeys.getProject, params.id];
  if (params.type) {
    queryKey.push(params.type)
  }
  const { data: result = fallback } = usePost<Project>(queryKey, schema, params, opts);
  return result;
};
