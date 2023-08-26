import { usePost } from '@base/hooks/usePost';
import { getViewQuery } from '@base/utils/helpers/schema';
import { queryKeys } from '../config/queryKeys';

export const useSatisfactionSurvey = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.satisfactionSurveyGet, id, 'view'];

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
};
