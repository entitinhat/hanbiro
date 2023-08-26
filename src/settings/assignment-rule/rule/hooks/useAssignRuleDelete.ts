import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { DELETE_ASSIGN_RULE } from '@settings/assignment-rule/rule/services/graphql';
import useSnackBar from '@base/hooks/useSnackBar';
import { SET_TIMEOUT } from '@base/config/constant';

interface MutationDeleteResponse {
  id: string;
}

export const useAssignRuleDelete = () => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();

  const {
    mutate: mutationDelete,
    isLoading,
    isSuccess,
    isError
  } = useMutationPost<MutationDeleteResponse>(DELETE_ASSIGN_RULE, queryKeys.deleteRule, {
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.listRule]);
      }, SET_TIMEOUT);
      enqueueSuccessBar('Delete assign rule successfully!');
    },
    onError: (data: BaseMutationResponse) => {
      enqueueErrorBar('Delete assign rule failed');
    }
  });

  return { mutationDelete, isLoading, isSuccess, isError };
};
