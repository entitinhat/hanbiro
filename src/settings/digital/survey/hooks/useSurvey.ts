import { usePost } from '@base/hooks/usePost';
import { getViewQuery } from '@base/utils/helpers/schema';
import { queryKeys } from '../config/queryKeys';

export const useSurvey = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.surveyGet, id, 'view'];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas });
  const variables: any = {
    id: id
  };
  const response = usePost<any>(queryKey, query, variables, {
    enabled: schemas.length > 0,
    ...options
    // cacheTime: 0
  });
  return response;
};
