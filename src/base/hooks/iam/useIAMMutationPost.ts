import { BaseMutationResponse } from '@base/types/response';
import { graphQLApi, graphQLIAMApi } from '@base/utils/axios/graphql';
import { useMutation, UseMutationResult } from '@tanstack/react-query';

function useMutationPost<T>(query: string, key: string, options?: any): UseMutationResult<BaseMutationResponse, unknown, T, unknown> {
  const mutation = useMutation(async (newData: T) => {
    const response = await graphQLIAMApi<BaseMutationResponse>(key, query, newData);
    return response;
  }, options);

  return mutation;
}

export default useMutationPost;
