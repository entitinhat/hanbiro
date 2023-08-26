import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@settings/assignment-rule/rule/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';
import { UPDATE_ASSIGNMENT_RULE_ENTRY } from '@settings/assignment-rule/rule/services/graphql';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';

export default function useAssignRuleEntryUpdate() {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar } = useSnackBar();

  const mUpdate = useMutationPost<any>(UPDATE_ASSIGNMENT_RULE_ENTRY, queryKeys.updateAssignRuleEntry, {
    onSuccess: async (data: BaseMutationResponse, variables: any) => {
      //setIsSaving(false);
      //onMutationSuccess(variables);
      enqueueSuccessBar('Updated Rule Entry successfully!');
      //enqueueSuccessBar('Customer updated successfully!');
      const id = variables.arEntry.id;
      queryClient.invalidateQueries([queryKeys.viewRule]);
    },
    onError: (error: any, variables: any, context: any) => {
      //setIsSaving(false);
      queryClient.setQueryData(['setting_assignmentRule'], context.previousSequence);
      enqueueSuccessBar('Updated Rule Entry failed!');
    }
  });
  return mUpdate;
}
