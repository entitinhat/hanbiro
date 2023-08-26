import usePublicPost from '@base/hooks/publics/usePublicPost';
import { SITE_LANDING_PAGE_GET } from '@public-page/landingpage/services/graphql';
import { queryKeys } from '@public-page/landingpage/configs/queryKeys';

export const useLandingPage = (token: string, id: string) => {
  const queryKey: string[] = [queryKeys.landingPagePublic, id, 'public'];
  const response: any = usePublicPost(
    queryKey,
    SITE_LANDING_PAGE_GET,
    { id: id, token }, //token:...
    { enabled: id?.length > 0 }
  );
  return response;
};
