import usePublicPost from '@base/hooks/publics/usePublicPost';
import usePublicPosts from '@base/hooks/publics/usePublicPosts';
import usePost from '@base/hooks/usePost';
import { queryKeys } from '@public-page/site/config/queryKeys';
import { SITE_DESK_SURVEYS_GET, SITE_SURVEY_GET } from '@public-page/site/services/graphql';

export const useSiteDeskSurveys = (token: string) => {
  let queryKey = [queryKeys.siteDeskSiteSurveysGet, token];
  const response = usePublicPosts<any[]>(
    queryKey,
    SITE_DESK_SURVEYS_GET,
    { token },
    {
      enabled: token !== ''
    }
  );
  return response;
};

export const useSiteDeskSurvey = (token: string, surveyId: string) => {
  const response = usePublicPost(
    [queryKeys.siteSurveyGet, surveyId, token],
    SITE_SURVEY_GET,
    { id: surveyId, token },
    { enabled: surveyId.length > 0 }
  );
  return response;
};
