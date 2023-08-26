import { CREATE_EXPORT } from '@base/services/graphql/export-import';
import { BaseMutationResponse } from '@base/types/response';
import useMutationPost from '../useMutationPost';
import useSnackBar from '../useSnackBar';
import { queryKeys } from './queryKeys';

export const useExportMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const response: any = useMutationPost<BaseMutationResponse>(CREATE_EXPORT, queryKeys.createExport, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created export successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Created export failed!');
    }
  });

  return response;
};
