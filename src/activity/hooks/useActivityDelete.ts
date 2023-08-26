import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@activity/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import {BaseMutationKeysResponse} from '@base/types/response';
import { DELETE_ACTIVITY } from '@activity/services/graphql';
import useSnackBar from '@base/hooks/useSnackBar';
import { SET_TIMEOUT } from '@base/config/constant';

export const useActivityDelete = () => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();

  const {
    mutate: mutationDelete,
    isLoading,
    isSuccess,
    isError
  } = useMutationPost<BaseMutationKeysResponse>(DELETE_ACTIVITY, queryKeys.deleteActivity, {
    onSuccess: (data: BaseMutationKeysResponse, variables: any, context: any) => {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.listActivity]);
      }, SET_TIMEOUT);
      enqueueSuccessBar('Delete activity successfully!');
    },
    onError: (data: BaseMutationKeysResponse) => {
      enqueueErrorBar('Delete activity failed');
    }
  });

  return { mutationDelete, isLoading, isSuccess, isError };
};
