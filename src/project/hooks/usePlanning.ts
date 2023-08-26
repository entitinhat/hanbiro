import { GET_PLANNING_QA } from './../services/planning';
import { defaultPaging } from '@base/config/constant';
import usePost from '@base/hooks/usePost';
import usePosts from '@base/hooks/usePosts';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@project/config/queryKeys';
import { Planning } from '@project/types/planning';
import { GET_PLANNING } from '../services/planning';

export const usePlanningList = (schema: string, params: any, opts?: any) => {
  const fallback = { data: [], paging: defaultPaging };
  const { data: results = fallback, refetch } = usePosts<Planning[]>(
    [queryKeys.listPlanning, keyStringify(params?.filter, '')],
    schema,
    params,
    opts
  );

  return { results, refetch };
};

export const useGetPlanning = (type: 'main' | 'qa', id: string) => {
  const fallback = {} as Planning;
  const queryKey = type == 'main' ? [queryKeys.getPlanning, id] : [queryKeys.getPlanning, id, 'qa'];
  const { data: result = fallback } = usePost<Planning>(queryKey, type == 'main' ? GET_PLANNING : GET_PLANNING_QA, {
    id: id
  });
  return result;
};
