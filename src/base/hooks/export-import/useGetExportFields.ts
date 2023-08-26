import { queryKeys } from '@base/hooks/export-import/queryKeys';
import { GET_EXPORT } from '@base/services/graphql/export-import';
import usePost from '../usePost';

export const useGetExportFields = (params: any, opt?: any) => {
  const response: any = usePost<any>([queryKeys.getExport, params], GET_EXPORT, params, opt);
  return response;
};
