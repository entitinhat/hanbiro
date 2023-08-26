import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';

//menu
import { customerQueryKeys } from '@customer/config/queryKeys';
import { CUSTOMER_BULK_UPDATE, UPDATE_CUSTOMER } from '@customer/services/graphql';

export default function useCustomerUpdate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);

  const mPostResult = useMutationPost(UPDATE_CUSTOMER, customerQueryKeys.customerUpdate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any) => {
      //enqueueSuccessBar('Customer updated successfully!');
      const id = variables.customer.id;
      const queryKey: string[] = [customerQueryKeys.customerGet, id, 'view'];

      // cancel all queries that contain the key list
      await queryClient.cancelQueries(queryKey); //pending get

      const currentView = queryClient.getQueryData<{ data: any }>(queryKey);
      //console.log('currentView', currentView);

      //create object
      const newView = { ...currentView, ...variables.customer };
      //adjust current data
      queryClient.setQueryData(queryKey, newView);
      //remove query list to refetch
      queryClient.removeQueries([customerQueryKeys.customersGet, 'list']);

      //return { currentView };
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('updated failed', error);
      enqueueErrorBar('There is an error during updating, try again.');
    },
    onSettled: (data: any, error: any, variables: any) => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        //waiting some seconds for server processing
        setTimeout(() => {
          const id = variables.customer.id;
          queryClient.invalidateQueries([customerQueryKeys.customerGet, id, 'view']);
        }, 1000);
      }
    }
  });

  return mPostResult;
}

//author: trungtm
export function useCustomerBulkUpdate({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(CUSTOMER_BULK_UPDATE, customerQueryKeys.customerBulkUpdate, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Bulk updated customer successfully!');
      onCancel && onCancel();
      //waiting some seconds for server processing
      setTimeout(() => {
        onReload && onReload();
      }, 1000);
    },
    onError: (error: any) => {
      enqueueErrorBar('There is an error during updating.');
    }
  });

  return mPostResult;
}
