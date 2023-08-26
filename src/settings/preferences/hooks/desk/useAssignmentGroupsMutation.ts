import { SET_TIMEOUT } from '@base/config/constant';
import { queryClient } from '@base/config/queryClient';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { queryKeys as deskQueryKeys } from '@settings/preferences/config/desk/queryKeys';
import { CREATE_ASSIGNMENT_GROUP, DELETE_ASSIGNMENT_GROUP, UPDATE_ASSIGNMENT_GROUP } from '@settings/preferences/services/graphql/desk';

export default function useAutoCloseTicketMutation() {
  const { enqueueSuccessBar } = useSnackBar();
  const mDelete: any = useMutationPost<BaseMutationResponse>(DELETE_ASSIGNMENT_GROUP, queryKeys.deleteAssignmentGroup, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was removed!'),
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([deskQueryKeys.assignmentGroups]);
      }, SET_TIMEOUT);
    }
  });
  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_ASSIGNMENT_GROUP, queryKeys.updateAssignmentGroup, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was updated!'),
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([deskQueryKeys.assignmentGroups]);
      }, SET_TIMEOUT);
    }
  });
  const mAdd: any = useMutationPost<BaseMutationResponse>(CREATE_ASSIGNMENT_GROUP, 'desk_createAssignmentGroup', {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!'),
    onSettled: () => {
      setTimeout(() => {
        queryClient.refetchQueries([deskQueryKeys.assignmentGroups]);
      }, SET_TIMEOUT);
    }
  });

  return { mDelete, mUpdate, mAdd };
}
