import usePost from '@base/hooks/usePost';
import { MenuSetting } from '@base/types/setting';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { GET_PRIORITY_SETTING } from '@settings/preferences/services/graphql/desk';

export const usePrioritySetting = () => {
  let queryKey = [queryKeys.menuSetting, 'desk', 'priority'];
  const response = usePost<MenuSetting>(queryKey, GET_PRIORITY_SETTING, {});
  return response;
};
