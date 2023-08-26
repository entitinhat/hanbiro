
import useMutationPost from '@base/hooks/iam/useIAMMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import queryKeys from '../config/queryKeys';
import { deleteUsersSchema } from '../services/graphql';

export function useDeleteUsers(nDelGroups: number) {
  // const [mutate, setMutate] = useState<any | null>(null);
  const { enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.listUsers], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.listUsers]);
  };
  const mDelete = useMutationPost<BaseMutationResponse>(deleteUsersSchema(nDelGroups), queryKeys.deleteUser, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete User successfully!')
  });
  return mDelete;
}
