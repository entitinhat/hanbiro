// import useRpcQueryPost, { UseRpcPostResult } from '@base/hooks/useRpcQueryPost';
// import apiKeys from '../config/apiKeys';
// import {
//   GetGroupRequest,
//   ListGroupsRequest,
//   ListGroupsResponse,
//   Group,
//   ListMembershipsRequest,
//   Membership,
//   ListMembershipsResponse
// } from '../types/group';

// export function useGroupQuery() {
//   // LisGroups
//   const ListGroups = (req: ListGroupsRequest): UseRpcPostResult<ListGroupsResponse<Group>> => {
//     const url = apiKeys.listGroups;
//     const response = useRpcQueryPost<ListGroupsResponse<Group>>(url, req);
//     return response;
//   };
//   // LisMemberships
//   const ListMemberships = (req: ListMembershipsRequest): UseRpcPostResult<ListMembershipsResponse<Membership>> => {
//     const url = apiKeys.listMemberships;
//     const response = useRpcQueryPost<ListMembershipsResponse<Membership>>(url, req);
//     return response;
//   };
//   // GetGroup
//   const GetGroup = (req: GetGroupRequest): UseRpcPostResult<Group> => {
//     const url = apiKeys.getGroup;
//     const response = useRpcQueryPost<Group>(url, req);
//     return response;
//   };

//   return {
//     ListGroups,
//     GetGroup,
//     ListMemberships
//   };
// }
