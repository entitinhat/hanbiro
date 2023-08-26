import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse, BaseMutationKeysResponse } from '@base/types/response';

import { queryKeys } from '@product/unit/config/queryKeys';
import { UPDATE_UNITS } from '../services/graphql';


export const useUnitsMutation = () => {
  const { enqueueSuccessBar } = useSnackBar();

  const mUpdates: any = useMutationPost<BaseMutationResponse>(UPDATE_UNITS, queryKeys.updateBaseUnits, {
    onSuccess: () => enqueueSuccessBar('Update leads successfully!')
  });

  return { mUpdates };
};
