//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import usePosts from '@base/hooks/usePosts';

//menu
import { queryKeys } from '@opportunity/config/queryKeys';
import { OPPORTUNITY_LISTS_COMPETITOR_GET } from '@opportunity/services/graphql';
//import { isDeleteList } from '@quote/pages/ListPage/Helper';

export function useCompetitorOpportunities(competitorId: string, params: any) {
  const queryKey = [queryKeys.opportunityList, competitorId];

  const postResult: any = usePosts<any>(queryKey, OPPORTUNITY_LISTS_COMPETITOR_GET, params, {
    keepPreviousData: true,
    enabled: competitorId?.length > 0
  });

  return postResult;
}
