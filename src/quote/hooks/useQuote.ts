import { usePost } from '@base/hooks/usePost';
import { getViewQuery } from '@base/utils/helpers/schema';
import { queryKeys } from '@quote/config/queryKeys';
import { QUOT_REVISION_QUICK_VIEW } from '@quote/services/graphql';

export const useQuote = (schemas: string, quoteId: string, options?: any) => {
  const queryKey: string[] = [queryKeys.viewQuote, quoteId, 'view'];

  const query: string = getViewQuery({ queryKey, schemas });
  const variables: any = {
    id: quoteId
  };
  const response = usePost<any>(queryKey, query, variables, {
    ...options
    // cacheTime: 0
  });
  return response;
};

export const useQuoteRevision = (schemas: string, revisionId: string, options?: any) => {
  const queryKey: string[] = [queryKeys.viewQuoteRevision, revisionId, 'view'];

  const query: string = getViewQuery({ queryKey, schemas });
  const variables: any = {
    id: revisionId
  };
  const response = usePost<any>(queryKey, query, variables, {
    ...options
    // cacheTime: 0
  });
  return response;
};

export function useQuoteRevisionQuickView(id: string, options?: any) {
  const queryKey: string[] = [queryKeys.viewQuoteRevision, id, 'quickview'];

  const variables: any = {
    id: id
  };
  const response = usePost<any>(queryKey, QUOT_REVISION_QUICK_VIEW, variables, {
    ...options
  });

  return response;
}
