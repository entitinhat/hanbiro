import usePost from '@base/hooks/usePost';
import { FilterInput } from '@base/types/common';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { GET_DESK_ASSIGNMENT_USERS } from '@settings/preferences/services/graphql/desk';
import { AssignmentUser } from '@settings/preferences/types/desk/assignment';

export const useAssignmentUsers = (keyword: string) => {
  let filter: FilterInput = {
    query: 'name:' + keyword
  };
  let queryKey = [queryKeys.assignmentUsers, keyword];
  let params = {
    filter
  };
  const response = usePost<BaseResponse<AssignmentUser[]>>(queryKey, GET_DESK_ASSIGNMENT_USERS, params, {
    // initialData: settingTicketCategories(), // init fake data
  });
  return response;
};
