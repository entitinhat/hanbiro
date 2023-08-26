import { isArray } from 'lodash';

import { BaseResponse } from '@base/types/response';
import { graphQLApi } from '@base/utils/axios/graphql';
import { useQuery } from '@tanstack/react-query';

export function usePost<T>(queryKey: any[], query: string, variables: any, options?: any) {
  const key = isArray(queryKey) ? queryKey[0] : queryKey;
  const response = useQuery<T>(
    queryKey,
    () => {
      return graphQLApi<T>(key, query, variables);
    },
    options
  );

  return response;
}

export default usePost;
