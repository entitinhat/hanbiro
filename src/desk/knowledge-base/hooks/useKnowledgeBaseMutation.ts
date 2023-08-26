import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { UPDATE_KNOWELEDGEBASE } from '../services/graphql';

export default function useKnowledgeBaseMutation() {
  const queryClient = useQueryClient();

  const syncUpdateMutate = async (variables: any) => {
    await queryClient.cancelQueries([queryKeys.listKnowledgebases]);
    const previous = queryClient.getQueryData([queryKeys.listKnowledgebases]);
    queryClient.setQueryData([queryKeys.listKnowledgebases], (old: any) => {
      // const oResults = old.results ?? [];
      // return { results: [...oResults, ...optimistic] };
    });
    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData([queryKeys.listKnowledgebases], context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries([queryKeys.listKnowledgebases]);
  };

  const successMutate = (sucess: any, variables: any, context: any) => {};

  const mUpdateKB: any = useMutationPost<BaseMutationResponse>(UPDATE_KNOWELEDGEBASE, queryKeys.updateKnowledgeBase, {
    onMutate: syncUpdateMutate,
    onSuccess: successMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  return { mUpdateKB };
}
