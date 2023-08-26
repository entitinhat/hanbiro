//project
import useMutationPost from '@base/hooks/useMutationPost';
import usePosts from '@base/hooks/usePosts';

//menu
import { queryKeys } from '../config/queryKeys';
import { SUS_CUSTOM_DOMAINS_GET, SUS_CUSTOM_DOMAIN_CREATE, SUS_CUSTOM_DOMAIN_DELETE } from '../services/graphql';

export const useSUSCustomDomainCreate = (opt?: any) => {
  const mPost = useMutationPost(SUS_CUSTOM_DOMAIN_CREATE, queryKeys.susCustomDomainCreate, opt);
  return mPost;
};

export const useSUSCustomDomains = () => {
  const menuKey = [queryKeys.susCustomDomainsGet, 'setting', 'backHalf'];
  const filter = {
    filter: {
      filters: {},
      query: 'groupBy=backHalf',
      sort: { field: 'createdAt', orderBy: 2 },
      paging: { page: 1, size: 1000 }
    }
  };
  const res = usePosts<any>(menuKey, SUS_CUSTOM_DOMAINS_GET, filter, {
    keepPreviousData: true
    //enabled: schemas != 'id',
  });
  return res;
};

export const useSUSCustomDomainDelete = (opt?: any) => {
  const mPost = useMutationPost(SUS_CUSTOM_DOMAIN_DELETE, queryKeys.susCustomDomainsDelete, opt);
  return mPost;
};
