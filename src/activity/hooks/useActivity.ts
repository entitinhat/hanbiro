import { usePost } from '@base/hooks/usePost';
import { queryKeys } from '@activity/config/queryKeys';
import { Activity } from '@activity/types/activity';
import { getViewQuery } from '@base/utils/helpers/schema';

export const useActivity = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [queryKeys.viewActivity, id];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas });
  const variables: any = {
    id: id
  };
  const response = usePost<Activity>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
    // cacheTime: 0
  });
  return response;
};
