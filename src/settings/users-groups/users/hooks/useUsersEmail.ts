
import useIAMSubPost from '@base/hooks/iam/useIAMSubPost';
import { NewDatasPromise, User } from '@base/types/iam';
import { ListUsersRequest } from '@settings/users-groups/types/user';
import queryKeys from '../config/queryKeys';
import { USER_GET_LIST } from '../services/graphql';


export const useUsersEmail = (params: ListUsersRequest, opts?: any) => {
  const {
    data: results,
    refetch,
    status,
    isLoading
  } = useIAMSubPost<NewDatasPromise<User[]>>([queryKeys.listUsers, JSON.stringify(params)], USER_GET_LIST, params, opts);

  return { results, refetch, status, isLoading };
};
