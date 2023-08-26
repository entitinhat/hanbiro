import useMutationPost from '@base/hooks/useMutationPost';
import { useQueryClient } from '@tanstack/react-query';
import {BaseMutationKeysResponse} from '@base/types/response';
import { ADD_MENU_TEMPLATE, DELETE_MENU_TEMPLATES, UPDATE_MENU_TEMPLATE } from '../services/graphql';
import { queryKeys } from '../config/queryKeys';
import useSnackBar from '@base/hooks/useSnackBar';

export default function useMenuTemplateMutation(filter?: any) {
  let queryKey = [queryKeys.settingMenuTemplatesGet, filter];
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const syncAddMutate = async (variables: any) => {
    // Cancel current queries for the  checklist
    // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(queryKey);
    // Snapshot the previous value
    const previous = queryClient.getQueryData(queryKey);
    // Optimistically update to the new value
    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    if (filter) {
      await queryClient.cancelQueries(queryKey);
      const previous = queryClient.getQueryData(queryKey);
      console.log('previous', previous);
      const optimistic = variables.ids;
      queryClient.setQueryData(queryKey, (old: any) => {
        return {
          ...old,
          data: old.data?.filter((v: any) => !optimistic.includes(v.id))
        };
      });

      return { previous };
    }
  };

  const settledMutate = () => {
    // Always refetch after error or success:
    queryClient.invalidateQueries(queryKey);
  };

  const {
    mutate: mutationAdd,
    isSuccess: isSuccessAdd,
    isLoading: isLoadingAdd
  } = useMutationPost<any>(ADD_MENU_TEMPLATE, queryKeys.settingMenuTemplateCreate, {
    onMutate: syncAddMutate,
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Create Template failed: ' + JSON.parse(error).message);
      if (context.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Add Template successfully!')
  });

  const {
    mutate: mutationUpdate,
    isSuccess: isSuccessUpdate,
    isLoading: isLoadingUpdate
  } = useMutationPost<any>(UPDATE_MENU_TEMPLATE, queryKeys.settingMenuTemplateUpdate, {
    onMutate: syncAddMutate,
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Update Template failed: ' + JSON.parse(error).message);
      if (context.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Template successfully!')
  });

  const {
    mutate: mutationDelete,
    isSuccess: isSuccessDelete,
    isLoading: isLoadingDelete
  } = useMutationPost<BaseMutationKeysResponse>(DELETE_MENU_TEMPLATES, queryKeys.settingMenuTemplatesDelete, {
    onMutate: syncDeleteMutate,
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Delete Template failed: ' + JSON.parse(error).message);
      if (context.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete Template successfully!')
  });

  const isSuccess = isSuccessAdd || isSuccessUpdate || isSuccessDelete;
  const isLoading = isLoadingAdd || isLoadingUpdate || isLoadingDelete;

  return { mutationAdd, mutationUpdate, mutationDelete, isSuccess, isLoading };
}
