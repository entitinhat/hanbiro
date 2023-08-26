import { DESC } from '@base/config/constant';
import usePosts from '@base/hooks/usePosts';
import { FilterInput } from '@base/types/common';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '../config/queryKeys';
import { TICKET_COMMENTS_GET } from '../services/graphql';

export const useTicketComments = ({ ticketId, paging }: any) => {
  //build filter
  let filtersQuery: FilterInput = {
    paging: {
      page: paging.page || 1,
      size: paging.size || 10
    },
    sort: { field: 'createdAt', orderBy: DESC }
  };
  //build query
  filtersQuery.query = `ticket=${ticketId}`;
  //get params
  let params = {
    filter: filtersQuery
  };

  const usePostResult = usePosts<any[]>([queryKeys.ticketComments, keyStringify(filtersQuery, '')], TICKET_COMMENTS_GET, params, {
    enabled: ticketId.length > 0
  });

  return usePostResult;
};
