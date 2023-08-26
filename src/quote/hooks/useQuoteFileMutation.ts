import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { includes } from 'lodash';

import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { AssignToName } from '@base/types/user';
import { IdName } from '@base/types/common';
import { BaseMutationResponse } from '@base/types/response';

import { queryKeys } from '@quote/config/queryKeys';
import { QUOTE_CREATE_FILE, QUOTE_DELETE_FILE } from '../services/graphql';

export const useQuoteFileMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const queryClient = useQueryClient();
  const ongoingMutationCount = useRef(0);

  //create mutation
  const mCreate: any = useMutationPost<BaseMutationResponse>(QUOTE_CREATE_FILE, queryKeys.quoteCreateFile, {
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Add files successfilly!');
    },

    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Add files failded!');
    }
  });

  const mDelete: any = useMutationPost<BaseMutationResponse>(QUOTE_DELETE_FILE, queryKeys.quoteDeleteFile, {
    onSuccess: async (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Delete files successfilly!');
    },

    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Delete files failded!');
    }
  });

  return { mCreate, mDelete };
};
