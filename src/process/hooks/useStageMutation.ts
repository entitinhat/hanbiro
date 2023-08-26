import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@process/config/queryKeys';
import { CREATE_PROCESS_STAGE, CREATE_PROCESS_STEP, DELETE_PROCESS_STAGE, RESIZE_PROCESS_STAGE } from '@process/services/process';
import { useQueryClient } from '@tanstack/react-query';

function useStageMutation(processId: string, onClose?: () => void) {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const errorMutate = (error: any, variables: any, context: any) => {
    console.log('errorMutate', error);
    enqueueErrorBar("It can't save your data");
  };

  const settledMutate = (data: any, error: any, variables: any, context: any) => {
    console.log('settleMutate', data, error);
    queryClient.invalidateQueries([queryKeys.getDiagram, processId]);
  };

  const successMutate = (data: any, variables: any, context: any) => {
    console.log('successMutate', data);
    enqueueSuccessBar('Updated successfully');
    onClose && onClose();
  };

  const mAddStage = useMutationPost(CREATE_PROCESS_STAGE, queryKeys.createStage, {
    useErrorBoundary: false,
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate
  });

  const mResizeStage = useMutationPost(RESIZE_PROCESS_STAGE, queryKeys.resizeStage, {
    useErrorBoundary: false,
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate
  });

  const mDeleteStage = useMutationPost(DELETE_PROCESS_STAGE, queryKeys.deleteStage, {
    useErrorBoundary: false,
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate
  });

  return { mAddStage, mResizeStage, mDeleteStage };
}

export default useStageMutation;
