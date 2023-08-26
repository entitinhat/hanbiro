import usePost from '@base/hooks/usePost';
import { queryKeys } from '../config/queryKeys';
import { GET_TICKET_QUICK_VIEW, GET_TICKET_VIEW } from '../services/graphql';
import { Ticket } from '../types/ticket';

export const useTicketQuickView = (id: string) => {
  let queryKey = [queryKeys.viewTicket, id];
  const response = usePost<Ticket>(queryKey, GET_TICKET_QUICK_VIEW, { id });
  return response;
};
