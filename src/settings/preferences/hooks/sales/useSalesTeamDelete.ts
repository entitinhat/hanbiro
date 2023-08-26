import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project base
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';

//menu
import { queryKeys } from '@settings/preferences/config/sales/queryKeys';
import { SETTING_SALES_TEAM_DELETE } from '@settings/preferences/services/graphql/sales';

interface DeleteProps {
  onCancel?: () => void;
  onReload?: () => void;
}

export default function useSalesTeamDelete() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  let listQueryKey = [queryKeys.salesTeamsList, 'list'];

  const mPostResult = useMutationPost(SETTING_SALES_TEAM_DELETE, queryKeys.salesTeamDelete, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      //enqueueSuccessBar('Deleted sales team successfully!');
      //onCancel && onCancel();
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;

      // cancel all queries that contain the query key
      await queryClient.cancelQueries([queryKeys.salesTeamsList]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: any }>(listQueryKey);
      if (!currentPage) {
        //remove query list to refetch
        //queryClient.removeQueries([queryKeys.listQuote, 'list']);
        return;
      }

      //remove deleted items
      let newItems = currentPage.data.filter((_item: any) => !variables.ids.includes(_item.id));

      //update current page
      queryClient.setQueryData(listQueryKey, {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during deleting, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(listQueryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        queryClient.invalidateQueries(listQueryKey);
      }
    }
  });

  return mPostResult;
}
