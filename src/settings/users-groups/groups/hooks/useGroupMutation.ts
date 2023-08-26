
import useMutationPost from '@base/hooks/iam/useIAMMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '../config/queryKeys';
import { GROUP_CREATE, GROUP_DELETE, GROUP_UPDATE } from '../services/graphql';

export function useGroupMutation() {
  const { enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.getGroup], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.getGroup]);
  };

  const mUpdate = useMutationPost<any>(GROUP_UPDATE, queryKeys.updateGroup, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Group successfully!')
  });
  const mCreate = useMutationPost<any>(GROUP_CREATE, queryKeys.createGroup, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Create Group successfully!')
  });
  const mDelete = useMutationPost<any>(GROUP_DELETE, queryKeys.deleteGroup, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Remove Group successfully!')
  });
  return {
    mCreate,
    mUpdate,
    mDelete
  };
}
