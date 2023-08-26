import { queryKeys } from '@base/config/queryKeys';
import { GET_USER_SETTING } from '@base/services/graphql/setting';
import { DefaultConfigProps } from '@base/types/config';
import { FormatSetting } from '@settings/general/types/interface';
import { useQueryClient } from '@tanstack/react-query';
import usePost from '../usePost';
import useSnackBar from '../useSnackBar';
import useUserSettingMutation from './useUserSettingMutation';

const KEY_INTRO_SETTING = 'app_intro';
const MENU_INTRO_SETTING = 'common';
interface IntroSetting {
  id: string;
  menu: string;
  key: string;
  parse?: boolean;
  value: string;
}
export function useIntroSetting() {
  const { enqueueSuccessBar } = useSnackBar();
  const { mUpdateUserSetting } = useUserSettingMutation();

  const queryClient = useQueryClient();
  const rQueryKeys = [queryKeys.getUserSetting, MENU_INTRO_SETTING, KEY_INTRO_SETTING];
  const { data, isLoading, refetch, isSuccess } = usePost<IntroSetting>(
    [queryKeys.getUserSetting, MENU_INTRO_SETTING, KEY_INTRO_SETTING],
    GET_USER_SETTING,
    {
      menu: MENU_INTRO_SETTING,
      key: KEY_INTRO_SETTING
    }
  );
  // console.log('data intro', data);
  const handleIntroSetting = (introMenus: string[]) => {
    mUpdateUserSetting.mutate(
      { userSetting: { key: KEY_INTRO_SETTING, menu: MENU_INTRO_SETTING, value: JSON.stringify(introMenus) } },
      {
        onSuccess: () => {
          // refetch();
          queryClient.setQueryData(rQueryKeys, (old: any) => {
            console.log('old data intro menu', old);
            return { ...old, value: JSON.stringify(introMenus) };
          });
          enqueueSuccessBar('The Configuare has updated!');
        }
      }
    );
  };
  return {
    saveIntroSetting: handleIntroSetting,
    introSetting: data,
    isLoading,
    isSuccess
  };
}
