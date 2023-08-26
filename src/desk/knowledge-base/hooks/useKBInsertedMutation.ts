import _ from 'lodash';

import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../config/queryKeys';
import { CREATE_KNOWELEDGEBASE_INSERTED, DELETE_KNOWELEDGEBASE_INSERTED } from '../services/graphql';
import { KBInserted, KnowledgeBase } from '../types/knowledge';

export interface UseKBInsertedMutateProps {
  filterKey: string;
}

export default function useKBInsertedMutate({ filterKey }: UseKBInsertedMutateProps) {
  const queryClient = useQueryClient();
  const nQueryKeys = [queryKeys.kbInserteds, filterKey];
  const syncAddMutate = async (variables: any) => {
    await queryClient.cancelQueries(nQueryKeys);

    const previous = queryClient.getQueryData(nQueryKeys);
    const kb = variables.knowledge as KnowledgeBase;
    const optimistic: KBInserted = { id: variables.id as string, knowledge: kb };

    queryClient.setQueryData(nQueryKeys, (old: any) => {
      const oResults = old?.results ?? [];
      return { results: [...oResults, optimistic] };
    });

    return { previous };
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(nQueryKeys);

    const previous = queryClient.getQueryData(nQueryKeys);
    const optimistic = variables.ids as string[];
    queryClient.setQueryData(nQueryKeys, (old: any) => {
      const oResults = old?.results ?? [];
      return {
        results: oResults.filter((v: KBInserted) => !_.includes(optimistic, v.id))
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(nQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(nQueryKeys);
  };

  const mAddKbInserted: any = useMutationPost<BaseMutationResponse>(CREATE_KNOWELEDGEBASE_INSERTED, queryKeys.createKBInserted, {
    onMutate: syncAddMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });

  const mDeleteKBInserted: any = useMutationPost<BaseMutationResponse>(DELETE_KNOWELEDGEBASE_INSERTED, queryKeys.deleteKBInserted, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate
  });
  return { mAddKbInserted, mDeleteKBInserted };
}
