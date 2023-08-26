import _ from 'lodash';

import { SET_TIMEOUT } from '@base/config/constant';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@project/config/queryKeys';
import { useQueryClient } from '@tanstack/react-query';

import { CREATE_PLANNING, DELETE_PLANNING, UPDATE_PLANNING } from '../services/planning';

interface planningMutateProps {
  onChange?: (success: boolean) => void;
}

export default function usePlanningMutation(props: planningMutateProps) {
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
      queryClient.invalidateQueries([queryKeys.listPlanning]);
    }, SET_TIMEOUT);
  };

  const successMutate = (data: any, variables: any, context: any) => {
    console.log('successMutate', data);
    enqueueSuccessBar('Updated successfully');
    onChange && onChange(true);
  };

  const mAddPlanning: any = useMutationPost(CREATE_PLANNING, queryKeys.createPlanning, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mUpdatePlanning: any = useMutationPost(UPDATE_PLANNING, queryKeys.updatePlanning, {
    onSuccess: successMutate,
    onError: errorMutate
    // onSettled: settledMutate
  });

  const mDeletePlanning: any = useMutationPost(DELETE_PLANNING, queryKeys.deletePlanning, {
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddPlanning, mUpdatePlanning, mDeletePlanning };
}
