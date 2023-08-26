import { queryKeys } from '@base/hooks/export-import/queryKeys';
import { RUNNING_OPERATION } from '@base/services/graphql/export-import';
import usePost from '../usePost';
import usePosts from '../usePosts';

export const useGetOperation = (id: string, opt?: any) => {
  const response: any = usePost<any>([queryKeys.exportOperation, id], RUNNING_OPERATION, { id }, opt);
  return response;
};
