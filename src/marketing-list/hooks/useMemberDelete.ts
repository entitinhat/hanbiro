import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';

//menu
import { marketingQueryKeys } from '@marketing-list/config/queryKeys';
import { DELETE_MEMBER, MARKETING_DELETE } from '@marketing-list/services/graphql';

export default function useMemberDelete() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(DELETE_MEMBER, marketingQueryKeys.membersDelete, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted member list(s) successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('There is an error during deleting, try again.');
    }
  });

  return mPostResult;
}
