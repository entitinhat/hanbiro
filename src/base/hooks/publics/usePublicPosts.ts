import { isArray, isString } from 'lodash';
import { useEffect } from 'react';

import { DatasPromise } from '@base/types/response';
import { graphQLGetsPublicApi } from '@base/utils/axios/graphql';
import { IResponseError } from '@base/utils/axios/helper';
import { useQuery } from '@tanstack/react-query';

export function usePublicPosts<T>(queryKey: any[], query: string, variables: any, options?: any) {
  let key: string;
  if (isArray(queryKey)) {
    key = queryKey[0];
  } else {
    key = queryKey;
  }

  const response = useQuery<DatasPromise<T>>(
    queryKey,
    () => graphQLGetsPublicApi<T>(key, query, variables),
    options,
  );

  // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
  useEffect(() => {
    if (isString(response.error)) {
      const err = JSON.parse(response.error) as IResponseError;
    }
  }, [response.error]);
  return response;
}

export default usePublicPosts;
