import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';

//menu
import { queryKeys } from '@opportunity/config/queryKeys';
import { OPPORTUNITY_UPDATE, OPPORTUNITY_BULK_UPDATE } from '@opportunity/services/graphql';

export default function useOpportunityUpdate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);

  const mPostResult = useMutationPost(OPPORTUNITY_UPDATE, queryKeys.opportunityUpdate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any) => {
      enqueueSuccessBar('updated successfully!');
      const id = variables.opportunity.id;
      const queryKey: string[] = [queryKeys.opportunityGet, id, 'view'];

      // cancel all queries that contain the key list
      await queryClient.cancelQueries(queryKey); //pending get

      const currentView = queryClient.getQueryData<{ data: any }>(queryKey);
      //console.log('currentView', currentView);

      //create object
      const newView = { ...currentView, ...variables.opportunity };
      //adjust current data
      queryClient.setQueryData(queryKey, newView);
      //remove query list to refetch
      queryClient.removeQueries([queryKeys.opportunityList, 'list']);

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
          const id = variables.opportunity.id;
          queryClient.invalidateQueries([queryKeys.opportunityGet, id, 'view']);
        }, 1000);
      }
    }
  });

  return mPostResult;
}

//author: trungtm
export function useOpportunityBulkUpdate({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(OPPORTUNITY_BULK_UPDATE, queryKeys.opportunityBulkUpdate, {
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
