//project
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';

//menu
import { QUOTE_CREATE_ITEM, QUOTE_DELETE_ITEM, QUOTE_UPDATEQUOTE, QUOTE_UPDATE_ITEM } from '@quote/services/graphql';
import { queryKeys } from '@quote/config/queryKeys';

export function useQuoteCreateItem() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(QUOTE_CREATE_ITEM, queryKeys.quoteCreateItem, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Created quote successfully!');
    },
    onError: (error: any) => {
      //console.log('Created customer failed', error);
      //enqueueErrorBar('Created quote failed');
    }
  });

  return mPostResult;
}

export function useQuoteUpdateItem() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(QUOTE_UPDATE_ITEM, queryKeys.quoteUpdateItem, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Created quote successfully!');
    },
    onError: (error: any) => {
      //console.log('Created customer failed', error);
      //enqueueErrorBar('Created quote failed');
    }
  });

  return mPostResult;
}

export function useQuoteDeleteItem() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(QUOTE_DELETE_ITEM, queryKeys.quoteDeleteItem, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Created quote successfully!');
    },
    onError: (error: any) => {
      //console.log('Created customer failed', error);
      //enqueueErrorBar('Created quote failed');
    }
  });

  return mPostResult;
}

export function useQuoteProductSummaryUpdate() {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mPostResult = useMutationPost(QUOTE_UPDATEQUOTE, queryKeys.updateQuote, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //enqueueSuccessBar('Created quote successfully!');
    },
    onError: (error: any) => {
      //console.log('Created customer failed', error);
      //enqueueErrorBar('Created quote failed');
    }
  });

  return mPostResult;
}
