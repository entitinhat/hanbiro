import { isArray } from 'lodash';

import { graphQLIAMApi } from '@base/utils/axios/graphql';
import { useQuery } from '@tanstack/react-query';

export function useIAMPost<T>(queryKey: any[], query: string, variables: any, options?: any) {
  const key = isArray(queryKey) ? queryKey[0] : queryKey;
  const response = useQuery<T>(
    queryKey,
    () => {
      return graphQLIAMApi<T>(key, query, variables);
    },
    options
  );

  return response;
}
