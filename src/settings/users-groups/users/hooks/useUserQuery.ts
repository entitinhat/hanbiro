// import useRpcQueryPost, { UseRpcPostResult } from '@base/hooks/useRpcQueryPost';
// import apiKeys from '@directory/users/config/apiKeys';
// import { GetUserRequest, ListUsersRequest, ListUsersResponse, User } from '@directory/users/types/user';

// export function useUserQuery() {
//   // ListUsers
//   const ListUsers = (req: ListUsersRequest): UseRpcPostResult<ListUsersResponse<User>> => {
//     const url = apiKeys.listUsers;
//     const response = useRpcQueryPost<ListUsersResponse<User>>(url, req);
//     return response;
//   };
//   // GetUser
//   const GetUser = (req: GetUserRequest): UseRpcPostResult<User> => {
//     const url = apiKeys.getUser;
//     const response = useRpcQueryPost<User>(url, req);
//     return response;
//   };

//   return {
//     ListUsers,
//     GetUser
//   };
// }
