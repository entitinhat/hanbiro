import { useRef } from 'react';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { useQueryClient } from '@tanstack/react-query';

//menu
import { queryKeys } from '@campaign/config/queryKeys';
import { CAMPAIGN_UPDATE } from '@campaign/services/graphql';

interface CampaignUpdateProps {
  refreshList?: () => void;
}

export default function useCampaignUpdate({ refreshList }: CampaignUpdateProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);

  const mPostResult = useMutationPost(CAMPAIGN_UPDATE, queryKeys.campaignUpdate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any) => {
      enqueueSuccessBar('Campaign updated successfully!');

      const id = variables.campaign.id;
      const queryKey: string[] = [queryKeys.campaignGet, id, 'view'];

      // cancel all queries that contain the key list
      await queryClient.cancelQueries(queryKey); //pending get

      const currentView = queryClient.getQueryData<{ data: any }>(queryKey);
      //console.log('currentView', currentView);

      //create object
      const newView = { ...currentView, ...variables.campaign };
      //adjust current data
      queryClient.setQueryData(queryKey, newView);
      //remove query list to refetch
      queryClient.removeQueries([queryKeys.campaignListGet, 'list']);

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
          //refresh view
          const id = variables.campaign.id;
          queryClient.invalidateQueries([queryKeys.campaignGet, id, 'view']);
          //refresh list
          refreshList && refreshList();
        }, 1000);
      }
    }
  });

  return mPostResult;
}
