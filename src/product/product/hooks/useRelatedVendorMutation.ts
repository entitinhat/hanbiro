import { useQueryClient } from '@tanstack/react-query';

import { BaseMutationResponse } from '@base/types/response';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { queryKeys } from '@product/product/config/queryKeys';
import { UPDATE_PRODUCT } from '../services/graphql';
import { Customer } from '@customer/types/interface';

export const useRelatedVendorMutation = () => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();

  const mAssignVendor = useMutationPost<BaseMutationResponse>(UPDATE_PRODUCT, queryKeys.updateProduct, {
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      const optimistic = (variables?.product?.vendor as Customer[]) ?? [];
      queryClient.setQueryData([queryKeys.listRelatedVendor, 'vendor', variables?.product?.id], (old: any) => {
        return { ...old, vendor: optimistic };
      });
      enqueueSuccessBar('Assign vendor successfully!');
    },
    onError: (data: BaseMutationResponse) => {
      enqueueErrorBar('Assign vendor failed');
    }
  });

  const mDeleteVendor = useMutationPost<BaseMutationResponse>(UPDATE_PRODUCT, queryKeys.updateProduct, {
    onSuccess: (data: BaseMutationResponse, variables: any, context: any) => {
      const optimistic = (variables?.product?.vendor as Customer[]) ?? [];
      queryClient.setQueryData([queryKeys.listRelatedVendor, 'vendor', variables?.product?.id], (old: any) => {
        return { ...old, vendor: optimistic };
      });
      enqueueSuccessBar('Delete assign vendor successfully!');
    },
    onError: (data: BaseMutationResponse) => {
      enqueueErrorBar('Delete assign vendor failed');
    }
  });

  return { mAssignVendor, mDeleteVendor };
};
