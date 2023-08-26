import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';

//menu
import { OPPORTUNITY_IDENTIFY_CONTACT_CREATE, OPPORTUNITY_IDENTIFY_CONTACT_DELETE } from '@opportunity/services/graphql';
import { queryKeys } from '@opportunity/config/queryKeys';
import { BaseMutationResponse } from '@base/types/response';

export default function useIdentifyContactCreate(opportunityId: string) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);

  //build query key + params
  const listQueryKey = [queryKeys.opportunityIdentifyContactList, opportunityId];
  //console.log('queryKey', queryKey);

  const mPostResult = useMutationPost(OPPORTUNITY_IDENTIFY_CONTACT_CREATE, queryKeys.opportunityIdentifyContactCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created opportunity identify contact successfully!');
      //console.log('onSuccess data', data);
      //console.log('onSuccess variables', variables);

      // cancel all queries that contain the key
      await queryClient.cancelQueries([queryKeys.opportunityIdentifyContactList]); //pending get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(listQueryKey);
      if (!currentPage) {
        return;
      }
      //create new object
      const newContact: any = {
        id: data.id,
        ...variables.identifyContact
      };
      let newItems = [...currentPage.data];
      //add new item to first
      newItems.unshift(newContact);

      //adjust current page
      queryClient.setQueryData(listQueryKey, {
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
      enqueueErrorBar('There is an error during creating, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(listQueryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        //waiting some seconds for server processing
        setTimeout(() => {
          queryClient.invalidateQueries(listQueryKey);
        }, 1000);
      }
    }
  });

  return mPostResult;
}

//delete competitor
export function useOpportunityDeleteContact(opportunityId: string) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const listQueryKey = [queryKeys.opportunityIdentifyContactList, opportunityId];

  const mPostResult = useMutationPost(OPPORTUNITY_IDENTIFY_CONTACT_DELETE, queryKeys.opportunityIdentifyContactDelete, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Deleted the competitor of current opportunity successfully!');
    },
    onMutate: async (variables: any) => {
      const currentPage = queryClient.getQueryData<{ data: any[] }>(listQueryKey);
      if (!currentPage) {
        return;
      }
      //remove deleted items
      let newItems = currentPage.data.filter((_item: any) => !variables.identifyContactIds.includes(_item.id));

      //update current page
      queryClient.setQueryData(listQueryKey, {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Delete the identify contact of current opportunity failed');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(listQueryKey, context.currentItemsPage);
      }
    }
  });

  return mPostResult;
}
