import useMutationPost from '@base/hooks/useMutationPost';
import { BaseResponse } from '@base/types/response';
import { responsePathAsArray } from 'graphql';
import { queryKeys } from '../config/queryKeys';
import { UPDATE_FORMAT_SETTING } from '../services/graphql';
interface TestResponse {
  key: string;
  value: string;
}
export const useUpdateFormatSetting = (options?: any) => {
  const mUpdateFormat: any = useMutationPost<BaseResponse<TestResponse>>(
    UPDATE_FORMAT_SETTING,
    queryKeys.settingFormatSettingUpdate,
    options
  );

  return mUpdateFormat;
};
