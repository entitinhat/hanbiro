import { queryKeys } from '@base/config/iam/queryKeys';
import { USER_PROFILE_ME } from '@base/services/graphql/iam';
import { GetUserMeRequest, User } from '@base/types/iam';
import useIAMSubPost from './useIAMSubPost';

export const useMe = (orgId: string, opts?: any) => {
  const queryKey: string[] = [queryKeys.getMe, orgId];
  const variables: any = {
    orgId
  };
  const response = useIAMSubPost<User>(queryKey, USER_PROFILE_ME, variables, {
    ...opts,
    enabled: orgId != ''
  });
  return response;
};
