import useIAMSubPost from '@base/hooks/iam/useIAMSubPost';
import queryKeys from '../config/queryKeys';
import { USER_GET_DETAIL } from '../services/graphql';
import { GetUserRequest, User } from '../types';

export const useUser = (params: GetUserRequest, opts?: any) => {
  const queryKey: string[] = [queryKeys.getUser, JSON.stringify(params)];

  const variables: any = {
    ...params
  };
  const response = useIAMSubPost<User>(queryKey, USER_GET_DETAIL, variables, {
    ...opts
  });
  return response;
};
