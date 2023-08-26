import usePost from '@base/hooks/usePost';
import { GET_MENU_SETTING } from '@settings/general/services/graphql';
import { queryKeys } from '@settings/preferences/config/product/queryKeys';

export const useProductGeneralSetting = (params: any, opt?: any) => {
  const response = usePost<any>([queryKeys.settingMenusSetting, params.menu, params.key], GET_MENU_SETTING, params, opt);

  return response;
};
