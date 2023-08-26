import useMutationPost from '@base/hooks/useMutationPost';
import { UPDATE_LEADS, DELETE_LEADS, LEAD_RESTORE, LEAD_DELETE_RECOVERY, LEAD_EMPTY_RECOVERY, LEAD_QUALIFY_LEADS } from '@lead/services/graphql';
import { queryKeys } from '@lead/config/queryKeys';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse, BaseMutationKeysResponse } from '@base/types/response';

export const useLeadsMutation = () => {
  const { enqueueSuccessBar } = useSnackBar();

  const mUpdateLeads: any = useMutationPost<BaseMutationResponse>(UPDATE_LEADS, queryKeys.updateLead, {
    // onError: errorMutate,
    // onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Update leads successfully!')
  });

  const mDeleteLeads: any = useMutationPost<BaseMutationKeysResponse>(DELETE_LEADS, queryKeys.leadDeleteLead, {
    //onMutate: syncDeleteMutate,
    //onError: errorMutate,
    //onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete leads successfully!')
  });

  const mRestore: any = useMutationPost<BaseMutationResponse>(LEAD_RESTORE, queryKeys.leadRestoreLead, {
    //onError: errorMutate,
    //onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Restore leads successfully!')
  });

  const mEmpty: any = useMutationPost<BaseMutationResponse>(LEAD_DELETE_RECOVERY, queryKeys.leadDeleteRecovery, {
    //onError: errorMutate,
    //onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete recovery leads successfully!')
  });

  const mEmptyAll: any = useMutationPost<BaseMutationResponse>(LEAD_EMPTY_RECOVERY, queryKeys.leadEmptyRecovery, {
    //onError: errorMutate,
    //onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete all recovery leads successfully!')
  });

  const mQualifyLeads: any = useMutationPost<BaseMutationResponse>(LEAD_QUALIFY_LEADS, queryKeys.leadsConvert, {
    //onError: errorMutate,
    //onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Qualify leads successfully!')
  });

  return { mUpdateLeads, mDeleteLeads, mRestore, mEmpty, mEmptyAll, mQualifyLeads };
};
