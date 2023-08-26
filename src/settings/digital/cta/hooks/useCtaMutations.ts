import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@settings/digital/cta/config/queryKeys';
import { SETTING_CTA_CREATE, SETTING_CTA_DELETE, SETTING_CTA_UPDATE } from '../services/graphql';

// export const useSurveyAnswerCreate = () => {
//   const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
//   //create mutation
//   const mPost: any = useMutationPost<BaseMutationResponse>(SURVEY_RESPONSE_CREATE, queryKeys.surveyAnswerCreate, {
//     onSuccess: (data: any, variables: any, context: any) => {
//       enqueueSuccessBar('Updated answers successfully!');
//     },
//     onError: (error: any, variables: any, context: any) => {
//       enqueueErrorBar('Updated answers failed');
//     }
//   });

//   return mPost;
// };

// export const useSiteSurveyAnswerCreate = () => {
//   const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
//   //create mutation
//   const mPost: any = useMutationPost<BaseMutationResponse>(SITE_SURVEY_ANSWER_CREATE, queryKeys.siteSurveyAnswerCreate, {
//     onSuccess: (data: any, variables: any, context: any) => {
//       enqueueSuccessBar('Updated answers successfully!');
//     },
//     onError: (error: any, variables: any, context: any) => {
//       enqueueErrorBar('Updated answers failed');
//     }
//   });

//   return mPost;
// };

export const useCtaMutations = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mCreate: any = useMutationPost<BaseMutationResponse>(SETTING_CTA_CREATE, queryKeys.ctaCreate, {
    onSuccess: (data: any) => {
      enqueueSuccessBar('Created CTA successfully!');
    },
    onError: (error: any) => {
      enqueueErrorBar('Created CTA failed');
    }
  });

  //update mutation
  const mUpdate: any = useMutationPost<BaseMutationResponse>(SETTING_CTA_UPDATE, queryKeys.ctaUpdate, {
    onSuccess: (data: any) => {
      enqueueSuccessBar('Updated CTA successfully!');
    },
    onError: (error: any) => {
      enqueueErrorBar('Updated CTA failed');
    }
  });

  //delete mutation
  const mDelete: any = useMutationPost<BaseMutationResponse>(SETTING_CTA_DELETE, queryKeys.ctaDelete, {
    onSuccess: (data: any) => {
      enqueueSuccessBar('Deleted CTA successfully!');
    },
    onError: (error: any) => {
      enqueueErrorBar('Deleted CTA failed');
    }
  });

  return { mCreate, mUpdate, mDelete };
};
