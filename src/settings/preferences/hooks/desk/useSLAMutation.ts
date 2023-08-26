import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { UPDATE_SLA_SETTING } from '@settings/preferences/services/graphql/desk';

export default function useSLAMutation() {
  const { enqueueSuccessBar } = useSnackBar();
  const mUpdate: any = useMutationPost<BaseMutationResponse>(UPDATE_SLA_SETTING, queryKeys.updateMenuSetting, {
    onSuccess: (res: any) => enqueueSuccessBar('Data was saved!')
  });
  return { mUpdate };
}
