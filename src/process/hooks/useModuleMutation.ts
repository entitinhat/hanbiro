import _ from 'lodash';

import { SET_TIMEOUT } from '@base/config/constant';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@process/config/queryKeys';
import { UPDATE_MODULE_PROCESS } from '@process/services/process';
import { useQueryClient } from '@tanstack/react-query';

function useModuleMutate() {
  const queryClient = useQueryClient();
  const { enqueueErrorBar } = useSnackBar();

  const mUpdateModule: any = useMutationPost(UPDATE_MODULE_PROCESS, queryKeys.updateModuleProcess, {
    onSuccess: (data: BaseMutationResponse) => {
      setTimeout(() => {
        queryClient.invalidateQueries([queryKeys.getModuleProcess]);
      }, SET_TIMEOUT);
    },
    onError: (error: any) => {
      enqueueErrorBar("It can't change status");
    }
  });

  return { mUpdateModule };
}

export default useModuleMutate;
