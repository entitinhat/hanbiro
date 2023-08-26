import usePost from '@base/hooks/usePost';
import { MenuSetting } from '@base/types/setting';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { GET_RESOLVE_SLA_SETTING } from '@settings/preferences/services/graphql/desk';

export const useResolveSLASetting = () => {
  let queryKey = [queryKeys.menuSetting, 'desk', 'resolve_sla'];
  const response = usePost<MenuSetting>(queryKey, GET_RESOLVE_SLA_SETTING, {});
  return response;
};
