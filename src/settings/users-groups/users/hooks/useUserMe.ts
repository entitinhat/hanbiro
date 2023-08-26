// import useSubPost from '@base/hooks/useSubPost';
// import queryKeys from '../config/queryKeys';
// import { USER_PROFILE_ME } from '../services/graphql';
// import { GetUserMeRequest, User } from '../types/user';
// export const useUserMe = (params: GetUserMeRequest, opts?: any) => {
//   const queryKey: string[] = [queryKeys.getUser, JSON.stringify(params)];

//   const variables: any = {
//     ...params
//   };
//   const response = useSubPost<User>(queryKey, USER_PROFILE_ME, variables, {
//     ...opts
//   });
//   return response;
// };
