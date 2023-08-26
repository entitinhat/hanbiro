export enum MemberType {
  UNSPECIFIED = 'MEMBER_TYPE_UNSPECIFIED',
  USER = 'USER',
  GROUP = 'GROUP'
}

export enum MembershipType {
  TRANSITIVE = 'TRANSITIVE',
  DIRECT = 'DIRECT',
  INHERITED = 'INHERITED'
}

export interface Membership {
  memberId: string;
  memberType: MemberType;
  groupId: string;
  displayOrder: number;
  type: MembershipType;
  createdAt: any;
}

export interface Group {
  id: string;
  orgId: string;
  displayName: string;
  urlName: string;
  description: string;
  numMembers?: number;
  numDirectMembers?: number;
  memberships?: Membership[];
  createdAt?: any;
  updatedAt?: any;
}

// export interface CreateGroupRequest extends BaseMutation {
//   group: Group;
// }
// export interface UpdateGroupRequest extends BaseUpdateMutation {
//   group: Group;
// }
// export interface DeleteGroupRequest {
//   orgId: string;
//   id: string;
// }
export interface ListGroupsRequest {
  orgId: string;
  cursor?: string;
  maxResults?: number;
}
export interface ListGroupsResponse<T> {
  groups: T[];
  nextCursor: string;
}
export interface GetGroupRequest {
  orgId?: string;
  id: string;
  readMask?: string;
  locale?: string;
  maxResults?: number;
}

export interface ListMembershipsRequest  {
  orgId: string;
  cursor?: string;
  maxResults?: number;
  // Lists memberships a user or group has.
  // group
  groupId?: string;
  // user
  memberId?: string;
  memberType?: MemberType;
  type?: MembershipType;
}
export interface ListMembershipsResponse<T>  {
  memberships: T[];
  nextCursor: string;
}

export interface AddOrRemoveGroupMemberInput {
  orgId: string;
  groupId: string;
  memberId: string;
  memberType: MembershipType;
}
export interface UpdateGroupMemberInput {
  orgId: string;
  groupId: string;
  memberId: string;
  memberType: MembershipType;
  displayOrder: number;
}
export interface UpdateGroupInput {
  orgId: string;
  id: string;
  displayName: string;
  urlName?: string;
  description?: string;
  locale?: string;
}

export interface CreateGroupInput {
  orgId: string;
  displayName: string;
  urlName: string;
  description: string;
  locale?: string;
}

export interface DeleteGroupInput {
  orgId: string;
  id: string;
}
