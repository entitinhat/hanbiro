import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import useSnackBar from '@base/hooks/useSnackBar';
import { keyStringify } from '@base/utils/helpers';
import { MENU_CUSTOMER } from '@base/config/menus';

//menu
import { customerQueryKeys } from '@customer/config/queryKeys';
import { CUSTOMER_DELETE } from '@customer/services/graphql';
import { Customer } from '@customer/types/interface';
import { getFilterParam } from '@customer/hooks/useCustomers';

interface DeleteProps {
  category: string;
  onCancel?: () => void;
  onReload?: () => void;
}

export default function useCustomerDelete({ category, onCancel, onReload }: DeleteProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { paging, settingColumns } = useListPageSettings(pageDataKey);

  //query fields key
  const filtersQuery = getFilterParam(category, paging.page); //filter query
  const viewingFields = settingColumns?.filter((_ele: any) => _ele.isViewing);
  const fieldQueryKeys = viewingFields?.map((_ele: any) => _ele.keyName).join(',');
  const queryKey = [customerQueryKeys.customersGet, 'list', keyStringify(filtersQuery, ''), fieldQueryKeys];

  const mPostResult = useMutationPost(CUSTOMER_DELETE, customerQueryKeys.customerDelete, {
    useErrorBoundary: false,
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted customer(s) successfully!');
      onCancel && onCancel();
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
      //variables.ids: string[] --> deleted ids

      // cancel all queries that contain the key customerQueryKeys.customersGet
      await queryClient.cancelQueries([customerQueryKeys.customersGet]); //duplicated get

      const currentPage = queryClient.getQueryData<{ data: Customer[] }>(queryKey);
      //console.log('onMutate currentPage', currentPage);
      const nextFilterQuery = {
        ...filtersQuery,
        paging: {
          ...paging,
          page: paging.page + 1
        }
      };
      const nextQueryKey = [customerQueryKeys.customersGet, 'list', keyStringify(nextFilterQuery, ''), fieldQueryKeys];
      const nextPage = queryClient.getQueryData<{ data: Customer[] }>(nextQueryKey);
      //console.log('onMutate nextPage', nextPage);
      if (!currentPage) {
        return;
      }

      //remove deleted items
      let newItems = currentPage.data.filter((_item: Customer) => !variables.ids.includes(_item.id));

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
    }
  });

  return mPostResult;
}
