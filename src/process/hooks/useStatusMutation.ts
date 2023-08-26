import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@process/config/queryKeys';
import { CREATE_STEP_STATUS, UPDATE_STEP_STATUS, UPDATE_STEP_STATUSES } from '@process/services/process';
import { useQueryClient } from '@tanstack/react-query';

function useStatusMutation(processId: string, onClose?: () => void, refresh: boolean = true) {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const errorMutate = (error: any, variables: any, context: any) => {
    console.log('errorMutate', error);
    enqueueErrorBar("It can't save your data");
  };

  const settledMutate = (data: any, error: any, variables: any, context: any) => {
    console.log('settleMutate', data, error);
    if (refresh) {
      queryClient.invalidateQueries([queryKeys.getDiagram, processId]);
    }
  };

  const successMutate = (data: any, variables: any, context: any) => {
    console.log('successMutate', data);
    enqueueSuccessBar('Updated successfully');
    onClose && onClose();
  };

  const mAddStatus = useMutationPost(CREATE_STEP_STATUS, queryKeys.createStatus, {
    useErrorBoundary: false,
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate
  });

  const mUpdateStatus = useMutationPost(UPDATE_STEP_STATUS, queryKeys.updateStatus, {
    useErrorBoundary: false,
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate
  });

  const mUpdateStatuses = useMutationPost(UPDATE_STEP_STATUSES, queryKeys.updateStatuses, {
    useErrorBoundary: false,
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate
  });

  return { mAddStatus, mUpdateStatus, mUpdateStatuses };
}

export default useStatusMutation;
