import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { SITE_SURVEY_ANSWER_CREATE } from '@public-page/site/services/graphql';
import { queryKeys } from '@settings/digital/ticket-form/config/queryKeys';
import {
  TICKET_FORM_CREATE,
  TICKET_FORM_DELETE,
  TICKET_FORM_RESPONSE_CREATE,
  TICKET_FORM_UPDATE
} from '@settings/digital/ticket-form/services/graphql';

export const useTicketFormAnswerCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(TICKET_FORM_RESPONSE_CREATE, queryKeys.ticketFormAnswerCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated answers successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated answers failed');
    }
  });

  return mPost;
};

export const useSiteSurveyAnswerCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(SITE_SURVEY_ANSWER_CREATE, queryKeys.siteticketFormAnswerCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated answers successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated answers failed');
    }
  });

  return mPost;
};

export const useTicketFormCreate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(TICKET_FORM_CREATE, queryKeys.ticketFormCreate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Created Ticket Form successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Created Ticket Form failed' + +JSON.parse(error).message);
    }
  });

  return mPost;
};

export const useTicketFormUpdate = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(TICKET_FORM_UPDATE, queryKeys.ticketFormUpdate, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Updated ticket form successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Updated ticket form failed');
    }
  });

  return mPost;
};

export const useTicketFormDelete = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  //create mutation
  const mPost: any = useMutationPost<BaseMutationResponse>(TICKET_FORM_DELETE, queryKeys.ticketFormDelete, {
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Deleted survey successfully!');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Deleted survey failed');
    }
  });

  return mPost;
};
