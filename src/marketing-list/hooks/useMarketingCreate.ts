import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { keyStringify } from '@base/utils/helpers';
import { MENU_CUSTOMER } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';

//menu
import { ADD_MARKETING_LIST } from '@marketing-list/services/graphql';
import { marketingQueryKeys } from '@marketing-list/config/queryKeys';
import { getFilterParam } from '@marketing-list/hooks/useMarketingLists';

export interface useMarketingCreateProps {
  category: string;
}

export default function useMarketingCreate({ category }: useMarketingCreateProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { paging, settingColumns } = useListPageSettings(pageDataKey);

  //build query key + params
  const filtersQuery = getFilterParam(category, paging.page); //filter query
  const viewingFields = settingColumns?.filter((_ele: any) => _ele.isViewing);
  const fieldQueryKeys = viewingFields?.map((_ele: any) => _ele.keyName).join(','); //fields query
  const queryKey = [marketingQueryKeys.marketingListGet, keyStringify(filtersQuery, ''), fieldQueryKeys];
  //console.log('queryKey', queryKey);

  const mPostResult = useMutationPost(ADD_MARKETING_LIST, marketingQueryKeys.marketingListsCreate, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created Marketing List successfully!');
      //console.log('onSuccess data', data);
      //console.log('onSuccess variables', variables);

      // cancel all queries that contain the key marketingQueryKeys.marketingListGet
      await queryClient.cancelQueries([marketingQueryKeys.marketingListsGet]); //pending get

      const currentPage = queryClient.getQueryData<{ data: any[] }>(queryKey);
      //console.log('onMutate currentPage', currentPage);
      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [marketingQueryKeys.marketingListsGet, keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      const nextPage = queryClient.getQueryData<{ data: any[] }>(nextQueryKey);
      //console.log('onMutate nextPage', nextPage);
      if (!currentPage) {
        return;
      }
      //create customer object
      const newCustomer: any = {
        id: data.id,
        ...variables.customer
      };
      let newItems = [...currentPage.data];
      //add new item to first
      newItems.unshift(newCustomer);
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
        setTimeout(() => {
          queryClient.invalidateQueries([marketingQueryKeys.marketingListsGet]);
        }, 1000);
      }
    }
  });

  return mPostResult;
}
