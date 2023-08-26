import _ from 'lodash';

import { defaultPaging, SET_TIMEOUT } from '@base/config/constant';
import useMutationPost from '@base/hooks/useMutationPost';
import { queryKeys } from '@process/config/queryKeys';
import { CREATE_PROCESS, DELETE_PROCESS, UPDATE_MODULE_PROCESS, UPDATE_PROCESS } from '@process/services/process';
import { BusinessProcess } from '@process/types/process';
import { useQueryClient } from '@tanstack/react-query';
import useSnackBar from '@base/hooks/useSnackBar';
import { useEffect } from 'react';
import { UseFormReset } from 'react-hook-form';

function useProcessMutate(listQueryKey: any[], onClose?: () => void, reset?: UseFormReset<any>) {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const rQueryKeys = [queryKeys.listProcess, ...listQueryKey];

  const syncAddMutate = async (variables: any) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries(rQueryKeys);

    // Snapshot the previous value
    const previous = queryClient.getQueryData(rQueryKeys);

    // Optimistically update to the new value
    const optimistic = variables.process as BusinessProcess;
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      const results = old ?? { data: [], paging: defaultPaging };
      const paging = { ...results.paging, totalItems: results.paging?.totalItems + 1 };
      return { paging: paging, data: [optimistic, ...results.data] };
    });

    // Return a context object with the snapshotted value
    return { previous };
  };

  // const syncUpdateMutate = async (variables: any) => {
  //   await queryClient.cancelQueries(rQueryKeys);

  //   const previous = queryClient.getQueryData(rQueryKeys);
  //   const optimistic = variables.process as BusinessProcess;
  //   queryClient.setQueryData(rQueryKeys, (old: any) => {
  //     return { paging: old.paging, data: old.data?.map((v: BusinessProcess) => (v.id == optimistic.id ? optimistic : v)) };
  //   });

  //   return { previous };
  // };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      const paging = { ...old.paging, totalItems: old.paging?.totalItems - optimistic.length };
      return { paging: paging, data: old.data?.filter((v: BusinessProcess) => !_.includes(optimistic, v.id)) };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    console.log('errorMutate', error);
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
    enqueueErrorBar("It can't save your data");
  };

  const settledMutate = (data: any, error: any, variables: any, context: any) => {
    console.log('settleMutate', data, error);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.listProcess] });
      // queryClient.invalidateQueries({ queryKey: [queryKeys.listProcess], refetchType: 'none' });
    }, SET_TIMEOUT);
    reset && reset();
    onClose && onClose();
  };

  const successMutate = (data: any, variables: any, context: any) => {
    console.log('successMutate', data);
    enqueueSuccessBar('Created New Process successfully');
    // queryClient.invalidateQueries({ queryKey: [queryKeys.listProcess] });
  };

  const mAddProcess: any = useMutationPost(CREATE_PROCESS, queryKeys.createProcess, {
    // When mutate is called:
    // onMutate: syncAddMutate,
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: errorMutate,
    onSuccess: successMutate,
    // Always refetch after error or success:
    onSettled: settledMutate,
    useErrorBoundary: false
  });

  // const mUpdateProcess: any = useMutationPost(UPDATE_PROCESS, queryKeys.updateProcess, {
  //   // When mutate is called:
  //   onMutate: syncUpdateMutate,
  //   // If the mutation fails,
  //   // use the context returned from onMutate to roll back
  //   onError: errorMutate,
  //   onSuccess: successMutate,
  //   // Always refetch after error or success:
  //   onSettled: settledMutate,
  //   useErrorBoundary: false
  // });

  const mDeleteProcess: any = useMutationPost(DELETE_PROCESS, queryKeys.deleteProcess, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSuccess: successMutate,
    onSettled: settledMutate
  });

  const mUpdateModule: any = useMutationPost(UPDATE_MODULE_PROCESS, queryKeys.updateModuleProcess, {
    onMutate: () => {},
    onSuccess: (data: any) => {},
    onError: (error: any) => {
      // console.log('failed', error);
    }
  });

  // // clear messages when a new post is selected
  // useEffect(() => {
  //   if (id) {
  //     mAddProcess.reset();
  //     mUpdateProcess.reset();
  //     mDeleteProcess.reset();
  //     // can't include updateMutation and deleteMutation in the dependencies
  //     // because the function updates them -- so there would be an infinite loop!
  //   }
  // }, [id]);

  return { mAddProcess, mDeleteProcess, mUpdateModule };
}

export default useProcessMutate;
