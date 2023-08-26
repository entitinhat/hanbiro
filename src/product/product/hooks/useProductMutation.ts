import { useQueryClient } from '@tanstack/react-query';

import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@product/product/config/queryKeys';
import { 
  CLONE_PRODUCT, 
  CREATE_PRODUCT, 
  DELETE_PRODUCT, 
  UPDATE_PRODUCT, 
  UPDATE_PRODUCT_BATCH,
  PRODUCT_RESTORE_PRODUCT,
  PRODUCT_DELETE_PRODUCT_RECOVERY,
  PRODUCT_EMPTY_PRODUCT_RECOVERY } from '../services/graphql';
import { SET_TIMEOUT } from '@base/config/constant';
import { Product } from '../types/product';
import _ from 'lodash';
import { BaseMutationKeysResponse, BaseMutationResponse } from '@base/types/response';

interface MutationProductBatch {
  products: Product[];
}

export const useProductMutation = (listQueryKey: any[]) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const rQueryKeys = [queryKeys.listProduct, ...listQueryKey];

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      return {
        results: old?.results?.filter((v: Product) => !_.includes(optimistic, v.id))
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

  const syncUpdateBatchMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);
    const previous = queryClient.getQueryData(rQueryKeys);
    console.log('syncUpdateBatchMutate', previous);
    queryClient.setQueriesData(rQueryKeys, (old: any) => {
      const optimistic = variables.products.map((v: any) => v.id);
      const results = old?.results?.map((p: Product) => {
        if (_.includes(optimistic, p.id)) {
          const uProduct = variables.products.filter((pItem: Product) => pItem.id == p.id)[0];
          return { ...p, ...uProduct };
        }
        return p;
      });
      return {
        ...old,
        results: results
      };
    });
    return { previous };
  };

  const mDelete = useMutationPost<BaseMutationKeysResponse>(DELETE_PRODUCT, queryKeys.deleteProduct, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete product successfully!')
  });

  const mClone = useMutationPost<BaseMutationKeysResponse>(CLONE_PRODUCT, queryKeys.cloneProduct, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Clone product successfully!')
  });

  const mUpdateBatch = useMutationPost<MutationProductBatch>(UPDATE_PRODUCT_BATCH, queryKeys.updateProductBatch, {
    onMutate: syncUpdateBatchMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update product batch successfully!')
  });

  const mCreate: any = useMutationPost<BaseMutationResponse>(CREATE_PRODUCT, queryKeys.createProduct, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Create product successfully!')
  });

  const mUpdate = useMutationPost<BaseMutationResponse>(UPDATE_PRODUCT, queryKeys.updateProduct, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update product successfully!')
  });

  const mRestore: any = useMutationPost<BaseMutationResponse>(PRODUCT_RESTORE_PRODUCT, queryKeys.productRestoreProduct, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Restore product successfully!')
  });

  const mEmpty: any = useMutationPost<BaseMutationResponse>(PRODUCT_DELETE_PRODUCT_RECOVERY, queryKeys.productDeleteProductRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete recovery product successfully!')
  });

  const mEmptyAll: any = useMutationPost<BaseMutationResponse>(PRODUCT_EMPTY_PRODUCT_RECOVERY, queryKeys.productEmptyProductRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete all recovery product successfully!')
  });

  return { mCreate, mDelete, mClone, mUpdate, mUpdateBatch, mRestore, mEmpty, mEmptyAll };
};
