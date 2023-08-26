import { useQueryClient } from '@tanstack/react-query';

import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { ACITIVITY_DELETE_RECOVERY, ACITIVITY_EMPTY_RECOVERY, ACITIVITY_RESTORE } from '../services/graphql';
import _ from 'lodash';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@activity/config/queryKeys';

export const useActivityMutation = (listQueryKey: any[]) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const rQueryKeys = [queryKeys.listActivity, ...listQueryKey];
  console.log('rQueryKeys', rQueryKeys);
  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(rQueryKeys);
  };

  const mRestore: any = useMutationPost<BaseMutationResponse>(ACITIVITY_RESTORE, queryKeys.restoreActivity, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Restore activity successfully!')
  });

  const mEmpty: any = useMutationPost<BaseMutationResponse>(ACITIVITY_DELETE_RECOVERY, queryKeys.deleteRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete successfully!')
  });

  const mEmptyAll: any = useMutationPost<BaseMutationResponse>(ACITIVITY_EMPTY_RECOVERY, queryKeys.emptyRecovert, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete all successfully!')
  });

  return { mRestore, mEmpty, mEmptyAll };
};
