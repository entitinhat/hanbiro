import _ from 'lodash';

import { SET_TIMEOUT } from '@base/config/constant';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@project/config/queryKeys';
import { CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT } from '@project/services/project';
import { useQueryClient } from '@tanstack/react-query';

export interface UseProjectMutateProps {
  onChange?: (success: boolean) => void;
}

export default function useProjectMutation(props: UseProjectMutateProps) {
  const { onChange } = props;
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const errorMutate = (error: any, variables: any, context: any) => {
    console.log('errorMutate', error);
    enqueueErrorBar("It can't save your data");
    onChange && onChange(false);
  };

  const settledMutate = (data: any, error: any, variables: any, context: any) => {
    console.log('settleMutate', data, error);
    setTimeout(() => {
      queryClient.invalidateQueries([queryKeys.listProject]);
    }, SET_TIMEOUT);
  };

  const successMutate = (data: any, variables: any, context: any) => {
    console.log('successMutate', data);
    enqueueSuccessBar('Updated successfully');
    onChange && onChange(true);
  };

  const mAddProject: any = useMutationPost(CREATE_PROJECT, queryKeys.createProject, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mUpdateProject: any = useMutationPost(UPDATE_PROJECT, queryKeys.updateProject, {
    onSuccess: successMutate,
    onError: errorMutate
    // onSettled: settledMutate
  });

  const mDeleteProject: any = useMutationPost(DELETE_PROJECT, queryKeys.deleteProject, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddProject, mUpdateProject, mDeleteProject };
}
