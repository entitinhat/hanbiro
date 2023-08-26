import { queryKeys } from '@activity/config/queryKeys';
import { ADD_RELATEDTO, DELETE_RELATEDTO } from '@activity/services/graphql';
import { RelatedTo } from '@activity/types/activity';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';

function useAssignRelatedToMutate() {
  const queryClient = useQueryClient();
  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.relatedTos]);

    const previous = queryClient.getQueryData([queryKeys.relatedTos]);
    const optimistic = variables.relatedTo as RelatedTo;
    queryClient.setQueryData([queryKeys.relatedTos], (old: any) => {
      const oResults = old.results ?? [];
      return { results: [...oResults, optimistic] };
    });

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.relatedTos]);

    const previous = queryClient.getQueryData([queryKeys.relatedTos]);
    const optimistic = variables.relatedId as string;
    queryClient.setQueryData([queryKeys.relatedTos], (old: any) => {
      return {
        results: old.results?.filter((v: RelatedTo) => v.id != optimistic)
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.relatedTos], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.relatedTos]);
  };

  const mAddRelatedTo: any = useMutationPost<BaseMutationResponse>(ADD_RELATEDTO, queryKeys.createAssignTo, {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mDeleteRelatedTo: any = useMutationPost<BaseMutationResponse>(DELETE_RELATEDTO, queryKeys.deleteAssignTo, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mAddRelatedTo, mDeleteRelatedTo };
}

export default useAssignRelatedToMutate;
