import usePosts from '@base/hooks/usePosts';
import usePublicPosts from '@base/hooks/publics/usePublicPosts';
import { GET_ALL_CATEGORIES, GET_ALL_PUBLIC_CATEGORIES } from '@settings/preferences/services/graphql/desk';
import { queryKeys } from '@settings/preferences/config/desk/queryKeys';
import { TicketCategory } from '@settings/preferences/types/desk/ticketCategory';

export const useTicketCategories = (keyword: string, productIds: string[], isPublic?: boolean, token?: string) => {
  let strQuery = `(name:"${keyword}" {isAllProducts=true`;
  const notAllProductIds = productIds.filter((_ele: string) => _ele !== 'all');
  if (notAllProductIds.length > 0) {
    strQuery += ` products=_in_[${notAllProductIds.join(',')}]`;
  }
  strQuery += `})`;

  let response = null;
  console.log('isPublic', isPublic);
  if (isPublic) {
    response = usePublicPosts<TicketCategory[]>(
      [queryKeys.publicTicketCategories, keyword, productIds.join(',')],
      GET_ALL_PUBLIC_CATEGORIES,
      { filter: { query: strQuery }, token },
      {
        enabled: productIds.length > 0
      }
    );
  } else {
    response = usePosts<TicketCategory[]>(
      [queryKeys.ticketCategories, keyword, productIds.join(',')],
      GET_ALL_CATEGORIES,
      { filter: { query: strQuery } },
      {
        enabled: productIds.length > 0
      }
    );
  }
  return response;
};
