import { CHECK_IMPORT } from '@base/services/graphql/export-import';
import { BaseMutationResponse } from '@base/types/response';
import useMutationPost from '../useMutationPost';
import useSnackBar from '../useSnackBar';
import { queryKeys } from './queryKeys';

export const useCheckImportMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const response: any = useMutationPost<BaseMutationResponse>(CHECK_IMPORT, queryKeys.checkImport, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Checked import successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Checked import failed!');
    }
  });

  return response;
};
