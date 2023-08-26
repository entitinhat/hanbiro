import usePosts from '@base/hooks/usePosts';
import { Ticket } from '@desk/ticket/types/ticket';
import { queryKeys } from '@desk/ticket/config/queryKeys';
import { GET_TICKETS_AUTO_COMPLETE } from '@desk/ticket/services/graphql';

export const useTicketAutoComplete = (params: any) => {
  const query = params?.filter?.query ?? '';
  let queryKey = [queryKeys.listTicket, query];
  const response = usePosts<Ticket[]>(queryKey, GET_TICKETS_AUTO_COMPLETE, params, {});
  return response;
};
