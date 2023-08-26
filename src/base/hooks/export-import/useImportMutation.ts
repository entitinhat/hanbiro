import { CREATE_IMPORT } from '@base/services/graphql/export-import';
import { BaseMutationResponse } from '@base/types/response';
import useMutationPost from '../useMutationPost';
import useSnackBar from '../useSnackBar';
import { queryKeys } from './queryKeys';

export const useImportMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const response: any = useMutationPost<BaseMutationResponse>(CREATE_IMPORT, queryKeys.createImport, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created import successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Created import failed!');
    }
  });

  return response;
};
