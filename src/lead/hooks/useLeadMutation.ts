import useMutationPost from '@base/hooks/useMutationPost';
import { CREATE_LEAD, UPDATE_LEAD, LEAD_CREATE_COMPETITOR, LEAD_CREATE_CONTACT, LEAD_DELETE_COMPETITOR, LEAD_DELETE_CONTACT, LEAD_QUALIFY_LEAD } from '@lead/services/graphql';
import { queryKeys } from '@lead/config/queryKeys';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';

export const useLeadMutation = () => {
  const { enqueueSuccessBar } = useSnackBar();

  const mCreateLead = useMutationPost(CREATE_LEAD, queryKeys.leadCreateLead, {
    onSuccess: () => enqueueSuccessBar('Create lead successfully!')
  });
  const mUpdateLead = useMutationPost(UPDATE_LEAD, queryKeys.leadCreateLead, {
    onSuccess: () => enqueueSuccessBar('Update lead successfully!')
  });

  const mLeadCreateCompetitor = useMutationPost(LEAD_CREATE_COMPETITOR, queryKeys.leadCreateCompetitor, {
    onSuccess: () => enqueueSuccessBar('Update lead successfully!')
  });

  const mLeadCreateContact = useMutationPost(LEAD_CREATE_CONTACT, queryKeys.leadCreateContact, {
    onSuccess: () => enqueueSuccessBar('Update lead successfully!')
  });

  const mLeadDeleteCompetitor = useMutationPost(LEAD_DELETE_COMPETITOR, queryKeys.leadDeleteCompetitor, {
    onSuccess: () => enqueueSuccessBar('Update lead successfully!')
  });

  const mLeadDeleteContact = useMutationPost(LEAD_DELETE_CONTACT, queryKeys.leadDeleteContact, {
    onSuccess: () => enqueueSuccessBar('Update lead successfully!')
  });

  const mQualifyLead: any = useMutationPost<BaseMutationResponse>(LEAD_QUALIFY_LEAD, queryKeys.leadConvert, {
    onSuccess: () => enqueueSuccessBar('Qualify lead successfully!')
  });

  return { mCreateLead, mUpdateLead, mLeadCreateCompetitor, mLeadCreateContact, mLeadDeleteContact, mLeadDeleteCompetitor, mQualifyLead };
};
