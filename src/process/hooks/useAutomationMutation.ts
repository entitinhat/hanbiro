import _ from 'lodash';

import { defaultPaging } from '@base/config/constant';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@process/config/queryKeys';
import {
    CREATE_AUTOMATION_RULE, DELETE_AUTOMATION_RULE, UPDATE_AUTOMATION_RULE
} from '@process/services/automation';
import { AutomationRule } from '@process/types/automation';
import { useQueryClient } from '@tanstack/react-query';

function useAutomationMutate(listQueryKey: any[], onClose?: () => void) {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const rQueryKeys = [queryKeys.listAutomation, ...listQueryKey];

  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.rule as AutomationRule;

    queryClient.setQueryData(rQueryKeys, (old: any) => {
      const results = old ?? { data: [], paging: defaultPaging };
      const paging = { ...results.paging, totalItems: results.paging?.totalItems + 1 };
      return { paging: paging, data: [optimistic, ...results.data] };
    });

    return { previous };
  };

  const syncUpdateMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.rule as AutomationRule;

    queryClient.setQueryData(rQueryKeys, (old: any) => {
      return { paging: old.paging, data: old.data?.map((v: AutomationRule) => (v.id == optimistic.id ? optimistic : v)) };
    });

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];

    queryClient.setQueryData(rQueryKeys, (old: any) => {
      const paging = { ...old.paging, totalItems: old.paging?.totalItems - optimistic.length };
      return { paging: paging, data: old.data?.filter((v: AutomationRule) => !_.includes(optimistic, v.id)) };
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
    queryClient.invalidateQueries({ queryKey: rQueryKeys, refetchType: 'none' });
  };

  const successMutate = () => {
    enqueueSuccessBar('Created New Automation successfully');
    queryClient.invalidateQueries({ queryKey: rQueryKeys });
    onClose && onClose();
  };

  const mAddAutomation: any = useMutationPost(CREATE_AUTOMATION_RULE, queryKeys.createProcess, {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSuccess: successMutate,
    onSettled: settledMutate
  });

  const mUpdateAutomation: any = useMutationPost(UPDATE_AUTOMATION_RULE, queryKeys.deleteProcess, {
    onMutate: syncUpdateMutate,
    onError: errorMutate,
    onSuccess: successMutate,
    onSettled: settledMutate
  });

  const mDeleteAutomation: any = useMutationPost(DELETE_AUTOMATION_RULE, queryKeys.deleteProcess, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSuccess: successMutate,
    onSettled: settledMutate
  });

  return { mAddAutomation, mUpdateAutomation, mDeleteAutomation };
}

export default useAutomationMutate;
