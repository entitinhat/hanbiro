import { queryKeys } from '@base/config/iam/queryKeys';
import { GET_CURRENT_TENANT, GET_TENANT_BY_DOMAIN } from '@base/services/graphql/iam';
import { Tenant } from '@base/types/iam';
import { useIAMPost } from '@base/hooks/iam/useIAMPost';

export const useTenant = (options?: any) => {
  const queryKey: string[] = [queryKeys.getTenant];

  const variables: any = {};
  const response = useIAMPost<Tenant>(queryKey, GET_CURRENT_TENANT, variables, {
    ...options
  });
  return response;
};
export const useTenantByDomain = (domain: string, options?: any) => {
  const nDomain = domain.replaceAll('jiki.me', 'habin.io');
  const variables: any = {
    domain: nDomain
  };
  const queryKey: string[] = [queryKeys.getTenant, nDomain];
  const response = useIAMPost<Tenant>(queryKey, GET_TENANT_BY_DOMAIN, variables, {
    ...options,
    enabled: domain != ''
  });
  return response;
};
