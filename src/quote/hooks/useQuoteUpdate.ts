import { useRef } from 'react';

//third-party
import { useQueryClient } from '@tanstack/react-query';

//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';

//menu
import {
  QUOTE_BULKUPDATEQUOTE,
  QUOTE_CANCELQUOTE,
  QUOTE_RECOVERY_DELETE,
  QUOTE_RECOVERY_EMPTY,
  QUOTE_RESTOREQUOTE,
  QUOTE_UPDATEQUOTE,
  QUOTE_UPDATE_REVISION
} from '@quote/services/graphql';
import { queryKeys } from '@quote/config/queryKeys';
import { queryKeys as oppQueryKeys } from '@opportunity/config/queryKeys';

interface UpdateProps {
  onReload?: () => void;
}

export default function useQuoteUpdate({ onReload }: UpdateProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);

  const mPostResult = useMutationPost(QUOTE_UPDATEQUOTE, queryKeys.updateQuote, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any) => {
      enqueueSuccessBar('Quote updated successfully!');
      //refresh function
      setTimeout(() => {
        onReload && onReload();
      }, 1000);

      //refresh view
      const id = variables.quote.id;
      const queryKey: string[] = [queryKeys.viewQuote, id, 'view'];

      // cancel all queries that contain the key list
      await queryClient.cancelQueries(queryKey); //pending get

      const currentView = queryClient.getQueryData<{ data: any }>(queryKey);
      //console.log('currentView', currentView);
      if (!currentView) {
        return;
      }

      //create object
      const newView = { ...currentView, ...variables.quote };
      //adjust current data
      queryClient.setQueryData(queryKey, newView);

      //remove query list to refetch
      queryClient.removeQueries([queryKeys.listQuote, 'list']);

      //return { currentView };
    },
    onMutate: async (variables: any) => {
      ongoingMutationCount.current += 1;
      //console.log('variables', variables);
    },
    onError: (error: any, variables: any, context: any) => {
      //console.log('updated failed', error);
      enqueueErrorBar('There is an error during updating, try again.');
    },
    onSettled: (data: any, error: any, variables: any) => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      ongoingMutationCount.current -= 1;
      if (ongoingMutationCount.current === 0) {
        //waiting some seconds for server processing
        setTimeout(() => {
          const id = variables.quote.id;
          queryClient.invalidateQueries([queryKeys.viewQuote, id, 'view']);
        }, 1000);
      }
    }
  });

  return mPostResult;
}

export function useQuoteRevisionUpdate({ onReload }: UpdateProps) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();

  const mPostResult = useMutationPost(QUOTE_UPDATE_REVISION, queryKeys.updateQuoteRevision, {
    useErrorBoundary: false,
    onSuccess: async (data: any, variables: any) => {
      enqueueSuccessBar('Quote revision updated successfully!');

      //refresh function
      setTimeout(() => {
        onReload && onReload();
      }, 1000);

      //refresh view
      const id = variables.revision.id;
      const queryKey: string[] = [queryKeys.viewQuoteRevision, id, 'view'];

      // cancel all queries that contain the key list
      await queryClient.cancelQueries(queryKey); //pending get

      const currentView = queryClient.getQueryData<{ data: any }>(queryKey);
      //console.log('currentView', currentView);
      if (!currentView) {
        return;
      }

      //create object
      const newView = { ...currentView, ...variables.revision };
      //adjust current data
      queryClient.setQueryData(queryKey, newView);

      //remove query list to refetch
      //queryClient.removeQueries([oppQueryKeys.opportunityProposalQuoteList, 'list']);
    },
    onMutate: async (variables: any) => {},
    onError: (error: any, variables: any, context: any) => {
      //console.log('updated failed', error);
      enqueueErrorBar('There is an error during updating, try again.');
    },
    onSettled: (data: any, error: any, variables: any) => {
      //At around the same time, the response to the first GET request arrives preventing it from being canceled.
      //waiting some seconds for server processing
    }
  });

  return mPostResult;
}

//cancel some quotes
export function useQuoteCancel({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(QUOTE_CANCELQUOTE, queryKeys.cancelQuote, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      enqueueSuccessBar('Marked as cancelled quote successfully!');
    },
    onError: (error: any) => {
      //console.log('Created quote failed', error);
      enqueueErrorBar('Mark as cancelled quote failed');
    }
  });

  return mPostResult;
}

//bulk update
export function useQuoteBulkUpdate({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(QUOTE_BULKUPDATEQUOTE, queryKeys.bulkUpdateQuote, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      //console.log('Created quote failed', error);
      enqueueErrorBar('Updated quote failed');
    }
  });

  return mPostResult;
}

//bulk update
export function useQuoteRestore({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(QUOTE_RESTOREQUOTE, queryKeys.restoreQuote, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Restore quote failed');
    }
  });

  return mPostResult;
}

export function useQuoteEmptyRecovery({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(QUOTE_RECOVERY_EMPTY, queryKeys.emptyRecoveryQuote, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Empty recovery quote failed');
    }
  });

  return mPostResult;
}

export function useQuoteDeleteRecovery({ onCancel, onReload }: any) {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(QUOTE_RECOVERY_DELETE, queryKeys.deleteRecoveryQuote, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Updated quote successfully!');
      onCancel && onCancel();
      onReload && onReload();
    },
    onError: (error: any) => {
      enqueueErrorBar('Delete recovery quote failed');
    }
  });

  return mPostResult;
}
