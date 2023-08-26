import { queryKeys } from '@base/config/queryKeys';
import { UPDATE_USER_SETTING } from '@base/services/graphql/setting';
import { BaseMutationResponse } from '@base/types/response';
import useMutationPost from '../useMutationPost';

export default function useUserSettingMutation() {
  const mUpdateUserSetting: any = useMutationPost<BaseMutationResponse>(UPDATE_USER_SETTING, queryKeys.updateUserSetting);
  return { mUpdateUserSetting };
}
