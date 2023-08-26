import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import {
  KNOWLEDGE_CATEGORIES_SORT,
  KNOWLEDGE_CATEGORY_CREATE,
  KNOWLEDGE_CATEGORY_DELETE,
  KNOWLEDGE_CATEGORY_UPDATE
} from '../services/graphql';

export default function useKBCategoryMutation() {
  const queryClient = useQueryClient();
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  const syncCreateMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.kbCategories])
    const previous = queryClient.getQueryData([queryKeys.kbCategories]);
    queryClient.setQueryData([queryKeys.kbCategories], (old: any) => {
      // const oResults = old.results ?? [];
      // return { results: [...oResults, ...optimistic] };
    });
    return {previous}
  };

  const syncUpdateMutate = async (variables: any) => {
    console.log('variables',variables)
    await queryClient.cancelQueries([queryKeys.kbCategories])
    const previous = queryClient.getQueryData([queryKeys.kbCategories]);
    queryClient.setQueryData([queryKeys.kbCategories], (old: any) => {
      // const oResults = old.results ?? [];
      // return { results: [...oResults, ...optimistic] };
    });
    return {previous}
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.kbCategories])
    const previous = queryClient.getQueryData([queryKeys.kbCategories]);
    queryClient.setQueryData([queryKeys.kbCategories], (old: any) => {
      // const oResults = old.results ?? [];
      // return { results: [...oResults, ...optimistic] };
    });
    return {previous}
  };

  const syncSortMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.kbCategories])
    const previous = queryClient.getQueryData([queryKeys.kbCategories]);
    queryClient.setQueryData([queryKeys.kbCategories], (old: any) => {
      // const oResults = old.results ?? [];
      // return { results: [...oResults, ...optimistic] };
    });
    return {previous}
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.kbCategories], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.kbCategories]);
  };

  const successMutate = (sucess: any, variables: any, context: any) => {};

  const mCreateCategory: any = useMutationPost<BaseMutationResponse>(KNOWLEDGE_CATEGORY_CREATE, queryKeys.createKBCategory, {
    onMutate: syncCreateMutate,
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mUpdateCategory: any = useMutationPost<BaseMutationResponse>(KNOWLEDGE_CATEGORY_UPDATE, queryKeys.updateKBCategory, {
    onMutate: syncUpdateMutate,
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
    
  });

  const mDeleteCategory: any = useMutationPost<BaseMutationResponse>(KNOWLEDGE_CATEGORY_DELETE, queryKeys.deleteKBCategory, {
    onMutate: syncDeleteMutate,
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mSortCategory: any = useMutationPost<BaseMutationResponse>(KNOWLEDGE_CATEGORIES_SORT, queryKeys.sortKBCategory, {
    onMutate: syncSortMutate,
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mCreateCategory, mUpdateCategory, mDeleteCategory, mSortCategory };
}
