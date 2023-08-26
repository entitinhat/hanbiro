import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { CREATE_DESK_TAG, DELETE_DESK_TAG, UPDATE_DESK_TAG } from '@settings/preferences/services/graphql/desk';
import { useQueryClient } from '@tanstack/react-query';

export function useDeskTagMutation() {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar } = useSnackBar();

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.tags], context.previous);
    }
  };

  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_DESK_TAG, queryKeys.updateDeskTag, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was saved!');
      queryClient.invalidateQueries([queryKeys.tags]);
    }
  });
  const mAdd: any = useMutationPost<BaseMutationResponse>(CREATE_DESK_TAG, queryKeys.createDeskTag, {
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was saved!');
      queryClient.invalidateQueries([queryKeys.tags]);
    }
  });
  const mDelete: any = useMutationPost<BaseMutationResponse>(DELETE_DESK_TAG, queryKeys.deleteDeskTag, {
    useErrorBoundary: false,
    onSuccess: (res: any) => {
      enqueueSuccessBar('Data was saved!');
      queryClient.invalidateQueries([queryKeys.tags]);
    },
    onError: errorMutate
  });
  return { mUpdate, mAdd, mDelete };
}
