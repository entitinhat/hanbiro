import _ from 'lodash';
import { useQueryClient } from '@tanstack/react-query';

import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse, BaseMutationKeysResponse } from '@base/types/response';

import {
  CREATE_ITEMS,
  DELETE_ITEM,
  UPDATE_ITEM,
  PRODUCT_RESTORE_ITEM,
  PRODUCT_DELETE_ITEM_RECOVERY,
  PRODUCT_EMPTY_ITEM_RECOVERY,
  UPDATE_ITEM_BATCH
} from '../services/graphql';
import { Item } from '../types/item';
import { queryKeys } from '@product/item/config/queryKeys';
interface MutationItemBatch {
  ids: string[];
  item: Item;
}

export const useItemMutation = (listQueryKey: any[]) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const rQueryKeys = [queryKeys.listItem, ...listQueryKey];

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];

    queryClient.setQueryData(rQueryKeys, (old: any) => {
      return {
        results: old.results?.filter((v: Item) => !_.includes(optimistic, v.id))
      };
    });

    return { previous };
  };

  const syncUpdateBatchMutate = async (variables: any) => {
    console.log('check Variable', variables);
    await queryClient.cancelQueries(rQueryKeys);
    const previous = queryClient.getQueryData(rQueryKeys);
    queryClient.setQueriesData(rQueryKeys, (old: any) => {
      const optimistic = variables.ids;
      const results = old?.results?.map((p: Item) => {
        if (_.includes(optimistic, p.id)) {
          const uItem = variables.items;
          return { ...p, ...uItem };
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
  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(rQueryKeys);
  };

  const mDelete: any = useMutationPost<BaseMutationKeysResponse>(DELETE_ITEM, queryKeys.deleteItem, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete item successfully!')
  });

  const mCreate: any = useMutationPost<BaseMutationResponse>(CREATE_ITEMS, queryKeys.createItems, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Create item successfully!')
  });

  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_ITEM, queryKeys.updateItem, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update item successfully!')
  });

  const mRestore: any = useMutationPost<BaseMutationResponse>(PRODUCT_RESTORE_ITEM, queryKeys.productRestoreItem, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Restore item successfully!')
  });

  const mEmpty: any = useMutationPost<BaseMutationResponse>(PRODUCT_DELETE_ITEM_RECOVERY, queryKeys.productDeleteItemRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete recovery item successfully!')
  });

  const mEmptyAll: any = useMutationPost<BaseMutationResponse>(PRODUCT_EMPTY_ITEM_RECOVERY, queryKeys.productEmptyItemRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete all recovery item successfully!')
  });

  const mUpdateBatch = useMutationPost<MutationItemBatch>(UPDATE_ITEM_BATCH, queryKeys.updateItemBatch, {
    onMutate: syncUpdateBatchMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update item batch successfully!')
  });

  return { mCreate, mDelete, mUpdate, mRestore, mEmpty, mEmptyAll, mUpdateBatch };
};
