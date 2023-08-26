//project base
import usePost from '@base/hooks/usePost';
import usePosts from '@base/hooks/usePosts';
import { BaseResponse } from '@base/types/response';

//menu
import { queryKeys } from '@settings/preferences/config/sales/queryKeys';
import { SETTING_SALES_TEAM_LIST } from '@settings/preferences/services/graphql/sales';
import { SalesTeam } from '@settings/preferences/types/sales';

export const useSalesTeams = () => {
  let queryKey = [queryKeys.salesTeamsList, 'list'];
  let params = {
    filter: {},
    sort: { field: 'createdBy', orderBy: 1 },
    paging: { page: 1, size: 100 }
  };
  const response = usePosts<SalesTeam[]>(queryKey, SETTING_SALES_TEAM_LIST, params);

  return response;
};
