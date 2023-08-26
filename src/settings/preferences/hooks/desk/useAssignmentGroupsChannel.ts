import usePost from '@base/hooks/usePost';
import { FilterInput } from '@base/types/common';
import { BaseResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { GET_DESK_ASSIGNMENT_GROUPS } from '@settings/preferences/services/graphql/desk';
import { AssignmentGroup } from '@settings/preferences/types/desk/assignment';

export const useAssignmentGroupsChannel = (keyword: string, enabled: boolean) => {
  let filter: FilterInput = {
    query: 'name:' + keyword
  };
  let queryKey = [queryKeys.assignmentGroups, keyword];
  let params = {
    filter
  };
  const response = usePost<BaseResponse<AssignmentGroup[]>>(queryKey, GET_DESK_ASSIGNMENT_GROUPS, params, {
    // initialData: settingTicketCategories(), // init fake data
    enabled
  });
  return response;
};
