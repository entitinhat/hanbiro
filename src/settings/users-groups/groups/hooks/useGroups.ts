import useIAMSubPost from '@base/hooks/iam/useIAMSubPost';
import usePosts from '@base/hooks/usePosts';
import { NewDatasPromise } from '@base/types/iam';

import queryKeys from '../config/queryKeys';
import { GROUP_GET_LIST } from '../services/graphql';
import { Group, ListGroupsRequest } from '../types/group';
export const useGroups = (params: ListGroupsRequest, opts?: any) => {
  const {
    data: results,
    refetch,
    isLoading
  } = useIAMSubPost<NewDatasPromise<Group[]>>([queryKeys.listGroups, JSON.stringify(params)], GROUP_GET_LIST, params, opts);

  return { results, refetch, isLoading };
};
