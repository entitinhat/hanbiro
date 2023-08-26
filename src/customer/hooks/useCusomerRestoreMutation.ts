import _ from 'lodash';
import { useQueryClient } from '@tanstack/react-query';

import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse, BaseMutationKeysResponse } from '@base/types/response';

import { CUSTOMER_RESTORE_CUSTOMER, CUSTOMER_DELETE_CUSTOMER_RECOVERY, CUSTOMER_EMPTY_CUSTOMER_RECOVERY } from '../services/graphql';
import { customerQueryKeys } from '@customer/config/queryKeys';

//author: luonglh
export const useCusomerRestoreMutation = (listQueryKey: any[]) => {
  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();
  const queryClient = useQueryClient();
  const rQueryKeys = [customerQueryKeys.customerGet, ...listQueryKey];

  const syncDeleteMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      console.log('rQueryKeysold', old);
      return {
        results: old.results?.filter((v: any) => !_.includes(optimistic, v.id))
      };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(rQueryKeys);
  };

  const mRestore: any = useMutationPost<BaseMutationResponse>(CUSTOMER_RESTORE_CUSTOMER, customerQueryKeys.customerRestore, {
    onError: errorMutate,
    //onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Restored customer successfully!')
  });

  const mEmpty: any = useMutationPost<BaseMutationResponse>(CUSTOMER_DELETE_CUSTOMER_RECOVERY, customerQueryKeys.customerDeleteRecovery, {
    onError: errorMutate,
    //onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Deleted recovery customer successfully!')
  });

  const mEmptyAll: any = useMutationPost<BaseMutationResponse>(CUSTOMER_EMPTY_CUSTOMER_RECOVERY, customerQueryKeys.customerEmptyRecovery, {
    onError: errorMutate,
    //onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Deleted all recovery customer successfully!')
  });

  return { mRestore, mEmpty, mEmptyAll };
};

//author: trungtm
export function useCustomerRestore({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(CUSTOMER_RESTORE_CUSTOMER, customerQueryKeys.customerRestore, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Restored customer successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Restore customer failed');
    }
  });

  return mPostResult;
}

//author: trungtm
export function useCustomerEmptyRecovery({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(CUSTOMER_EMPTY_CUSTOMER_RECOVERY, customerQueryKeys.customerEmptyRecovery, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Empty recovery successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Empty recovery customer failed');
    }
  });

  return mPostResult;
}

//author: trungtm
export function useCustomerDeleteRecovery({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(CUSTOMER_DELETE_CUSTOMER_RECOVERY, customerQueryKeys.customerDeleteRecovery, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Delete recovery successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Delete recovery customer failed');
    }
  });

  return mPostResult;
}
