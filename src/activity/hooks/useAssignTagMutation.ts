import { queryKeys } from '@activity/config/queryKeys';
import { ADD_TAG, DELETE_TAG } from '@activity/services/graphql';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';

function useAssignTagsMutate() {
  const queryClient = useQueryClient();
  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.tags]);

    const previous = queryClient.getQueryData([queryKeys.tags]);
    const optimistic = variables.tag as string;
    queryClient.setQueryData([queryKeys.tags], (old: any) => {
      const oResults = old.results ?? [];
      return { results: [...oResults, optimistic] };
    });

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.tags]);

    const previous = queryClient.getQueryData([queryKeys.tags]);
    const optimistic = variables.tag as string;
    queryClient.setQueryData([queryKeys.tags], (old: any) => {
      return {
        results: old.results?.filter((v: string) => v != optimistic)
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.tags], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.tags]);
  };

  const mAddTags: any = useMutationPost<BaseMutationResponse>(ADD_TAG, queryKeys.createTag, {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mDeleteTags: any = useMutationPost<BaseMutationResponse>(DELETE_TAG, queryKeys.deleteTag, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddTags, mDeleteTags };
}

export default useAssignTagsMutate;
