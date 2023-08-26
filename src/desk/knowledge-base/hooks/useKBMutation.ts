import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import {
  CHANGE_KB_PUBLISH_STATUS,
  DELETE_KNOWELEDGEBASE,
  KNOWLEDGE_CATEGORY_CHANGE,
  DESK_KB_RESTORE,
  DESK_KB_DELETE_RECOVERY,
  DESK_KB_EMPTY_RECOVERY
} from '@desk/knowledge-base/services/graphql';
import _ from 'lodash';
import { KnowledgeBase } from '../types/knowledge';
import { useQueryClient } from '@tanstack/react-query';

export default function useKBMutation(listQueryKey: any[]) {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const rQueryKeys = [queryKeys.listKnowledgebases, ...listQueryKey];
  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries({ queryKey: rQueryKeys, refetchType: 'none' });
  };

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      return {
        data: old?.data?.filter((v: KnowledgeBase) => !_.includes(optimistic, v.id))
      };
    });

    return { previous };
  };

  const syncUpdatePublishMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const id = variables?.ids[0];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      const newVal = {
        data: old?.data?.map((v: KnowledgeBase) => {
          if (v.id == id) {
            return { ...v, isPublish: variables?.isPublish };
          } else {
            return { ...v };
          }
        }),
        paging: old?.paging
      };
      return newVal;
    });
    return { previous };
  };

  const syncUpdateCategory = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      const newVal = {
        data: old?.data?.map((v: KnowledgeBase) => {
          let val = { ...v };
          for (let id of variables?.ids) {
            if (v.id == id) {
              val = { ...v, category: variables?.category };
            }
          }
          return val;
        }),
        paging: old?.paging
      };
      return newVal;
    });

    return { previous };
  };

  const mDelete: any = useMutationPost<BaseMutationResponse>(DELETE_KNOWELEDGEBASE, queryKeys.deleteKnowledgebase, {
    onMutate: syncDeleteMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.listKnowledgebases] });
        enqueueSuccessBar('Delete knowledgebase successfully!');
      }, 2000);

      // enqueueSuccessBar('success');
    }
  });

  const mUpdatePublish: any = useMutationPost<BaseMutationResponse>(CHANGE_KB_PUBLISH_STATUS, queryKeys.updateKBPublishStatus, {
    onMutate: syncUpdatePublishMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => {
      enqueueSuccessBar('success');
    }
  });

  const mUpdateCategory: any = useMutationPost<BaseMutationResponse>(KNOWLEDGE_CATEGORY_CHANGE, queryKeys.moveKB, {
    onMutate: syncUpdateCategory,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => {
      enqueueSuccessBar('success');
    }
  });

  const mRestore: any = useMutationPost<BaseMutationResponse>(DESK_KB_RESTORE, queryKeys.kbRestore, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Restore Kb successfully!')
  });

  const mEmpty: any = useMutationPost<BaseMutationResponse>(DESK_KB_DELETE_RECOVERY, queryKeys.kbDeleteRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete recovery Kb successfully!')
  });

  const mEmptyAll: any = useMutationPost<BaseMutationResponse>(DESK_KB_EMPTY_RECOVERY, queryKeys.kbEmptyRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete all recovery Kb successfully!')
  });

  return { mUpdatePublish, mUpdateCategory, mDelete, mRestore, mEmpty, mEmptyAll };
}
