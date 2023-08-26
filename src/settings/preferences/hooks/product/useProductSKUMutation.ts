import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { UPDATE_MENU_SETTING } from '@settings/general/services/graphql';
import { queryKeys } from '@settings/preferences/config/product/queryKeys';

export const useProductSKUMutaion = () => {
  const { enqueueSuccessBar } = useSnackBar();
  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_MENU_SETTING, queryKeys.updateMenuSetting, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!')
  });
  return mUpdate;
};
