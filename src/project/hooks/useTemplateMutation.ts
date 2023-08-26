import _ from 'lodash';

import { SET_TIMEOUT } from '@base/config/constant';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@project/config/queryKeys';
import { CREATE_TASK_TEMPLATE, DELETE_TASK_TEMPLATE, UPDATE_TASK_TEMPLATE } from '@project/services/template';
import { useQueryClient } from '@tanstack/react-query';

export interface UseTaskTemplateMutateProps {
  listQueryKey: any[];
  onChange?: (success: boolean) => void;
}

export default function useTaskTemplateMutation(props: UseTaskTemplateMutateProps) {
  const { listQueryKey, onChange } = props;
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const rQueryKeys = [queryKeys.listTaskTemplate, ...listQueryKey];

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

  const mAddTaskTemplate: any = useMutationPost(CREATE_TASK_TEMPLATE, queryKeys.createTaskTemplate, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mUpdateTaskTemplate: any = useMutationPost(UPDATE_TASK_TEMPLATE, queryKeys.updateTaskTemplate, {
    onSuccess: successMutate,
    onError: errorMutate
    // onSettled: settledMutate
  });

  const mDeleteTaskTemplate: any = useMutationPost(DELETE_TASK_TEMPLATE, queryKeys.deleteTaskTemplate, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddTaskTemplate, mUpdateTaskTemplate, mDeleteTaskTemplate };
}
