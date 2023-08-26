import { isArray } from 'lodash';

import { DatasPromise } from '@base/types/response';
import { graphQLGetsApi } from '@base/utils/axios/graphql';
import { useQuery } from '@tanstack/react-query';

export function usePosts<T>(queryKey: any[], query: string, variables: any, options?: any) {
  const key = isArray(queryKey) ? queryKey[0] : queryKey;
  const response = useQuery<DatasPromise<T>>(queryKey, () => graphQLGetsApi<T>(key, query, variables), options);
  return response;
}

export default usePosts;
