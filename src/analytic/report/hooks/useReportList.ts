import usePosts from '@base/hooks/usePosts';
import { Report } from '../types/reports';
import { queryKeys } from '../config/queryKeys';
import { keyStringify } from '@base/utils/helpers';
import { getListQuery } from '../services/graphql';

export const useReportList = (schema: string, params: any, opts?: any) => {
  const usePostResult = usePosts<Report[]>([queryKeys.listReport, keyStringify(params?.filter, '')], getListQuery(schema), params, opts);
  
  return usePostResult;
};
