import { usePost } from '@base/hooks/usePost';
import { getViewQuery } from '@base/utils/helpers/schema';
import { landingPageQueryKeys } from '@settings/digital/landing-page/config/queryKeys';
import { LANDING_PAGE_SITE_GET } from '../services/graphql';

export const useLandingPage = (schemas: string, id: string, options?: any) => {
  const queryKey: string[] = [landingPageQueryKeys.landingPageGet, id, 'view'];
  // TODO issue remove schemas usePost don't work

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

export const useLandingPageSite = (id: string) => {
  const queryKey: string[] = ['setting_landingPageSite', id, 'public'];
  const response: any = usePost<any>(queryKey, LANDING_PAGE_SITE_GET, { id: id }, { enabled: id?.length > 0 });
  return response;
};
