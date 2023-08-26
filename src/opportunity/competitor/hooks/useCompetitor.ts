import { usePost } from '@base/hooks/usePost';
import { getViewQuery } from '@base/utils/helpers/schema';
import { queryKeys } from '@competitor/config/queryKeys';
import { COMPETITOR_QUICK_VIEW } from '@competitor/services/graphql';

export default function useCompetitor(schemas: string, id: string, options?: any) {
  const queryKey: string[] = [queryKeys.competitorGet, id, 'view'];
  const query: string = getViewQuery({ queryKey, schemas });
  const variables: any = {
    id: id
  };
  const response = usePost<any>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
    // cacheTime: 0
  });
  return response;
}

export function useCompetitorQuickView(id: string, options?: any) {
  const queryKey: string[] = [queryKeys.competitorGet, id, 'quickview'];

  const variables: any = {
    id: id
  };
  const response = usePost<any>(queryKey, COMPETITOR_QUICK_VIEW, variables, {
    ...options
  });

  return response;
}
