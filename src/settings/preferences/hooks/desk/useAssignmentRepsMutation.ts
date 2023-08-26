import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { ADD_ASSIGNMENT_REPS, DELETE_ASSIGNMENT_REPS, UPDATE_ASSIGNMENT_REP } from '@settings/preferences/services/graphql/desk';
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys as deskQueryKeys } from '@settings/preferences/config/desk/queryKeys';
import { SET_TIMEOUT } from '@base/config/constant';

export default function useAutoCloseTicketMutation() {
  const { enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const mDeleteReps: any = useMutationPost<BaseMutationResponse>(DELETE_ASSIGNMENT_REPS, queryKeys.deleteAssignmentReps, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was removed!'),
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([deskQueryKeys.assignmentReps]);
      }, SET_TIMEOUT);
    }
  });
  const mAddReps: any = useMutationPost<BaseMutationResponse>(ADD_ASSIGNMENT_REPS, queryKeys.addAssignmentReps, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!'),
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([deskQueryKeys.assignmentReps]);
      }, SET_TIMEOUT);
    }
  });
  const mUpdateRep: any = useMutationPost<BaseMutationResponse>(UPDATE_ASSIGNMENT_REP, queryKeys.updateAssignmentReps, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was updated!'),
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([deskQueryKeys.assignmentReps]);
      }, SET_TIMEOUT);
    }
  });
  return { mDeleteReps, mAddReps, mUpdateRep };
}
