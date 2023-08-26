import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import usePosts from '@base/hooks/usePosts';
import useSnackBar from '@base/hooks/useSnackBar';

//menu
import { customerQueryKeys } from '@customer/config/queryKeys';
import {
  ADD_CUSTOMER_EMPLOYEE_CONTACT_ASSIGN,
  CUSTOMER_LIST_FOR_SELECT,
  DELETE_CUSTOMER_EMPLOYEE_CONTACT_DELETE
} from '@customer/services/graphql';
import { CUSTOMER_CATEGORY_CONTACT, CUSTOMER_CATEGORY_ENUM } from '@customer/config/constants';
import { Customer } from '@customer/types/interface';

export const useCustomerAssignContacts = (customerId: string, params: any = {}) => {
  const assignQueryKey = [customerQueryKeys.customersGet, customerId, 'employee', params?.filter];
  const usePostResult = usePosts<Customer[]>(assignQueryKey, CUSTOMER_LIST_FOR_SELECT, params, {
    enabled: customerId !== '' || customerId !== undefined
  });

  return usePostResult;
};

export function useCustomerCreateAssignContact() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(ADD_CUSTOMER_EMPLOYEE_CONTACT_ASSIGN, customerQueryKeys.customerUpdate, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      // enqueueSuccessBar('Assign contact(s) successfully!');
    },
    onError: (error: any) => {
      //console.log('assigning failed', error);
      enqueueErrorBar('There is an error during assigning, please try again.');
    }
  });

  return mPostResult;
}

export function useCustomerDeleteContact(menuSourceId: string) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const contactListQueryKey = [customerQueryKeys.customersGet, menuSourceId, 'employee'];

  const mPostResult = useMutationPost(DELETE_CUSTOMER_EMPLOYEE_CONTACT_DELETE, customerQueryKeys.customerDelete, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any) => {
      //enqueueSuccessBar('Delete contact(s) successfully!');

      //remove list query
      queryClient.removeQueries([customerQueryKeys.customersGet, 'list']);
      // cancel all queries that contain the key list
      await queryClient.cancelQueries(contactListQueryKey); //duplicated get
      const currentList = queryClient.getQueryData<{ data: Customer[] }>(contactListQueryKey);
      //console.log('currentList', currentList);
      if (!currentList) {
        return;
      }
      //remove deleted items
      let newList = currentList.data.filter((_item: any) => !variables.ids.includes(_item.id));
      //update current page
      queryClient.setQueryData([customerQueryKeys.customerAssignRepsGet], {
        ...currentList,
        data: newList
      });
      return { currentList };
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('assigning failed', error);
      enqueueErrorBar('There is an error during delete assigning, try again.');
      if (context?.currentList) {
        queryClient.setQueryData(contactListQueryKey, context.currentList);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        setTimeout(() => {
          queryClient.invalidateQueries(contactListQueryKey);
        }, 1000);
      }
    }
  });

  return mPostResult;
}
