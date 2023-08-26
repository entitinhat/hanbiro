
import useMutationPost from '@base/hooks/iam/useIAMMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '../config/queryKeys';
import { GROUP_ADD_MEMBER, GROUP_CREATE, GROUP_DELETE, GROUP_REMOVE_MEMBER, GROUP_UPDATE, GROUP_UPDATE_MEMBER } from '../services/graphql';

export function useGroupMembershipMutation() {
  const { enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.groupMemberships], context.previous);
    }
  };
//GROUP_ADD_MEMBER
  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.groupMemberships]);
  };

  const mUpdate = useMutationPost<any>(GROUP_UPDATE_MEMBER, queryKeys.addGroupMember, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Member successfully!')
  });
  const mCreate = useMutationPost<any>(GROUP_ADD_MEMBER, queryKeys.updateGroupMember, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Create Member successfully!')
  });
  const mDelete = useMutationPost<any>(GROUP_REMOVE_MEMBER, queryKeys.removeGroupMember, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Remove Member successfully!')
  });
  return {
    mCreate,
    mUpdate,
    mDelete
  };
}
