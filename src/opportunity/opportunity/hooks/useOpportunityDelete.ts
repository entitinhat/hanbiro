import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import useSnackBar from '@base/hooks/useSnackBar';
import { keyStringify } from '@base/utils/helpers';
import { MENU_OPPORTUNITY_OPPORTUNITY } from '@base/config/menus';

//menu
import { queryKeys } from '@opportunity/config/queryKeys';
import { queryKeys as competitorQueryKeys } from '@competitor/config/queryKeys';
import {
  OPPORTUNITY_DELETE,
  OPPORTUNITY_DELETE_COMPETITOR,
  OPPORTUNITY_DELETE_RECOVERY,
  OPPORTUNITY_EMPTY,
  OPPORTUNITY_RESTORE
} from '@opportunity/services/graphql';
import { Opportunity } from '@opportunity/types/interfaces';
import { getFilterParam } from '@opportunity/hooks/useOpportunities';
import { BaseMutationResponse } from '@base/types/response';
import { Competitor } from '@competitor/types/interfaces';

interface DeleteProps {
  onCancel?: () => void;
  onReload?: () => void;
}

export default function useOpportunityDelete({ onCancel, onReload }: DeleteProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = MENU_OPPORTUNITY_OPPORTUNITY;
  const { paging, settingColumns } = useListPageSettings(pageDataKey);

  //query fields key
  const filtersQuery = getFilterParam(paging.page); //filter query
  const viewingFields = settingColumns?.filter((_ele: any) => _ele.isViewing);
  const fieldQueryKeys = viewingFields?.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [queryKeys.opportunityList, 'list', keyStringify(filtersQuery, ''), fieldQueryKeys];

  const mPostResult = useMutationPost(OPPORTUNITY_DELETE, queryKeys.opportunityDelete, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted opportunity successfully!');
      onCancel && onCancel();
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
      //variables.ids: string[] --> deleted ids

      // cancel all queries that contain the key customerQueryKeys.customersGet
      await queryClient.cancelQueries([queryKeys.opportunityList]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: Opportunity[] }>(queryKey);
      //console.log('onMutate currentPage', currentPage);
      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [queryKeys.opportunityList, 'list', keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      const nextPage = queryClient.getQueryData<{ data: Opportunity[] }>(nextQueryKey);
      //console.log('onMutate nextPage', nextPage);
      if (!currentPage) {
        return;
      }

      //remove deleted items
      let newItems = currentPage.data.filter((_item: Opportunity) => !variables.ids.includes(_item.id));

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
      //   queryClient.invalidateQueries([customerQueryKeys.customersGet]);
      // }
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        //waiting some seconds for server processing
        setTimeout(() => {
          queryClient.invalidateQueries([queryKeys.opportunityList]);
        }, 1000);
      }
    }
  });

  return mPostResult;
}

//restore delete
export function useOpportunityRestore({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(OPPORTUNITY_RESTORE, queryKeys.opportunityRestore, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Restore opportunity failed');
    }
  });

  return mPostResult;
}

//empty delete
export function useOpportunityEmpty({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(OPPORTUNITY_EMPTY, queryKeys.opportunityEmpty, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Empty opportunities failed');
    }
  });

  return mPostResult;
}

//delete recovery
export function useOpportunityDeleteRecovery({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(OPPORTUNITY_DELETE_RECOVERY, queryKeys.opportunityDeleteRecovery, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Delete recovery opportunities failed');
    }
  });

  return mPostResult;
}

//delete competitor
export function useOpportunityDeleteCompetitor(opportunityId: string) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const queryKey = [competitorQueryKeys.competitorList, opportunityId];

  const mPostResult = useMutationPost(OPPORTUNITY_DELETE_COMPETITOR, queryKeys.opportunityDeleteCompetitor, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Deleted the competitor of current opportunity successfully!');
    },
    onMutate: async (variables: any) => {
      // const currentPage = queryClient.getQueryData<{ data: Competitor[] }>(queryKey);
      // if (!currentPage) {
      //   return;
      // }
      // //remove deleted items
      // let newItems = currentPage.data.filter((_item: Competitor) => !variables.competitorIds.includes(_item.id));
      // //update current page
      // queryClient.setQueryData(queryKey, {
      //   ...currentPage,
      //   data: newItems
      // });
      // return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Delete the competitor of current opportunity failed');
      // if (context?.currentItemsPage) {
      //   queryClient.setQueryData(queryKey, context.currentItemsPage);
      // }
    }
  });

  return mPostResult;
}
