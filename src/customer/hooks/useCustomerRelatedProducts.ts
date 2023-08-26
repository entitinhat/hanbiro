import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import usePost from '@base/hooks/usePost';
import useSnackBar from '@base/hooks/useSnackBar';

//menu
import { customerQueryKeys } from '@customer/config/queryKeys';
import { CUSTOMER_RELATED_PRODUCT_GET, UPDATE_CUSTOMER } from '@customer/services/graphql';
import { Customer } from '@customer/types/interface';

export const useCustomerRelatedProducts = (customerId: string) => {
  const usePostResult = usePost<Customer>(
    [customerQueryKeys.customerGet, customerId, 'product'],
    CUSTOMER_RELATED_PRODUCT_GET,
    { id: customerId },
    { enabled: customerId !== '' || customerId !== undefined }
  );

  return usePostResult;
};

export function useCustomerAddRelatedProduct(customerId: string) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  //query key
  const productQueryKey = [customerQueryKeys.customerGet, customerId, 'product'];

  const mPostResult = useMutationPost(UPDATE_CUSTOMER, customerQueryKeys.customerUpdate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      //enqueueSuccessBar('Created survey successfully!');

      // cancel all queries that contain the key list
      await queryClient.cancelQueries(productQueryKey); //pending get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(productQueryKey);
      //console.log('onMutate currentPage', currentPage);
      // if (!currentPage) {
      //   return;
      // }

      //adjust current page
      queryClient.setQueryData(productQueryKey, {
        ...currentPage,
        data: variables.customer.relatedProducts
      });

      return { currentItemsPage: currentPage };
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      //enqueueErrorBar('There is an error during creating, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(productQueryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        //waiting some seconds for server processing
        setTimeout(() => {
          queryClient.invalidateQueries(productQueryKey);
        }, 1000);
      }
    }
  });

  return mPostResult;
}

export function useCustomerDeleteRelatedProduct(customerId: string) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  //query key
  const productQueryKey = [customerQueryKeys.customerGet, customerId, 'product'];

  const mPostResult = useMutationPost(UPDATE_CUSTOMER, customerQueryKeys.customerUpdate, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any) => {
      // enqueueSuccessBar('Delete contact(s) successfully!');
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
      //variables.ids: string[] --> deleted ids

      // cancel all queries that contain the key list
      await queryClient.cancelQueries(productQueryKey); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(productQueryKey);
      //console.log('onMutate currentPage', currentPage);
      if (!currentPage) {
        return;
      }

      //update current page
      queryClient.setQueryData(productQueryKey, {
        ...currentPage,
        data: variables.customer.relatedProducts
      });

      return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('assigning failed', error);
      enqueueErrorBar('There is an error during delete assigning, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(productQueryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        queryClient.invalidateQueries(productQueryKey);
      }
    }
  });

  return mPostResult;
}
