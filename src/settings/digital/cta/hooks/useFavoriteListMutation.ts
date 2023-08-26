import { queryKeys } from '@base/config/queryKeys';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { UPDATE_USER_SETTING } from '@base/services/graphql/setting';
import { MenuRequest } from '../types/index';

const useUpdateUserSettings = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const mUpdate: any = useMutationPost<MenuRequest>(UPDATE_USER_SETTING, queryKeys.updateUserSetting, {
    onSuccess: (data: any) => {
      enqueueSuccessBar('Updated successfully!');
    },
    onError: (error: any) => {
      enqueueErrorBar('Updated failed');
    }
  });
  return mUpdate;
};

export default useUpdateUserSettings;
