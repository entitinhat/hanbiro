import _ from 'lodash';

import { SET_TIMEOUT } from '@base/config/constant';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@project/config/queryKeys';
import { CREATE_TASK_LINK_TEMPLATE, DELETE_TASK_LINK_TEMPLATE, UPDATE_TASK_LINK_TEMPLATE } from '@project/services/template';
import { useQueryClient } from '@tanstack/react-query';

export interface UseTaskTemplateLinkMutateProps {
  id: string;
  onChange?: (success: boolean) => void;
}

export default function useTaskTemplateLinkMutation(props: UseTaskTemplateLinkMutateProps) {
  const { id, onChange } = props;
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const rQueryKeys = [queryKeys.getTaskTemplate, id];

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

  const mAddTaskLinkTemplate: any = useMutationPost(CREATE_TASK_LINK_TEMPLATE, queryKeys.createTaskLinkTemplate, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mUpdateTaskLinkTemplate: any = useMutationPost(UPDATE_TASK_LINK_TEMPLATE, queryKeys.updateTaskLinkTemplate, {
    onSuccess: successMutate,
    onError: errorMutate
    // onSettled: settledMutate
  });

  const mDeleteTaskLinkTemplate: any = useMutationPost(DELETE_TASK_LINK_TEMPLATE, queryKeys.deleteTaskLinkTemplate, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddTaskLinkTemplate, mUpdateTaskLinkTemplate, mDeleteTaskLinkTemplate };
}
