import useMutationPost from '@base/hooks/useMutationPost';
import { useQueryClient } from '@tanstack/react-query';
import {BaseMutationKeysResponse, BaseMutationResponse} from '@base/types/response';
import { ADD_MENU_SITES, DELETE_MENU_SITES, UPDATE_MENU_SITES } from '../services/graphql';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '../config/queryKeys';
import useSnackBar from '@base/hooks/useSnackBar';

export default function UseMenuSiteMutation(filter?: any) {
  let queryKey = [queryKeys.settingMenuSiteGet, keyStringify(filter, '')];
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
    await queryClient.cancelQueries(queryKey);
    const previous = queryClient.getQueryData(queryKey);
    const optimistic = variables.ids;
    queryClient.setQueryData(queryKey, (old: any) => {
      return {
        ...old,
        data: old.data?.filter((v: any) => !optimistic.includes(v.id))
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    enqueueErrorBar('Delete Template failed: ' + JSON.parse(error).message);
    if (context.previous) {
      queryClient.setQueryData(queryKey, context.previous);
    }
  };

  const settledMutate = () => {
    // Always refetch after error or success:
    queryClient.invalidateQueries(queryKey);
  };

  const { mutate: mutationAdd } = useMutationPost<BaseMutationResponse>(ADD_MENU_SITES, 'qureyKey', {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Add Template successfully!')
  });

  const { mutate: mutationUpdate } = useMutationPost<BaseMutationResponse>(UPDATE_MENU_SITES, 'qureyKey', {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update Template successfully!')
  });

  const { mutate: mutationDelete } = useMutationPost<BaseMutationKeysResponse>(DELETE_MENU_SITES, queryKeys.settingMenuSiteDelete, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete Template successfully!')
  });

  // const onMutationError = useRecoilCallback(
  //   ({ set, snapshot }) =>
  //     () => {
  //       const items = snapshot.getLoadable(checklistAtom).contents as TaskChecklist[];
  //       const newItems = items.filter((ele) => ele.id !== item.id);
  //       set(checklistAtom, newItems);
  //       onChange && onChange(newItems);
  //     },
  //   [item],
  // );

  return { mutationAdd, mutationUpdate, mutationDelete };
}
