import { isArray, isString } from 'lodash';
import { useEffect } from 'react';

import { graphQLPublicApi } from '@base/utils/axios/graphql';
import { IResponseError } from '@base/utils/axios/helper';
import { useQuery } from '@tanstack/react-query';

export function usePublicPost<T>(queryKey: any[], query: string, variables: any, options?: any) {
  let key: string;
  if (isArray(queryKey)) {
    key = queryKey[0];
  } else {
    key = queryKey;
  }

  const response = useQuery<T>(queryKey, () => graphQLPublicApi<T>(key, query, variables), options);

  //go to Error Page
  useEffect(() => {
    if (isString(response.error)) {
      const err = JSON.parse(response.error) as IResponseError;
    }
  }, [response.error]);
  return response;
}

export default usePublicPost;
