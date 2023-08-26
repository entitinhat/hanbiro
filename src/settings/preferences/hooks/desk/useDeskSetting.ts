import usePost from '@base/hooks/usePost';
import { MenuSetting } from '@base/types/setting';
import { GET_DESK_HOURS_SETTING, GET_RESPOND_PRIORITY_SETTING, GET_SLA_SETTING } from '@settings/preferences/services/graphql/desk';

export const useDeskHoursSetting = () => {
  let queryKey = ['setting_menuSetting', 'desk', 'desk_hours'];
  const response = usePost<MenuSetting>(queryKey, GET_DESK_HOURS_SETTING, {});
  return response;
};

export const useSLASetting = () => {
  let queryKey = ['setting_menuSetting', 'desk', 'sla'];
  const response = usePost<MenuSetting>(queryKey, GET_SLA_SETTING, {});
  return response;
};

export const useRespondByPrioritySetting = () => {
  let queryKey = ['setting_menuSetting', 'desk', 'respond_priority'];
  const response = usePost<MenuSetting>(queryKey, GET_RESPOND_PRIORITY_SETTING, {});
  return response;
};
