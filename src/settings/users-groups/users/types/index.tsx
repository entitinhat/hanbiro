import { BaseListRequest, BaseListResponse, BaseMutation } from '@base/types/iam';

export interface Email {
  address: string;
  primary?: boolean;
}
export interface Phone {
  number: string;
  primary?: boolean;
}
export interface User {
  id: string;
  orgId: string;
  displayName: string;
  fullName: string;
  urlName: string;
  primaryEmail: string;
  primaryPhone: string;
  emails: Email[];
  phones: Phone[];
  createdAt?: any;
  updatedAt?: any;
}

export interface CreateUserRequest extends BaseMutation {
  user: User;
}
// export interface UpdateUserRequest extends BaseUpdateMutation {
//   user: User;
// }
export interface DeleteUserRequest {
  orgId: string;
  // userid
  id: string;
}
export interface ListUsersRequest extends BaseListRequest {
  orgId: string;
}
export interface ListUsersResponse<T> extends BaseListResponse {
  users: T[];
}
export interface GetUserRequest {
  orgId: string;
  // Gets the authenticated user if empty.
  id: string;
  emails?: string[];
  readMask?: string;
  locale?: string;
}

export interface CreateUserInput {
  orgId: string;
  displayName: string;
  fullName: string;
  urlName: string;
  emails: [string];
  primaryEmail: string;
  phones: [string];
  primaryPhone: string;
  locale?: string;
}

export interface UpdateUserInput {
  orgId: string;
  id: string;
  displayName?: string;
  fullName?: string;
  urlName?: string;
  primaryEmail?: string;
  primaryPhone?: string;
  locale?: string;
}
export interface DeleteUserInput {
  orgId: string;
  id: string;
}
export interface AddOrRemoveUserEmailInput {
  orgId: string;
  userId: string;
  email: string;
}

export interface AddOrRemoveUserPhoneInput {
  orgId: string;
  userId: string;
  phone: string;
}

export interface GetUserMeRequest {
  orgId: string;
}
