import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { queryKeys as assignQueryKeys } from '@settings/preferences/config/desk/queryKeys';
import { CREATE_ASSIGNMENT_USER, DELETE_ASSIGNMENT_USER, UPDATE_ASSIGNMENT_USER } from '@settings/preferences/services/graphql/desk';
import { useQueryClient } from '@tanstack/react-query';
import { SET_TIMEOUT } from '@base/config/constant';

export default function useAutoCloseTicketMutation() {
  const queryClient = useQueryClient();

  const { enqueueSuccessBar } = useSnackBar();
  const mDeleteUsers: any = useMutationPost<BaseMutationResponse>(DELETE_ASSIGNMENT_USER, queryKeys.deleteAssignmentUser, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was removed!'),
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([assignQueryKeys.assignmentUsers]);
      }, SET_TIMEOUT);
    }
  });
  const mAddUsers: any = useMutationPost<BaseMutationResponse>(CREATE_ASSIGNMENT_USER, queryKeys.addAssignmentUser, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!'),
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([assignQueryKeys.assignmentUsers]);
      }, SET_TIMEOUT);
    }
  });
  const mUpdateUsers: any = useMutationPost<BaseMutationResponse>(UPDATE_ASSIGNMENT_USER, queryKeys.updateAssignmentUser, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was updated!'),
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([assignQueryKeys.assignmentUsers]);
      }, SET_TIMEOUT);
    }
  });
  return { mDeleteUsers, mAddUsers, mUpdateUsers };
}
