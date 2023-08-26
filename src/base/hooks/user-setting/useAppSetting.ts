import { queryKeys } from '@base/config/queryKeys';
import { GET_USER_SETTING } from '@base/services/graphql/setting';
import { DefaultConfigProps } from '@base/types/config';
import { FormatSetting } from '@settings/general/types/interface';
import usePost from '../usePost';
import useSnackBar from '../useSnackBar';
import useUserSettingMutation from './useUserSettingMutation';

const KEY_APP_SETTING = 'app_setting';
const MENU_APP_SETTING = 'common';
export function useAppSetting() {
  const { enqueueSuccessBar } = useSnackBar();
  const { mUpdateUserSetting } = useUserSettingMutation();
  const { data, isLoading } = usePost<FormatSetting>([queryKeys.getUserSetting], GET_USER_SETTING, {
    menu: MENU_APP_SETTING,
    key: KEY_APP_SETTING
  });
  const handleAppSetting = (nConfig: DefaultConfigProps) => {
    mUpdateUserSetting.mutate(
      { userSetting: { key: KEY_APP_SETTING, menu: MENU_APP_SETTING, value: JSON.stringify(nConfig) } },
      {
        onSuccess: () => {
          enqueueSuccessBar('The Configuare has updated!');
        }
      }
    );
  };
  return {
    saveAppSetting: handleAppSetting,
    appSetting: data,
    isLoading
  };
}
