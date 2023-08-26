import usePost from '@base/hooks/usePost';
import { MenuSetting } from '@base/types/setting';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { GET_RESPOND_PRIORITY_SETTING } from '@settings/preferences/services/graphql/desk';

export const useRespondByPrioritySetting = () => {
  let queryKey = [queryKeys.menuSetting, 'desk', 'respond_priority'];
  const response = usePost<MenuSetting>(queryKey, GET_RESPOND_PRIORITY_SETTING, {});
  return response;
};
