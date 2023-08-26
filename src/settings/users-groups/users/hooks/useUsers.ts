import useIAMSubPost from '@base/hooks/iam/useIAMSubPost';
import { NewDatasPromise } from '@base/types/iam';
import queryKeys from '../config/queryKeys';
import { USER_GET_LIST } from '../services/graphql';
import { User, ListUsersRequest } from '../types';

export const useUsers = (params: ListUsersRequest, opts?: any) => {
  const {
    data: results,
    refetch,
    status,
    isLoading
  } = useIAMSubPost<NewDatasPromise<User[]>>([queryKeys.listUsers, JSON.stringify(params)], USER_GET_LIST, params, opts);

  return { results, refetch, status, isLoading };
};
