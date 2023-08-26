import usePublicPosts from '@base/hooks/publics/usePublicPosts';
import { keyStringify } from '@base/utils/helpers';
import { Ticket } from '@desk/ticket/types/ticket';
import { queryKeys } from '@public-page/site/config/queryKeys';
import { getTicketListQuery } from '@public-page/site/services/graphql';

export const useSiteTickets = (token: string, querySchema: string, filter: any) => {
  let queryKey = [queryKeys.siteTicketsGet, keyStringify(filter, '')];
  let params = {
    filter: filter,
    token
  };
  const response = usePublicPosts<Ticket[]>(queryKey, getTicketListQuery(querySchema), params, {
    enabled: querySchema != '' && token !== ''
  });
  return response;
};
