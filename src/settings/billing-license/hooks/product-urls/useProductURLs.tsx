import usePost from '@base/hooks/usePost';
import { FilterInput } from '@base/types/common';
import { BaseResponse } from '@base/types/response';

import { queryKeys } from '@settings/billing-license/config/product-urls/queryKeys';
import { ProductURLs } from '@settings/billing-license/types/product-urls';
import { GET_PRODUCT_URLS } from '@settings/billing-license/services/graphql/ProductURLs';

export const useProductURLs = (keyword: string) => {
  let filter: FilterInput = {
    query: 'name:' + keyword
  };
  let queryKey = [queryKeys.productURLs, keyword];
  let params = {
    filter
  };
  const response = usePost<BaseResponse<ProductURLs[]>>(queryKey, GET_PRODUCT_URLS, params, {
    initialData: settingTicketCategories() // init fake data
  });
  return response;
};
function settingTicketCategories() {
  return [
    {
      productURLs: {
        tableHeader: [
          { id: 1, name: 'Site and products' },
          { id: 2, name: 'Plan' },
          { id: 3, name: 'URL' }
        ],
        tableBody: [
          { id: 1, name: 'tskwon', plan: '', url: 'tskwon.atlassian.net' },
          { id: 2, name: 'Confluence', plan: 'Free', url: 'tskwon.atlassian.net/wiki' },
          { id: 3, name: 'Jira Software', plan: 'Free', url: 'tskwon.atlassian.net/jira' }
        ]
      }
    }
  ];
}
