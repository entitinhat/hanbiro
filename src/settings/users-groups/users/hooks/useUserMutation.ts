import useMutationPost from '@base/hooks/iam/useIAMMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '../config/queryKeys';
import { USER_ADD_EMAIL, USER_ADD_PHONE, USER_CREATE, USER_DELETE, USER_REMOVE_EMAIL, USER_REMOVE_PHONE, USER_UPDATE } from '../services/graphql';

export function useUserMutation() {
  const { enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.getUser], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.getUser]);
  };

  const mUpdate = useMutationPost<any>(USER_UPDATE, queryKeys.updateUser, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Organziation successfully!')
  });
  const mCreate = useMutationPost<any>(USER_CREATE, queryKeys.createUser, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Organziation successfully!')
  });
  const mDelete = useMutationPost<any>(USER_DELETE, queryKeys.deleteUser, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Organziation successfully!')
  });
  const mAddUserEmail = useMutationPost<any>(USER_ADD_EMAIL, queryKeys.addUserEmail, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Organziation successfully!')
  });
  const mRemoveUserEmail = useMutationPost<any>(USER_REMOVE_EMAIL, queryKeys.removeUserEmail, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Organziation successfully!')
  });
  const mAddUserPhone = useMutationPost<any>(USER_ADD_PHONE, queryKeys.addUserPhone, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Organziation successfully!')
  });
  const mRemoveUserPhone = useMutationPost<any>(USER_REMOVE_PHONE, queryKeys.removeUserPhone, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Organziation successfully!')
  });

  return {
    mCreate,
    mUpdate,
    mDelete,
    mAddUserEmail,
    mRemoveUserEmail,
    mAddUserPhone,
    mRemoveUserPhone
  };
}
