import usePost from '@base/hooks/usePost';
import { queryKeys } from '../config/queryKeys';
import { getViewQuery } from '../services/graphql';

export const useReportView = (schema: string, params: any, opts?: any) => {
  const queryKey: string[] = [queryKeys.viewReport, params.id];
  const query: string = getViewQuery(schema);

  const response = usePost<any>(queryKey, query, params,{
    ...opts,
    enabled: schema!='' && params?.id?.length>0,
    cacheTime:0
  });
  return response;
};
