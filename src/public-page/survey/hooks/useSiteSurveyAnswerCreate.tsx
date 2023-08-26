import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { SITE_SURVEY_ANSWER_CREATE } from '@public-page/site/services/graphql';

import { queryKeys } from '@settings/digital/survey/config/queryKeys';
export const useSiteSurveyAnswerCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SITE_SURVEY_ANSWER_CREATE, queryKeys.siteDigitalSurveyAnswerCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated answers successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated answers failed');
    }
  });

  return mPost;
};
