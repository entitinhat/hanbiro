import usePosts from '@base/hooks/usePosts';
import { GET_USER_IN_GROUP } from '@base/services/graphql/user';
import { User } from '@base/types/user';
import { queryKeys } from '@sign-in/config/queryKeys';

export const useUsersAutoComplete = (params: any, options?: any) => {
  const usePostResult = usePosts<User[]>(
    params.keyword ? [queryKeys.usesGet, params.keyword] : [queryKeys.usesGet], //query keys
    GET_USER_IN_GROUP,
    params,
    { ...options }
  );

  return usePostResult;
};
