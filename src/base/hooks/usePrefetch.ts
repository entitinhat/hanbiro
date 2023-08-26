import { isArray } from 'lodash';

import { DatasPromise } from '@base/types/response';
import { graphQLGetsApi } from '@base/utils/axios/graphql';
import { useQueryClient } from '@tanstack/react-query';

export function usePrefetch<T>(queryKey: any[], query: string, variables: any) {
  const key = isArray(queryKey) ? queryKey[0] : queryKey;
  const queryClient = useQueryClient();
  queryClient.prefetchQuery<DatasPromise<T>>(queryKey, () => graphQLGetsApi<T>(key, query, variables));
}

export default usePrefetch;
