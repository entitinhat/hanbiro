import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationKeysResponse } from '@base/types/response';
import { DELETE_ASSIGNS_RULE } from '@settings/assignment-rule/rule/services/graphql';
import useSnackBar from '@base/hooks/useSnackBar';
import { SET_TIMEOUT } from '@base/config/constant';

export const useAssignRulesDelete = () => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();

  const {
    mutate: mutationDelete,
    isLoading,
    isSuccess,
    isError
  } = useMutationPost<BaseMutationKeysResponse>(DELETE_ASSIGNS_RULE, queryKeys.deleteRules, {
    onSuccess: (data: BaseMutationKeysResponse, variables: any, context: any) => {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.listRule]);
      }, SET_TIMEOUT);
      enqueueSuccessBar('Delete assign rules successfully!');
    },
    onError: (data: BaseMutationKeysResponse) => {
      enqueueErrorBar('Delete assign rules failed');
    }
  });

  return { mutationDelete, isLoading, isSuccess, isError };
};
