import useIAMSubPost from '@base/hooks/iam/useIAMSubPost';
import queryKeys from '../config/queryKeys';
import { GROUP_GET_DETAIL } from '../services/graphql';
import { GetGroupRequest, Group } from '../types/group';
export const useGroup = (params: GetGroupRequest, opts?: any) => {
  const queryKey: string[] = [queryKeys.getGroup, JSON.stringify(params)];

  const variables: any = {
    ...params
  };
  const response = useIAMSubPost<Group>(queryKey, GROUP_GET_DETAIL, variables, {
    ...opts
  });
  return response;
};
