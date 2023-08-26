import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';

//menu
import { queryKeys } from '@settings/preferences/config/sales/queryKeys';
import { SETTING_SALES_TEAM_CREATE } from '@settings/preferences/services/graphql/sales';

interface CreateProps {}

export default function useSalesTeamCreate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  let listQueryKey = [queryKeys.salesTeamsList, 'list'];

  const mPostResult = useMutationPost(SETTING_SALES_TEAM_CREATE, queryKeys.salesTeamCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created sales team successfully!');
      //console.log('onSuccess data', data);
      //console.log('onSuccess variables', variables);

      // cancel all queries that contain the key
      await queryClient.cancelQueries([queryKeys.salesTeamsList]); //pending get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(listQueryKey);
      if (!currentPage) {
        return;
      }
      //create new object
      const newSalesTeam: any = {
        id: data.id,
        ...variables.team
      };
      let newItems = [...currentPage.data];
      //add new item to first
      newItems.push(newSalesTeam);

      //adjust next page
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
          queryClient.invalidateQueries([queryKeys.salesTeamsList]);
        }, 3000);
      }
    }
  });

  return mPostResult;
}
