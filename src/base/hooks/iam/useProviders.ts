import { ORG_IDENTITY_PROVIDERS_LIST } from "@base/services/graphql/iam";
import { ListProvidersRequest, NewDatasPromise, Provider } from "@base/types/iam";
import useIAMSubPost from "./useIAMSubPost";
import { queryKeys } from '@base/config/iam/queryKeys';

export function useProviders(params: ListProvidersRequest, opts?: any) {
  const {
    data: results,
    refetch,
    isLoading
  } = useIAMSubPost<NewDatasPromise<Provider[]>>([queryKeys.listProviders, JSON.stringify(params)], ORG_IDENTITY_PROVIDERS_LIST, params, opts);

  return { results, refetch, isLoading };
}
