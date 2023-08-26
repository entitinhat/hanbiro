import _ from 'lodash';

import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@process/config/queryKeys';
import { CREATE_DEFINED_ITEM, DELETE_DEFINED_ITEM } from '@process/services/custom';
import { DefinedItemRequest } from '@process/types/request';
import { DefinedItem, SettingType } from '@process/types/settings';
import { useQueryClient } from '@tanstack/react-query';

function useDefinedItemMutate(type: SettingType, onClose?: () => void) {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const rQueryKeys = [queryKeys.definedItems, type];

  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.definedItem as DefinedItemRequest;

    queryClient.setQueryData(rQueryKeys, (old: any) => {
      const results = old ?? { results: [] };
      return { results: [optimistic, ...results.results] };
    });

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];

    queryClient.setQueryData(rQueryKeys, (old: any) => {
      return { results: old.results?.filter((v: DefinedItem) => !_.includes(optimistic, v.id)) };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
    enqueueErrorBar("It can't save your data");
  };

  const settledMutate = () => {
    queryClient.invalidateQueries({ queryKey: [queryKeys.definedItems], refetchType: 'none' });
  };

  const successMutate = () => {
    enqueueSuccessBar('Created New Setting successfully');
    queryClient.invalidateQueries({ queryKey: [queryKeys.definedItems] });
    onClose && onClose();
  };

  const mAddDefinedItem: any = useMutationPost(CREATE_DEFINED_ITEM, queryKeys.createDefinedItem, {
    // onMutate: syncAddMutate,
    onError: errorMutate,
    onSuccess: successMutate,
    onSettled: settledMutate
  });

  const mDeleteDefinedItem: any = useMutationPost(DELETE_DEFINED_ITEM, queryKeys.deleteDefinedItem, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSuccess: successMutate,
    onSettled: settledMutate
  });

  return { mAddDefinedItem, mDeleteDefinedItem };
}

export default useDefinedItemMutate;
