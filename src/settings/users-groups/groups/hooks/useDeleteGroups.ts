
import useMutationPost from '@base/hooks/iam/useIAMMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import  queryKeys  from '@settings/users-groups/groups/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { deleteGroupsSchema } from '../services/graphql';


export function useDeleteGroups(nDelGroups: number) {
  // const [mutate, setMutate] = useState<any | null>(null);
  const { enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.listGroups], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.listGroups]);
  };
  const mDelete = useMutationPost<BaseMutationResponse>(deleteGroupsSchema(nDelGroups), queryKeys.deleteGroup, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete Group successfully!')
  });
  return mDelete;
}
