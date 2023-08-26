import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';

import { queryKeys } from '@product/product/config/queryKeys';
import { UPDATE_PRODUCTS } from '../services/graphql';


export const useProductsMutation = () => {
  const { enqueueSuccessBar } = useSnackBar();

  const mUpdates: any = useMutationPost<BaseMutationResponse>(UPDATE_PRODUCTS, queryKeys.updateProducts, {
    onSuccess: () => enqueueSuccessBar('Update leads successfully!')
  });

  return { mUpdates };
};
