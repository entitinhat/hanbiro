//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';

//menu
import { CLONE_MENU_TEMPLATE } from '../services/graphql';
import { queryKeys } from '../config/queryKeys';

export default function useMenuTemplateClone() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(CLONE_MENU_TEMPLATE, queryKeys.settingMenuTemplateClone, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      enqueueSuccessBar('Cloned Template successfully!');
    },
    onError: (error: any) => {
      //console.log('Cloned customer failed', error);
      enqueueErrorBar('Cloned Template failed');
    }
  });

  return mPostResult;
}
