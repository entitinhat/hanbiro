import _ from 'lodash';

import { queryKeys } from '@desk/ticket/config/queryKeys';
import { CREATE_TICKET } from '@desk/ticket/services/graphql';
import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { ListType } from '@base/types/app';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import { Ticket } from '../types/ticket';

export interface UseTicketWriteProps {
  onClose?: () => void;
  listType: ListType;
  onReload?: () => void;
  isReset: boolean;
  reset?: () => void;
}

export default function useTicketWrite(props: UseTicketWriteProps) {
  const { onClose, onReload, isReset, reset } = props;
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const queryClient = useQueryClient();

  const {
    mutate: mutationAdd,
    isLoading,
    isSuccess,
    data
  } = useMutationPost(CREATE_TICKET, queryKeys.createTicket, {
    useErrorBoundary: false,
    onSuccess: (data: BaseMutationResponse, variables: any) => {
      //optimistic
      // const optimistic = variables.ticket as Ticket;
      // queryClient.setQueryData([queryKeys.listTicket], (old: any) => {
      //   const oResults = old.results ?? [];
      //   return { results: [oResults, optimistic] };
      // });
      onReload && onReload();
      reset && reset();
      if (!isReset) {
        // for list, grid
        onClose && onClose();
      }

      enqueueSuccessBar('Create ticket successfully!');
    },
    onError: (error: any) => {
      console.log('failed', error);
      enqueueErrorBar('Create ticket failed');
    }
  });

  return { mutationAdd, isLoading, isSuccess, data };
}
