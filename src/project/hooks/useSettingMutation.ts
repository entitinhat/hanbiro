import _ from 'lodash';

import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@project/config/queryKeys';
import { CREATE_SETTING, DELETE_SETTING, UPDATE_SETTING } from '@project/services/setting';
import { useQueryClient } from '@tanstack/react-query';
import { SettingRequest } from '../types/setting';

export interface UseSettingMutateProps {
  onChange?: (success: boolean) => void;
}

export default function useSettingMutation(props: UseSettingMutateProps) {
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
    queryClient.invalidateQueries([queryKeys.getSettings]);
  };

  const successMutate = (data: any, variables: any, context: any) => {
    console.log('successMutate', data);
    enqueueSuccessBar('Updated successfully');
    onChange && onChange(true);
  };

  const { mutate: mutationAdd } = useMutationPost<SettingRequest>(CREATE_SETTING, queryKeys.createSetting, {
    onSuccess: successMutate,
    onError: errorMutate,
    // onSettled: settledMutate
  });

  const { mutate: mutationUpdate } = useMutationPost<SettingRequest>(UPDATE_SETTING, queryKeys.updateSetting, {
    onSuccess: successMutate,
    onError: errorMutate,
    // onSettled: settledMutate
  });

  const { mutate: mutationDelete } = useMutationPost(DELETE_SETTING, queryKeys.deleteSetting, {
    onSuccess: successMutate,
    onError: errorMutate,
    // onSettled: settledMutate
  });

  return { mutationAdd, mutationUpdate, mutationDelete };
}
