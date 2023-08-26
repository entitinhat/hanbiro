export enum ProductType {
  UNSPECIFIED = 'PRODUCT_TYPE_UNSPECIFIED',
  GENERIC_PRODUCT = 'GENERIC_PRODUCT',
  IAM = 'IAM',
  TEAMCHANNEL = 'TEAMCHANNEL',
  TEAMHOUSE = 'TEAMHOUSE',
  TEAMMAIL = 'TEAMMAIL',
  DESK = 'DESK',
  SALES = 'SALES',
  MARKETING = 'MARKETING'
}

export interface Tenant {
  id: string;
  orgId: string;
  productType: ProductType;
  domain: string;
  path: string;
  urls: string[];
  createdAt?: any;
}
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
export enum PrincipalType {
  UNSPECIFIED = 'PRINCIPAL_TYPE_UNSPECIFIED',
  USER = 'USER',
  GROUP = 'GROUP'
}
export enum AccessType {
  UNSPECIFIED = 'ACCESS_TYPE_UNSPECIFIED',
  ALLOW = 'ALLOW',
  DENY = 'DENY'
}
export enum RoleType {
  UNSPECIFIED = 'TYPE_UNSPECIFIED',
  BUILT_IN = 'BUILT_IN',
  CUSTOM = 'CUSTOM'
}
export interface Role {
  id: string;
  displayName: string;
  description: string;
  actions: string[];
  notActions: string[];
  // OUTPUT_ONLY
  type?: RoleType;
  // OUTPUT_ONLY
  permissions?: string[];
  // OUTPUT_ONLY
  createdAt?: any;
  // OUTPUT_ONLY
  updatedAt?: any;
}
export interface RoleAssignment {
  id: string;
  // IMMUTABLE
  principalId: string;
  // IMMUTABLE
  principalType: PrincipalType;
  // IMMUTABLE
  scope: string;
  // IMMUTABLE
  roleId: string;
  //IMMUTABLE
  accessType: AccessType;
  description: string;
  createdAt?: any;
}

export interface GetUserMeRequest {
  orgId: string;
}

export interface BaseListRequest {
  cursor?: string;
  maxResults?: number;
  readMask?: string;
  locale?: string;
}

export interface BaseListResponse {
  nextCursor: string;
}

export interface BaseMutation {
  locale: string;
}

export interface NewDatasPromise<T> {
  items: T;
  nextCursor?: string;
}

export enum ProviderType {
  UNSPECIFIED = 'TYPE_UNSPECIFIED',
  GENERIC_OAUTH2 = 'GENERIC_OAUTH2',
  IDENTITY = 'IDENTITY',
  GROUPWARE = 'GROUPWARE',
  GOOGLE = 'GOOGLE',
  GITHUB = 'GITHUB'
}
export interface Oauth2Config {
  clientId: string;
  clientSecret: string;
  scope: string;
  authorizationUrl: string;
  tokenUrl: string;
  revocationUrl: string;
  introspectionUrl: string;
}
export interface Provider {
  id: string;
  // REQUIRED
  displayName: string;
  // IMMUTABLE
  type: ProviderType;
  oauth2: Oauth2Config;
  // OUTPUT_ONLY
  createdAt?: any;
}

export interface ListProvidersRequest extends BaseListRequest {
  orgId: string;
}
