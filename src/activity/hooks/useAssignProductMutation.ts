import { queryKeys } from '@activity/config/queryKeys';
import { ADD_PRODUCT, DELETE_PRODUCT } from '@activity/services/graphql';
import useMutationPost from '@base/hooks/useMutationPost';
import { IdName } from '@base/types/common';
import { BaseMutationResponse } from '@base/types/response';
import { ShortProduct } from '@product/product/types/product';
import { useQueryClient } from '@tanstack/react-query';

function useAssignProductMutate() {
  const queryClient = useQueryClient();
  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.products]);

    const previous = queryClient.getQueryData([queryKeys.products]);
    const optimistic = variables.product as IdName;
    queryClient.setQueryData([queryKeys.products], (old: any) => {
      const oResults = old.results ?? [];
      return { results: [...oResults, optimistic] };
    });

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.products]);

    const previous = queryClient.getQueryData([queryKeys.products]);
    const optimistic = variables.refId as string;
    queryClient.setQueryData([queryKeys.products], (old: any) => {
      return {
        results: old.results?.filter((v: ShortProduct) => v?.id != optimistic)
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.products], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.products]);
  };

  const mAddProduct: any = useMutationPost<BaseMutationResponse>(ADD_PRODUCT, queryKeys.createProduct, {
    // useErrorBoundary: false,
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mDeleteProduct: any = useMutationPost<BaseMutationResponse>(DELETE_PRODUCT, queryKeys.deleteProduct, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddProduct, mDeleteProduct };
}

export default useAssignProductMutate;
