import usePost from "@base/hooks/usePost";
import { MenuSetting } from "@base/types/setting";
import { queryKeys } from "@settings/preferences/config/queryKeys";
import { GET_SLA_SETTING } from "@settings/preferences/services/graphql/desk";

export const useSLASetting = () => {
  let queryKey = [queryKeys.menuSetting, 'desk', 'sla'];
  const response = usePost<MenuSetting>(queryKey, GET_SLA_SETTING, {});
  return response;
};