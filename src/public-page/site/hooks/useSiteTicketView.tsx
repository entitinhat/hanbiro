import usePublicPost from '@base/hooks/publics/usePublicPost';
import { keyStringify } from '@base/utils/helpers';
import { queryKeys } from '@public-page/site/config/queryKeys';
import { getSiteTicketViewQuery } from '@public-page/site/services/graphql';

export const useSiteTicketView = (schemas = '', params: any = {}) => {
  const query = getSiteTicketViewQuery(schemas);
  const menuKey = [queryKeys.siteTicketGet, keyStringify(params, '')];

  const response = usePublicPost<any>(menuKey, query, params, {
    keepPreviousData: false,
    enabled: schemas != '' && params?.id?.length > 0
  });
  return response;
};
