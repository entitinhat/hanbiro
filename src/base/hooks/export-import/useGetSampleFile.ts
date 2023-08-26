import { queryKeys } from '@base/hooks/export-import/queryKeys';
import { GET_SAMPLE_FILE } from '@base/services/graphql/export-import';
import usePost from '../usePost';

export const useGetSampleFile = (params: any, opt?: any) => {
  const response: any = usePost<any>([queryKeys.getSampleFile, params], GET_SAMPLE_FILE, params, opt);
  return response;
};
