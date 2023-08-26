import _ from 'lodash';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//config
import { SETTING_NEXT_ID_UPDATE } from '@base/services/graphql/setting';
import { queryKeys } from '@base/config/queryKeys';
import { BaseMutationResponse } from '@base/types/response';

export default function useNextCodeSettingUpdate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const queryClient = useQueryClient();

  const mUpdate: any = useMutationPost<BaseMutationResponse>(SETTING_NEXT_ID_UPDATE, queryKeys.settingNextIdSettingUpdate, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      //// console.log('after save', context);
      enqueueSuccessBar('Setting saved successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      //// console.log('mutation error', error);
      enqueueErrorBar('Setting saved  failed');
    }
  });

  return mUpdate;
}
