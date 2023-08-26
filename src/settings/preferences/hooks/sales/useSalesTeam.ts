import usePost from '@base/hooks/usePost';
import { queryKeys } from '@settings/preferences/config/sales/queryKeys';
import { SETTING_SALES_TEAM_VIEW } from '@settings/preferences/services/graphql/sales';

export const useSalesTeam = (teamId: string, options?: any) => {
  const queryKey: string[] = [queryKeys.salesTeamView, teamId, 'view'];
  const variables: any = {
    id: teamId
  };
  const response = usePost<any>(queryKey, SETTING_SALES_TEAM_VIEW, variables, {
    ...options
    // cacheTime: 0
  });
  return response;
};
