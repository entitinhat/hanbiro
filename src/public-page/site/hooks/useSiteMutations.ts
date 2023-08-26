import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { queryKeys } from '@public-page/site/config/queryKeys';
import {
  SITE_TICKET_COMMENT_CREATE,
  SITE_TICKET_CREATE,
  SITE_TICKET_CLOSE,
  SITE_TICKET_CANCEL
} from '@public-page/site/services/graphql';

export const useSiteTicketCommentCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mCreate: any = useMutationPost<BaseMutationResponse>(SITE_TICKET_COMMENT_CREATE, queryKeys.siteTicketCommentCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created ticket comment successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Created ticket comment failed');
    }
  });

  return mCreate;
};

export const useSiteTicketCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SITE_TICKET_CREATE, queryKeys.siteTicketCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created ticket successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Created ticket failed');
    }
  });

  return mPost;
};

export const useSiteTicketClose = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SITE_TICKET_CLOSE, queryKeys.siteTicketClose, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Closed ticket successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Closed ticket failed');
    }
  });

  return mPost;
};

export const useSiteTicketCancel = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SITE_TICKET_CANCEL, queryKeys.siteTicketCancel, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Cancelled ticket successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Cancelled ticket failed');
    }
  });

  return mPost;
};
