//project
import usePosts from '@base/hooks/usePosts';
import { MARKETING_LISTS_GET, MARKETING_LIST_MEMBERS_GET } from '@campaign/services/graphql';

export function useMarketingLists(keyword?: string) {
  const queryKey = ['marketing_marketingLists', 'autocomplete', keyword];
  const params = {
    filter: {
      //query: `name=${keyword}`,
      keyword,
      sort: { field: 'createdAt', orderBy: 2 },
      paging: { page: 1, size: 20 }
    }
  };

  const postResult = usePosts<any[]>(queryKey, MARKETING_LISTS_GET, params, {
    keepPreviousData: true
  });

  return postResult;
}

export function useMarketingListMembers(marketingListId: string, paging: any, opt?: any) {
  const queryKey = ['marketing_marketingListMembers', 'list', marketingListId, paging.page];
  const params = {
    filter: {
      query: `marketingListId=${marketingListId}`,
      sort: { field: 'createdAt', orderBy: 2 },
      paging: paging || { page: 1, size: 10 }
    }
  };

  const postResult = usePosts<any[]>(queryKey, MARKETING_LIST_MEMBERS_GET, params, {
    keepPreviousData: true,
    ...opt
  });

  return postResult;
}
