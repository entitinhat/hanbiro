import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/general/config/queryKeys';
import { CREATE_MERGE_FIELD, DELETE_MERGE_FIELD, SORT_MERGE_FIELD } from '@settings/general/services/personalize/graphql';
import { useQueryClient } from '@tanstack/react-query';

export const useMergeFieldMutations = () => {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const mCreateMergeField = useMutationPost<any>(CREATE_MERGE_FIELD, queryKeys.settingMergeFieldCreate, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.settingMergeFieldGet] });
      enqueueSuccessBar('Add mergefield successfully!');
    },
    onError: () => {
      enqueueErrorBar('Add mergefield failed');
    }
  });

  const mDeleteMergeField = useMutationPost<BaseMutationResponse>(DELETE_MERGE_FIELD, queryKeys.settingMergeFieldDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.settingMergeFieldGet] });
      enqueueSuccessBar('Delete mergefield successfully!');
    },
    onError: () => {
      enqueueErrorBar('Delete mergefield failed');
    }
  });

  const mSortMergeField = useMutationPost<any>(SORT_MERGE_FIELD, queryKeys.settingMergeFieldSort, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.settingMergeFieldGet] });
      enqueueSuccessBar('Sort mergefield successfully!');
    },
    onError: () => {
      enqueueErrorBar('Sort mergefield failed');
    }
  });
  return {
    mCreateMergeField,
    mDeleteMergeField,
    mSortMergeField
  };
};
