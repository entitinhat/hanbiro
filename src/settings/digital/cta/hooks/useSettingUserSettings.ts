import usePost from '@base/hooks/usePost';
import { GET_USER_SETTINGS } from '@base/services/graphql/setting';
import { queryKeys } from '@settings/digital/cta/services/queryKeys';

const useSettingUserSettings = () => {
  const params = {
    menu: 'common'
  };
  const response = usePost<any>([queryKeys.setingUserSettings, params.menu], GET_USER_SETTINGS, params, {});
  return response;
};

export default useSettingUserSettings;
