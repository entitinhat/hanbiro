import { SET_VIEW } from '@base/services/graphql/mark-read-unread';
import { BaseMutationResponse } from '@base/types/response';
import useMutationPost from '../useMutationPost';
import useSnackBar from '../useSnackBar';
import { queryKeys } from './queryKeys';

export const useReadMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mUpdate: any = useMutationPost<BaseMutationResponse>(SET_VIEW, queryKeys.setView, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Mark read successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Mark read failed!');
    }
  });

  return { mUpdate };
};
