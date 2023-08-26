import { usePost } from '@base/hooks/usePost';
import useSnackBar from '@base/hooks/useSnackBar';
import { getViewQuery, keyStringify, RESTORE_SCHEMA } from '@base/utils/helpers/schema';
import { queryKeys } from '@campaign/config/queryKeys';
import { Campaign } from '@campaign/types/interface';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { MENU_CAMPAIGN } from '@base/config/menus';
import { getFilterParam } from './useCampaigns';
import useMutationPost from '@base/hooks/useMutationPost';
import { CAMPAIGN_DELETE } from '@campaign/services/graphql';

export const useCampaignView = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.campaignGet, id, 'view'];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas: [schemas, RESTORE_SCHEMA].join('\n') });
  const variables: any = {
    id: id
  };
  const response = usePost<Campaign>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
    // cacheTime: 0
  });
  return response;
};

interface DeleteProps {
  category: string;
  onCancel?: () => void;
  onReload?: () => void;
}

export default function useCampaignDelete({ category, onCancel, onReload }: DeleteProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = `${MENU_CAMPAIGN}_${category}`;
  const { paging, settingColumns } = useListPageSettings(pageDataKey);

  //query fields key
  const filtersQuery = getFilterParam(category, paging.page); //filter query
  const viewingFields = settingColumns?.filter((_ele: any) => _ele.isViewing);
  const fieldQueryKeys = viewingFields?.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [queryKeys.campaignListGet, 'list', keyStringify(filtersQuery, ''), fieldQueryKeys];
  //console.log('onMutate queryKey', queryKey);

  const mPostResult = useMutationPost(CAMPAIGN_DELETE, queryKeys.campaignDelete, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted campaign(s) successfully!');
      onCancel && onCancel();
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;

      // cancel all queries that contain the query key
      await queryClient.cancelQueries([queryKeys.campaignListGet]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: Campaign[] }>(queryKey);
      //console.log('onMutate currentPage', currentPage);
      //console.log('variables', variables);

      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [queryKeys.campaignListGet, 'list', keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      const nextPage = queryClient.getQueryData<{ data: Campaign[] }>(nextQueryKey);
      //console.log('onMutate nextPage', nextPage);
      if (!currentPage) {
        //remove query list to refetch
        queryClient.removeQueries([queryKeys.campaignListGet, 'list']);
        return;
      }

      //remove deleted items
      let newItems = currentPage.data.filter((_item: Campaign) => !variables.ids.includes(_item.id));

      //add new items from next page
      if (nextPage?.data?.length) {
        //get number of items = number of deleted items
        const nextItems = nextPage.data.slice(0, variables.ids.length);
        if (nextItems) {
          newItems = newItems.concat(nextItems);
        }
      }
      //console.log('onMutate nextPage 2', newItems);

      //update current page
      queryClient.setQueryData(queryKey, {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during deleting, try again.');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(queryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      // ongoingMutationCount.current -= 1;
      // if (ongoingMutationCount.current === 0) {
      //   queryClient.invalidateQueries([queryKeys.campaignListGet]); //--> this is not effected (working) if in query using option enabled
      // }
    }
  });

  return mPostResult;
}
