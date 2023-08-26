import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { COPY_ASSIGN_RULE } from '@settings/assignment-rule/rule/services/graphql';
import useSnackBar from '@base/hooks/useSnackBar';
import { SET_TIMEOUT } from '@base/config/constant';

interface MutationCopyResponse {
  id: string;
}

export const useAssignRuleCopy = () => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();

  const {
    mutate: mutationCopy,
    isLoading,
    isSuccess,
    isError
  } = useMutationPost<MutationCopyResponse>(COPY_ASSIGN_RULE, queryKeys.copyRule, {
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.listRule]);
      }, SET_TIMEOUT);
      enqueueSuccessBar('Copy assign rule successfully!');
    },
    onError: (data: BaseMutationResponse) => {
      enqueueErrorBar('Copy assign rule failed');
    }
  });

  return { mutationCopy, isLoading, isSuccess, isError };
};
