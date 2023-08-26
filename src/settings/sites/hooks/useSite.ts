import { usePost } from '@base/hooks/usePost';

import { getViewQuery } from '@base/utils/helpers/schema';

export const useSite = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = ['setting_siteTemplate', id];
  // TODO issue remove schemas usePost don't work

  const query: string = getViewQuery({ queryKey, schemas });
  const variables: any = {
    id: id
  };
  const response = usePost<any>(queryKey, query, variables, {
    ...options,
    enabled: schemas.length > 0
  });
  return response;
};
