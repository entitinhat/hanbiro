import { queryKeys } from '@base/hooks/export-import/queryKeys';
import { GET_IMPORT, RUNNING_OPERATION } from '@base/services/graphql/export-import';
import usePost from '../usePost';

export const useGetImport = (params: any, opt?: any) => {
  const response: any = usePost<any>([queryKeys.getImport], GET_IMPORT, params, opt);
  return response;
};
