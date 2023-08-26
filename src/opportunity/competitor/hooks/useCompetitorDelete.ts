import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project base
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { MENU_OPPORTUNITY_COMPETITOR } from '@base/config/menus';
import { keyStringify } from '@base/utils/helpers';
import { BaseMutationResponse } from '@base/types/response';

//menu
import { queryKeys } from '@competitor/config/queryKeys';
import { COMPETITOR_DELETE, COMPETITOR_DELETE_RECOVERY, COMPETITOR_EMPTY, COMPETITOR_RESTORE } from '@competitor/services/graphql';
import { Competitor } from '@competitor/types/interfaces';
import { getFilterParam } from '@competitor/hooks/useCompetitors';

interface DeleteProps {
  onCancel?: () => void;
  onReload?: () => void;
}

export default function useCompetitorDelete({ onCancel, onReload }: DeleteProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = MENU_OPPORTUNITY_COMPETITOR;
  const { paging, settingColumns } = useListPageSettings(pageDataKey);

  //query fields key
  const filtersQuery = getFilterParam(paging.page); //filter query
  const viewingFields = settingColumns?.filter((_ele: any) => _ele.isViewing);
  const fieldQueryKeys = viewingFields?.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [queryKeys.competitorList, 'list', keyStringify(filtersQuery, ''), fieldQueryKeys];
  //console.log('onMutate queryKey', queryKey);

  const mPostResult = useMutationPost(COMPETITOR_DELETE, queryKeys.competitorList, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted competitor(s) successfully!');
      onCancel && onCancel();
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;

      // cancel all queries that contain the query key
      await queryClient.cancelQueries([queryKeys.competitorList]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: Competitor[] }>(queryKey);
      //console.log('onMutate currentPage', currentPage);
      //console.log('variables', variables);

      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [queryKeys.competitorList, 'list', keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      const nextPage = queryClient.getQueryData<{ data: Competitor[] }>(nextQueryKey);
      //console.log('onMutate nextPage', nextPage);
      if (!currentPage) {
        //remove query list to refetch
        queryClient.removeQueries([queryKeys.competitorList, 'list']);
        return;
      }

      //remove deleted items
      let newItems = currentPage.data.filter((_item: Competitor) => !variables.ids.includes(_item.id));

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

//restore delete
export function useCompetitorRestore({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(COMPETITOR_RESTORE, queryKeys.competitorRestore, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Restore competitor failed');
    }
  });

  return mPostResult;
}

//empty delete
export function useCompetitorEmpty({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(COMPETITOR_EMPTY, queryKeys.competitorEmpty, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Empty competitors failed');
    }
  });

  return mPostResult;
}

//delete recovery
export function useCompetitorDeleteRecovery({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(COMPETITOR_DELETE_RECOVERY, queryKeys.competitorDeleteRecovery, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Delete recovery competitors failed');
    }
  });

  return mPostResult;
}
