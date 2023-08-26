import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@activity/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { UPDATE_ACTIVITY } from '@activity/services/graphql';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';

export function useActivityUpdate<T>(listQueryKey?: any[]): UseMutateFunction<BaseMutationResponse, unknown, T, unknown> {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar } = useSnackBar();

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.viewActivity]);
  };
  const { mutate } = useMutationPost<T>(UPDATE_ACTIVITY, queryKeys.updateActivity, {
    onSuccess: (data: BaseMutationResponse) => {
      //setIsSaving(false);
      //onMutationSuccess(variables);
      settledMutate();
      enqueueSuccessBar('Updated Activity successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      //setIsSaving(false);
      queryClient.setQueryData(['activity_activity'], context.previousSequence);
      enqueueSuccessBar('Updated Activity failed!');
    }
  });
  return mutate;
}
