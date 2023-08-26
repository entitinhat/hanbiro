import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@process/config/queryKeys';
import { CREATE_PROCESS_STEP, DELETE_PROCESS_STEP, UPDATE_PROCESS_STEP } from '@process/services/process';
import { useQueryClient } from '@tanstack/react-query';

function useStepMutation(processId: string, onClose?: () => void, refresh: boolean = true) {
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
      queryClient.invalidateQueries([queryKeys.nextSteps, processId]);
    }
  };

  const successMutate = (data: any, variables: any, context: any) => {
    console.log('successMutate', data);
    enqueueSuccessBar('Created New Step successfully');
    onClose && onClose();
  };

  const mAddStep = useMutationPost(CREATE_PROCESS_STEP, queryKeys.createStep, {
    useErrorBoundary: false,
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate
  });

  const mUpdateStep = useMutationPost(UPDATE_PROCESS_STEP, queryKeys.updateStep, {
    useErrorBoundary: false,
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate
  });

  const mDeleteStep = useMutationPost(DELETE_PROCESS_STEP, queryKeys.deleteStep, {
    useErrorBoundary: false,
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate
  });

  return { mAddStep, mUpdateStep, mDeleteStep };
}

export default useStepMutation;
