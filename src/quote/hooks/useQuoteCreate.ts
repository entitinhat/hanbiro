import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { MENU_QUOTE, MENU_SALES } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { keyStringify } from '@base/utils/helpers';

//opportunity
import { queryKeys as oppQueryKeys } from '@opportunity/config/queryKeys';

//menu
import { QUOTE_CREATEQUOTE } from '@quote/services/graphql';
import { queryKeys } from '@quote/config/queryKeys';
import { Quote } from '@quote/types/interfaces';
import { getFilterParam } from './useQuotes';

interface CreateProps {
  opportunityId?: string;
}

export default function useQuoteCreate({ opportunityId }: CreateProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = `${MENU_SALES}_${MENU_QUOTE}`;
  const { paging, settingColumns } = useListPageSettings(pageDataKey);

  //build query key + params
  const filtersQuery = getFilterParam(paging.page); //filter query
  const viewingFields = settingColumns?.filter((_ele: any) => _ele.isViewing);
  const fieldQueryKeys = viewingFields?.map((_ele: any) => _ele.keyName).join(','); //fields query
  const queryKey = [queryKeys.listQuote, keyStringify(filtersQuery, ''), fieldQueryKeys];
  //console.log('queryKey', queryKey);

  const mPostResult = useMutationPost(QUOTE_CREATEQUOTE, queryKeys.createQuote, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created quote successfully!');
      //console.log('onSuccess data', data);
      //console.log('onSuccess variables', variables);

      // cancel all queries that contain the key
      await queryClient.cancelQueries([queryKeys.listQuote]); //pending get

      const currentPage = queryClient.getQueryData<{ data: Quote[] }>(queryKey);
      //console.log('onMutate currentPage', currentPage);
      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [queryKeys.listQuote, keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      const nextPage = queryClient.getQueryData<{ data: Quote[] }>(nextQueryKey);
      //console.log('onMutate nextPage', nextPage);
      if (!currentPage) {
        return;
      }
      //create new object
      const newCampaign: Quote = {
        id: data.id,
        ...variables.campaign
      };
      let newItems = [...currentPage.data];
      //add new item to first
      newItems.unshift(newCampaign);
      //remove last item
      const [lastItem] = newItems.splice(newItems.length - 1, 1);
      //insert last item to second page list
      const newNextItems = nextPage?.data ? [...nextPage.data] : [];
      newNextItems.unshift(lastItem);
      //console.log('onSuccess newItems', newItems);

      //adjust current page
      queryClient.setQueryData(queryKey, {
        ...currentPage,
        data: newItems
      });

      //adjust next page
      queryClient.setQueryData(nextQueryKey, {
        ...nextPage,
        data: newNextItems
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
        queryClient.setQueryData(queryKey, context.currentItemsPage);
      }
    },
    onSettled: () => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        //waiting some seconds for server processing
        //if having opportunityId, it is quote revision, else normal quote
        if (opportunityId) {
          setTimeout(() => {
            queryClient.invalidateQueries([oppQueryKeys.opportunityProposalQuoteList, 'list', opportunityId]);
          }, 1000);
        } else {
          setTimeout(() => {
            queryClient.invalidateQueries([queryKeys.listQuote]);
          }, 3000);
        }
      }
    }
  });

  return mPostResult;
}
