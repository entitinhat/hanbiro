import useMutationPost from '@base/hooks/useMutationPost';
import useSnackBar from '@base/hooks/useSnackBar';
import { BaseMutationResponse } from '@base/types/response';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { queryKeys } from '../config/queryKeys';
import {
  DESK_TICKET_BULK_UPDATE,
  DESK_TICKET_BULK_DELETE,
  DESK_TICKET_CLOSE,
  DESK_TICKET_DELETE,
  DESK_TICKET_SPAM,
  DESK_TICKET_RESTORE,
  DESK_TICKET_DELETE_RECOVERY,
  DESK_TICKET_EMPTY_RECOVERY
} from '../services/graphql';
import { Ticket } from '../types/ticket';

export default function useTicketMutation(listQueryKey: any[]) {
  const queryClient = useQueryClient();
  const { enqueueSuccessBar } = useSnackBar();
  const rQueryKeys = [queryKeys.listTicket, ...listQueryKey];
  const syncUpdateMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);
    const previous = queryClient.getQueryData(rQueryKeys);
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      const params = {
        ...old,
        data: old?.data?.map((v: Ticket) => {
          if (variables.ids.includes(v.id)) {
            return {
              ...v,
              assignedGroup: variables.assignedGroup ? { ...v.assignedGroup, ...variables.assignedGroup } : v.assignedGroup,
              assignedUser: variables.assignedUser ? { ...v.assignedUser, ...variables.assignedUser } : v.assignedUser,
              product: variables.product ? { ...v.product, ...variables.product } : v.product,
              category: variables.category ? { ...v.category, ...variables.category } : v.category,
              tags: variables.tags ? { ...v.tags, ...variables.tags } : v.tags
            };
          }
          return v;
        })
      };
      return params;
    });
    return { previous };
  };

  const syncExceptMutate = async (variables: any) => {
    await queryClient.cancelQueries(rQueryKeys);

    const previous = queryClient.getQueryData(rQueryKeys);
    const optimistic = variables.ids as string[];
    queryClient.setQueryData(rQueryKeys, (old: any) => {
      return { ...old, data: old?.data?.filter((v: Ticket) => !optimistic.includes(v.id)) };
    });

    return { previous };
  };

  const errorMutate = (error: any, variables: any, context: any) => {
    if (context.previous) {
      queryClient.setQueryData(rQueryKeys, context.previous);
    }
  };

  const settledMutate = () => {
    queryClient.invalidateQueries(rQueryKeys);
  };

  const mUpdateBulk: any = useMutationPost<BaseMutationResponse>(DESK_TICKET_BULK_UPDATE, queryKeys.bulkUpdateTicket, {
    onMutate: syncUpdateMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => {
      enqueueSuccessBar('Updated Ticket successfully!');
    }
  });

  const mDeleteBulk: any = useMutationPost<BaseMutationResponse>(DESK_TICKET_BULK_DELETE, queryKeys.bulkDeleteTicket, {
    onMutate: syncExceptMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => {
      enqueueSuccessBar('Delete Ticket successfully!');
    }
  });

  const mCloseTicket: any = useMutationPost<BaseMutationResponse>(DESK_TICKET_CLOSE, queryKeys.closeTicket, {
    onMutate: syncExceptMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Closed Ticket successfully!')
  });

  const mReportSpam: any = useMutationPost<BaseMutationResponse>(DESK_TICKET_SPAM, queryKeys.reportSpamTicket, {
    onMutate: syncExceptMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Reported Spam successfully!')
  });

  const mDeleteTicket: any = useMutationPost<BaseMutationResponse>(DESK_TICKET_DELETE, queryKeys.deleteTicket, {
    onMutate: syncExceptMutate,
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [queryKeys.listTicket] });
        enqueueSuccessBar('Delete Ticket successfully!');
      }, 2000);
      // enqueueSuccessBar('Deleted Ticket successfully!');
    }
  });

  const mRestoreTicket: any = useMutationPost<BaseMutationResponse>(DESK_TICKET_RESTORE, queryKeys.ticketRestore, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Restore Ticket successfully!')
  });

  const mEmptyTicket: any = useMutationPost<BaseMutationResponse>(DESK_TICKET_DELETE_RECOVERY, queryKeys.ticketDeleteRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete recovery Ticket successfully!')
  });

  const mEmptyAllTicket: any = useMutationPost<BaseMutationResponse>(DESK_TICKET_EMPTY_RECOVERY, queryKeys.ticketEmptyRecovery, {
    onError: errorMutate,
    onSettled: settledMutate,
    onSuccess: () => enqueueSuccessBar('Delete all recovery Ticket successfully!')
  });

  return { mDeleteTicket, mReportSpam, mCloseTicket, mUpdateBulk, mDeleteBulk, mRestoreTicket, mEmptyTicket, mEmptyAllTicket };
}
