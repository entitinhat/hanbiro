import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import usePosts from '@base/hooks/usePosts';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { User } from '@base/types/user';

//menu
import { customerQueryKeys } from '@customer/config/queryKeys';
import { CREATE_CUSTOMER_ASSIGN_REP, DELETE_CUSTOMER_ASSIGN_REP, GET_CUSTOMER_ASSIGNED_REPS } from '@customer/services/graphql';

export const useCustomerAssignReps = (customerId: string) => {
  const usePostResult = usePosts<User[]>(
    [customerQueryKeys.customerAssignRepsGet, customerId],
    GET_CUSTOMER_ASSIGNED_REPS,
    { id: customerId },
    { enabled: customerId !== '' || customerId !== undefined }
  );

  return usePostResult;
};

interface AssignProps {
  customerId?: string;
  onClose?: () => void;
  onCancel?: () => void;
  onReload?: () => void;
}

export function useCustomerCreateAssignRep({ customerId, onClose, onCancel, onReload }: AssignProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);

  const mPostResult = useMutationPost(CREATE_CUSTOMER_ASSIGN_REP, customerQueryKeys.customerAssignRep, {
    useErrorBoundary: false,
    onSuccess: async (data: BaseMutationResponse, variables: any, context: any) => {
      //enqueueSuccessBar('Assign rep(s) successfully!');
      //apply for on list
      onCancel && onCancel();
      onReload && onReload();
      onClose && onClose();

      //on view
      //assign query key by customer
      const assignQueryKey = [customerQueryKeys.customerAssignRepsGet, customerId];
      // cancel all queries that contain the key list
      await queryClient.cancelQueries(assignQueryKey); //pending get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(assignQueryKey);
      //console.log('onMutate currentPage', currentPage);
      // if (!currentPage) {
      //   return;
      // }
      //create object
      const newItem = variables.assignTo[0].user;
      let newItems = currentPage?.data ? [...currentPage.data] : [];
      //add new item to first
      newItems.unshift(newItem);
      //console.log('onSuccess newItems', newItems);

      //adjust current page
      queryClient.setQueryData(assignQueryKey, {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      //enqueueErrorBar('There is an error during assigning, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData([customerQueryKeys.customerAssignRepsGet, customerId], context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        //waiting some seconds for server processing
        setTimeout(() => {
          queryClient.invalidateQueries([customerQueryKeys.customerAssignRepsGet, customerId]);
        }, 1000);
      }
    }
  });

  return mPostResult;
}

export function useCustomerDeleteRep({ customerId, onClose, onCancel, onReload }: AssignProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  //assign query key by customer
  const assignQueryKey = [customerQueryKeys.customerAssignRepsGet, customerId];

  const mPostResult = useMutationPost(DELETE_CUSTOMER_ASSIGN_REP, customerQueryKeys.customerDeleteRep, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any) => {
      //enqueueSuccessBar('Delete assign rep(s) successfully!');
      onClose && onClose();
      onCancel && onCancel();
      onReload && onReload();
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
      //variables.ids: string[] --> deleted ids

      // cancel all queries that contain the key list
      await queryClient.cancelQueries([assignQueryKey]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: any[] }>([assignQueryKey]);
      //console.log('onMutate currentPage', currentPage);
      if (!currentPage) {
        return;
      }

      //remove deleted items
      let newItems = currentPage.data.filter((_item: any) => !variables.refIds.includes(_item.id));

      //update current page
      queryClient.setQueryData([assignQueryKey], {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during deleting, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(assignQueryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        queryClient.invalidateQueries(assignQueryKey);
      }
    }
  });

  return mPostResult;
}
