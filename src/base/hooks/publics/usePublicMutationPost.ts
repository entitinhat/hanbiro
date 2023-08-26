import { isString } from 'lodash';
import { useEffect } from 'react';

import { graphQLPublicApi } from '@base/utils/axios/graphql';
import { IResponseError } from '@base/utils/axios/helper';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

function usePublicMutationPost<T>(
  query: string,
  key: string,
  options?: any,
): UseMutationResult<T, unknown, void, unknown> {
  const mutation = useMutation(async (newData) => {
    const response = await graphQLPublicApi<T>(key, query, newData);
    return response;
  }, options);

  useEffect(() => {
    if (isString(mutation.error)) {
      const err = JSON.parse(mutation.error) as IResponseError;
    }
  }, [mutation.error]);

  return mutation;
}

export default usePublicMutationPost;
