import { usePost } from '@base/hooks/usePost';
import { queryKeys } from '@opportunity/config/queryKeys';
import { OPPORTUNITY_PRODUCT_DEVELOP_ANALYSES_LIST_GET } from '@opportunity/services/graphql';
// import { Customer } from '@marketing-list/types/interface';

export const useOpportunityAnalysisDevelops = (menuSourceId: string, options?: any) => {
  const queryKey: string[] = [queryKeys.opportunityPerceptionAnalysisList, menuSourceId, 'view'];
  // TODO issue remove schemas usePost don't work
  const params: any = {
    filter: {
      filters: {},
      keyWord: '',
      query: `opportunity=${menuSourceId}`,
      sort: { field: 'createdAt', orderBy: 2 },
      paging: { page: 1, size: 20 }
    }
  };
  const response = usePost<any>(queryKey, OPPORTUNITY_PRODUCT_DEVELOP_ANALYSES_LIST_GET, params, {
    ...options
    // cacheTime: 0
  });
  return response;
};
