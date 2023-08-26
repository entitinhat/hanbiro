import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../config/queryKeys';
import { UPDATE_UNIT_VALUES } from '../services/graphql';

export const useUnitValuesMutation = (listQueryKey: any[]) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const queryClient = useQueryClient();
  const rQueryKeys = [queryKeys.listUnitValues, queryKeys.viewBaseUnit, ...listQueryKey];

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(rQueryKeys);
  };

  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_UNIT_VALUES, queryKeys.updateBaseUnit, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update unit name successfully!')
  });

  return { mUpdate };
};
