import usePost from '@base/hooks/usePost';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { GET_DESK_ASSIGNMENT_REPS } from '@settings/preferences/services/graphql/desk';
import { AssignmentRep } from '@settings/preferences/types/desk/assignment';

export const useAssignmentReps = (groupId: string) => {
  let queryKey = [queryKeys.assignmentReps, groupId];
  let params = {
    // id: groupId
    filter: {
      query: `groupId=${groupId}`
    }
  };
  const response = usePost<BaseResponse<AssignmentRep[]>>(queryKey, GET_DESK_ASSIGNMENT_REPS, params, {
    // initialData: settingTicketCategories(), // init fake data
    enabled: groupId != ''
  });
  return response;
};
