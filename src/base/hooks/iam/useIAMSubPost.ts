import { isArray } from 'lodash';

import { graphQLIAMSubApi } from '@base/utils/axios/graphql';
import { useQuery } from '@tanstack/react-query';

export function useIAMSubPost<T>(queryKey: any[], query: string, variables: any, options?: any) {
  const key = isArray(queryKey) ? queryKey[0] : queryKey;
  const response = useQuery<T>(
    queryKey,
    () => {
      return graphQLIAMSubApi<T>(key, query, variables);
    },
    options
  );

  return response;
}

export default useIAMSubPost;
