import usePost from '@base/hooks/usePost';
import { GET_MENU_SETTING, GET_MENU_SETTINGS, UPDATE_MENU_SETTING } from '@settings/general/services/graphql';
import { queryKeys } from '@settings/general/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import usePosts from '@base/hooks/usePosts';

export const useMenuSetting = (params: any, opt?: any) => {
  const usePostResult = usePost<any>(
    [queryKeys.settingMenuSettingGet, params.menu, params.key], //query keys
    GET_MENU_SETTING,
    params,
    opt
  );

  return usePostResult;
};

export const useMenuSettings = (params: any, opt?: any) => {
  const usePostResult = usePosts<any[]>(
    [queryKeys.settingMenuSettingsGet, params.menus.join(','), params.keys.join(',')],
    GET_MENU_SETTINGS,
    params,
    opt
  );

  return usePostResult;
};

export const useMenuSettingUpdate = () => {
  const mPost = useMutationPost(UPDATE_MENU_SETTING, queryKeys.settingMenuSettingUpdate);
  return mPost;
};
