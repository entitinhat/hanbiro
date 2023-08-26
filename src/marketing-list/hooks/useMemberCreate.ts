import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { marketingQueryKeys } from '@marketing-list/config/queryKeys';
import { CREATE_MEMBER } from '@marketing-list/services/graphql';

export function useMemberCreate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(CREATE_MEMBER, marketingQueryKeys.membersCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created member(s) successfully!');
    },
    onMutate: async (variables: any) => {},
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during creating, try again.');
    },
    onSettled: () => {}
  });

  return mPostResult;
}
