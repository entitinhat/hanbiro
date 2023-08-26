import usePosts from '@base/hooks/usePosts';
import { queryKeys } from '@settings/preferences/config/queryKeys';
import { GET_TICKET_CATEGORIES } from '@settings/preferences/services/graphql/desk';
import { TicketCategory } from '@settings/preferences/types/desk/ticketCategory';

interface FilterTicketCategories {
  keyword: string;
}
export const useQueryTicketCategories = (keyword: string) => {
  let filter: FilterTicketCategories = {
    keyword: keyword
  };
  let queryKey = [queryKeys.ticketCategories, keyword];
  let params = {
    filter
  };
  const response = usePosts<TicketCategory[]>(queryKey, GET_TICKET_CATEGORIES, params, {});
  return response;
};
