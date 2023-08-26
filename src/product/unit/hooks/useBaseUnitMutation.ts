import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { BaseMutationResponse, BaseMutationKeysResponse } from '@base/types/response';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';

import { queryKeys } from '@product/unit/config/queryKeys';
import { CREATE_UNIT, DELETE_UNIT, UPDATE_UNIT, PRODUCT_RESTORE_UNIT, PRODUCT_DELETE_UNIT_RECOVERY, PRODUCT_EMPTY_UNIT_RECOVERY } from '../services/graphql';
import { BaseUnit } from './../types/unit';

export const useBaseUnitMutation = (listQueryKey: any[]) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const queryClient = useQueryClient();
  const rQueryKeys = [queryKeys.listBaseUnits, ...listQueryKey];

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      return {
        results: old.results?.filter((v: BaseUnit) => !_.includes(optimistic, v.id))
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(rQueryKeys);
  };

  const mDelete = useMutationPost<BaseMutationKeysResponse>(DELETE_UNIT, queryKeys.deleteBaseUnit, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete base unit successfully!')
  });

  const mCreate: any = useMutationPost<BaseMutationResponse>(CREATE_UNIT, queryKeys.createBaseUnit, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Create base unit successfully!')
  });

  const mUpdate = useMutationPost<BaseMutationResponse>(UPDATE_UNIT, queryKeys.updateBaseUnit, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update base unit successfully!')
  });

  const mRestore: any = useMutationPost<BaseMutationResponse>(PRODUCT_RESTORE_UNIT, queryKeys.productRestoreUnit, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Restore unit successfully!')
  });

  const mEmpty: any = useMutationPost<BaseMutationResponse>(PRODUCT_DELETE_UNIT_RECOVERY, queryKeys.productDeleteUnitRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete recovery unit successfully!')
  });

  const mEmptyAll: any = useMutationPost<BaseMutationResponse>(PRODUCT_EMPTY_UNIT_RECOVERY, queryKeys.productEmptyUnitRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete all recovery unit successfully!')
  });

  return { mCreate, mDelete, mUpdate, mRestore, mEmpty, mEmptyAll };
};
