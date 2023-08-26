import _ from 'lodash';

import { queryKeys } from '@desk/knowledge-base/config/queryKeys';
import { CREATE_KNOWELEDGEBASE } from '@desk/knowledge-base/services/graphql';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import { KnowledgeBase } from '../types/knowledge';
import { ListType } from '@base/types/app';

export interface UseKnowledgeBaseWriteProps {
  onClose: () => void;
  onReload?: () => void;
  listType: ListType;
  isReset: boolean;
  reset?: () => void;
}

export default function useKnowledgeBaseWrite(props: UseKnowledgeBaseWriteProps) {
  const { onClose, onReload, isReset, reset } = props;
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const queryClient = useQueryClient();

  const { mutate: mutationAdd, isLoading } = useMutationPost(CREATE_KNOWELEDGEBASE, queryKeys.createKnowledgebase, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //optimistic
      const optimistic = variables.knowledgebase as KnowledgeBase;
      queryClient.setQueryData([queryKeys.listKnowledgebases], (old: any) => {
        const oResults = old?.results ?? [];
        return { results: [oResults, optimistic] };
      });
      if (isReset) {
        // for list, grid
        // onReload && onReload();
        reset && reset();
      } else {
        // refecth data
        reset && reset();
        // onReload && onReload();
        onClose && onClose();
      }

      enqueueSuccessBar('Create KnowledgeBase successfully!');
    },
    onError: (error: any) => {
      console.log('failed', error);
      enqueueErrorBar('Create KnowledgeBase failed');
    }
  });

  return { mutationAdd, isLoading };
}
