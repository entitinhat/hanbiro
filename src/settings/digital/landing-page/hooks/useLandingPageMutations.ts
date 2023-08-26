import { usePost } from '@base/hooks/usePost';
import { getViewQuery } from '@base/utils/helpers/schema';


import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { landingPageQueryKeys } from '@settings/digital/landing-page/config/queryKeys'
import {
  LANDINGPAGE_UPDATE,
  LANDINGPAGE_DELETE,
  LANDINGPAGE_CREATE,
} from '@settings/digital/landing-page/services/graphql';


export const useLandingPageUpdate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(LANDINGPAGE_UPDATE, landingPageQueryKeys.landingPageUpdate, {
    onSuccess: (data: any, variables: any, context: any,) => {
      enqueueSuccessBar('Updated successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated landing page failed');
    }
  });

  return mPost;
};

export const useLandingPageDelete = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(LANDINGPAGE_DELETE, landingPageQueryKeys.landingPageDelete, {
    onSuccess: (data: any, variables: any, context: any,) => {
      enqueueSuccessBar('Delete successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Delete landing page failed');
    }
  });

  return mPost;
};


export const useLandingPageCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(LANDINGPAGE_CREATE, landingPageQueryKeys.landingPageCreate, {
    onSuccess: (data: any, variables: any, context: any,) => {
      enqueueSuccessBar('Create new page successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Create new page failed');
    }
  });

  return mPost;
};