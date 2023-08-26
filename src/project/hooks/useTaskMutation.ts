import _ from 'lodash';

import { SET_TIMEOUT } from '@base/config/constant';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@project/config/queryKeys';
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from '@project/services/task';
import { useQueryClient } from '@tanstack/react-query';

export interface UseTaskMutateProps {
  listQueryKey: any[];
  onChange?: (success: boolean) => void;
}

export default function useTaskMutation(props: UseTaskMutateProps) {
  const { listQueryKey, onChange } = props;
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const rQueryKeys = [queryKeys.listTask, ...listQueryKey];

  const errorMutate = (error: any, variables: any, context: any) => {
    console.log('errorMutate', error);
    enqueueErrorBar("It can't save your data");
    onChange && onChange(false);
  };

  const settledMutate = (data: any, error: any, variables: any, context: any) => {
    console.log('settleMutate', data, error);
    setTimeout(() => {
      queryClient.invalidateQueries(rQueryKeys);
    }, SET_TIMEOUT);
  };

  const successMutate = (data: any, variables: any, context: any) => {
    console.log('successMutate', data);
    enqueueSuccessBar('Updated successfully');
    onChange && onChange(true);
  };

  const mAddTask: any = useMutationPost(CREATE_TASK, queryKeys.createTask, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mUpdateTask: any = useMutationPost(UPDATE_TASK, queryKeys.updateTask, {
    onSuccess: successMutate,
    onError: errorMutate
    // onSettled: settledMutate
  });

  const mDeleteTask: any = useMutationPost(DELETE_TASK, queryKeys.deleteTask, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddTask, mUpdateTask, mDeleteTask };
}
