import usePosts from '@base/hooks/usePosts';
import { queryKeys } from '@settings/preferences/config/product/queryKeys';
import { GET_USER_IN_GROUP } from '@base/services/graphql/user';

export const useSettingGroupUsers = (params: any, opt?: any) => {
  const response = usePosts<any[]>([queryKeys.settingGroupUsers, params.groupId, params.keyword], GET_USER_IN_GROUP, params, opt);

  return response;
};
