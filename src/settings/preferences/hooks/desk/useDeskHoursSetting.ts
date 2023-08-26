import usePost from '@base/hooks/usePost';
import { MenuSetting } from '@base/types/setting';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { GET_DESK_HOURS_SETTING } from '@settings/preferences/services/graphql/desk';

export const useDeskHoursSetting = () => {
  let queryKey = [queryKeys.menuSetting, 'desk', 'desk_hours'];
  const response = usePost<MenuSetting>(queryKey, GET_DESK_HOURS_SETTING, {});
  return response;
};
