
import useIAMSubPost from '@base/hooks/iam/useIAMSubPost';
import { NewDatasPromise } from '@base/types/iam';
import queryKeys from '../config/queryKeys';
import { GROUP_GET_DETAIL, GROUP_GET_MEMBERSHIP_LIST } from '../services/graphql';
import { GetGroupRequest, Group, ListMembershipsRequest, Membership } from '../types/group';
export const useGroupMembership = (params: ListMembershipsRequest, opts?: any) => {
  const queryKey: string[] = [queryKeys.groupMemberships, JSON.stringify(params)];

  const variables: any = {
    ...params
  };
  const response = useIAMSubPost<NewDatasPromise<Membership[]>>(queryKey, GROUP_GET_MEMBERSHIP_LIST, variables, {
    ...opts
  });
  return response;
};
