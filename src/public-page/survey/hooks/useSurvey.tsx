import usePublicPost from '@base/hooks/publics/usePublicPost';
import { queryKeys } from '@settings/digital/survey/config/queryKeys';
import { SITE_SURVEY_GET } from '../services/graphql';
export const useSurvey = (token: string, id: string) => {
  const queryKey: string[] = [queryKeys.surveyPublic, id, 'public'];
  const response: any = usePublicPost(
    queryKey,
    SITE_SURVEY_GET,
    { id: id, token }, //token:...
    { enabled: id?.length > 0 }
  );
  return response;
};
