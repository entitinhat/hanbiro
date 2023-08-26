import useIAMSubPost from '@base/hooks/iam/useIAMSubPost';
import { GetUserMeRequest, User } from '@base/types/iam';
import queryKeys from '../config/queryKeys';
import { USER_GET_DETAIL_BY_EMAIL } from '../services/graphql';

export const useUserEmail = (params: { orgId: string; emails: string[] }, opts?: any) => {
  const queryKey: string[] = [queryKeys.getUser, JSON.stringify(params)];

  const variables: any = {
    ...params
  };
  const response = useIAMSubPost<User>(queryKey, USER_GET_DETAIL_BY_EMAIL, variables, {
    ...opts
  });
  return response;
};
