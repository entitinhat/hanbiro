import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import { BaseMutationResponse, BaseMutationKeysResponse } from '@base/types/response';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';

import { queryKeys } from '@settings/preferences/config/queryKeys';
import { ProductGroup } from '@settings/preferences/types/group';
import { PRODUCT_GROUP_CREATE, PRODUCT_GROUP_DELETE, PRODUCT_GROUP_UPDATE } from '@product/group/services/graphql';

export const useProductGroupMutation = (listQueryKey: any[]) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const queryClient = useQueryClient();
  const rQueryKeys = [queryKeys.listProductGroups, ...listQueryKey];

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      return {
        results: old.results?.filter((v: ProductGroup) => !_.includes(optimistic, v.id))
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    console.log(error);
    console.log(context);
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(rQueryKeys);
  };

  const mDelete: any = useMutationPost<BaseMutationResponse>(PRODUCT_GROUP_DELETE, queryKeys.deleteProductGroup, {
    onSuccess: () => enqueueSuccessBar('Delete group successfully!')
  });

  const mCreate: any = useMutationPost<BaseMutationResponse>(PRODUCT_GROUP_CREATE, queryKeys.addProductGroup, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Create group successfully!')
  });

  const mUpdate: any = useMutationPost<BaseMutationResponse>(PRODUCT_GROUP_UPDATE, queryKeys.updateProductGroup, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update group successfully!')
  });

  return { mCreate, mDelete, mUpdate };
};
