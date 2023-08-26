import { useEffect } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { MENU_OPPORTUNITY_OPPORTUNITY } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { graphQLGetsApi } from '@base/utils/axios/graphql';
import { buildListSchema, getListQuery, keyStringify, RESTORE_SCHEMA } from '@base/utils/helpers/schema';

//menu
import { queryKeys } from '@opportunity/config/queryKeys';
import { default as configFields } from '@opportunity/config/view-field';
import { Opportunity } from '@opportunity/types/interfaces';
import * as keyNames from '@opportunity/config/keyNames';
import {
  OPPORTUNITY_QUOTE_REVISION_CREATE,
  OPPORTUNITY_QUOTE_REVISION_DELETE,
  OPPORTUNITY_QUOTE_REVISIONS_LIST_GET
} from '@opportunity/services/graphql';
import useSnackBar from '@base/hooks/useSnackBar';
import useMutationPost from '@base/hooks/useMutationPost';
import { BaseMutationResponse } from '@base/types/response';

//get quotes of a opportunity
export function useOpportunityQuoteRevisions(opportunityId: string) {
  const queryKey = [queryKeys.opportunityProposalQuoteList, 'list', opportunityId];
  const params = {
    filter: {
      query: `opportunity=${opportunityId}`,
      sort: { field: 'createdAt', orderBy: 1 },
      paging: { page: 1, size: 20 }
    }
  };

  const postResult = usePosts<any[]>(queryKey, OPPORTUNITY_QUOTE_REVISIONS_LIST_GET, params, {
    keepPreviousData: true
  });

  return postResult;
}

export function useQuoteRevisionCreate(opportunityId: string) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();

  //build query key + params
  const listQueryKey = [queryKeys.opportunityProposalQuoteList, 'list', opportunityId];
  //console.log('queryKey', queryKey);

  const mPostResult = useMutationPost(OPPORTUNITY_QUOTE_REVISION_CREATE, queryKeys.opportunityProposalQuoteCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created quote revision successfully!');
    },
    onMutate: async (variables: any) => {},
    onError: (error: any, variables: any, context: any) => {
      //console.log('Deleted customer context', context);
      enqueueErrorBar('There is an error during creating, try again.');
    },
    onSettled: () => {
      setTimeout(() => {
        queryClient.invalidateQueries(listQueryKey);
      }, 1000);
    }
  });

  return mPostResult;
}

export function useQuoteRevisionDelete(opportunityId: string) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const listQueryKey = [queryKeys.opportunityProposalQuoteList, 'list', opportunityId];

  const mPostResult = useMutationPost(OPPORTUNITY_QUOTE_REVISION_DELETE, queryKeys.opportunityProposalQuoteDelete, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Deleted the competitor of current opportunity successfully!');
    },
    onMutate: async (variables: any) => {
      const currentPage = queryClient.getQueryData<{ data: any }>(listQueryKey);
      if (!currentPage) {
        return;
      }
      //remove deleted items
      let newItems = currentPage.data.filter((_item: any) => !variables.quoteProposalIds.includes(_item.id));

      //update current page
      queryClient.setQueryData(listQueryKey, {
        ...currentPage,
        data: newItems
      });

      return { currentItemsPage: currentPage };
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Delete the quote revision of current opportunity failed');
      if (context?.currentItemsPage) {
        queryClient.setQueryData(listQueryKey, context.currentItemsPage);
      }
    }
  });

  return mPostResult;
}
