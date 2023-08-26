import { DESC } from '@base/config/constant';
import usePublicPosts from '@base/hooks/publics/usePublicPosts';
import { keyStringify } from '@base/utils/helpers';
import { SITE_TICKET_COMMENTS_GET } from '@public-page/site/services/graphql';

/** ticket comment */
export const useSiteTicketComments = ({ ticketId, paging, token }: any) => {
  const graphQLKey = 'site_ticketComments';

  //build filter
  let filtersQuery: any = {
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
    filter: filtersQuery,
    token
  };

  const usePostResult = usePublicPosts<any[]>([graphQLKey, keyStringify(filtersQuery, '')], SITE_TICKET_COMMENTS_GET, params, {
    enabled: ticketId.length > 0 && token.length > 0
  });

  return usePostResult;
};
