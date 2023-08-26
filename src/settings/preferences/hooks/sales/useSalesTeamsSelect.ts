//project base
import usePosts from '@base/hooks/usePosts';
import { IdName } from '@base/types/common';

//menu
import { queryKeys } from '@settings/preferences/config/sales/queryKeys';
import { SETTING_SALES_TEAM_LIST_SELECT } from '@settings/preferences/services/graphql/sales';

export const useSalesTeamsSelect = (keyword?: string, opt?: any) => {
  let queryKey = [queryKeys.salesTeamsList, 'list'];
  let params = {
    filter: {},
    query: 'name:' + keyword,
    sort: { field: 'createdBy', orderBy: 1 },
    paging: { page: 1, size: 100 }
  };
  const response = usePosts<IdName[]>(queryKey, SETTING_SALES_TEAM_LIST_SELECT, params, opt);

  return response;
};
