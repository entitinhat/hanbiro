import _, { isArray, isString } from 'lodash';
import { useEffect } from 'react';

import { DatasPromise } from '@base/types/response';
import { graphQLGetsApi, PostQueryKey } from '@base/utils/axios/graphql';
import { IResponseError } from '@base/utils/axios/helper';
import Storages from '@base/utils/storages/ls';
import { useInfiniteQuery } from '@tanstack/react-query'; //v4

export function useInfinitePosts<T>(queryKey: PostQueryKey, query: string, variables: any, options?: any) {
  const Ls = new Storages();
  // const setAuth = useSetRecoilState(authAtom);

  let key: string;
  if (isArray(queryKey)) {
    key = queryKey[0];
  } else {
    key = queryKey;
  }

  const response = useInfiniteQuery<DatasPromise<T>>(
    queryKey,
    ({ pageParam = 1 }) =>
      graphQLGetsApi<T>(key, query, {
        ...variables,
        filter: { ...variables.filter, paging: { ...variables.filter.paging, page: pageParam } }
      }),
    {
      ...options,
      getNextPageParam: (lastPage) => lastPage.paging?.nextPage || undefined, // ??(a ? a : b) / !! (never null)
      getPreviousPageParam: (firstPage) => firstPage.paging?.previousPage || undefined
    }
  );

  // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
  useEffect(() => {
    if (isString(response.error)) {
      const err = JSON.parse(response.error) as IResponseError;
      // console.log(err);

      if (['no_authentication', 'server_error'].includes(err.message)) {
        // Ls.remove('token');
        // setAuth(null);
        // // console.log('logout');
      }
    }
  }, [response.error]);

  return response;
}

export default useInfinitePosts;
