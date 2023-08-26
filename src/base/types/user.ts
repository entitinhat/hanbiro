import { IdName } from './common';

export interface UsersPayload {
  nodes: User[];
}
export interface UserPayload {
  directory_me: User;
}
//=============================+++EMAI + Phone IAM =============================================
export interface Email {
  address: string;
  primary?: boolean;
}
export interface Phone {
  number: string;
  primary?: boolean;
}
//==============================================================================================
export interface User extends IdName {
  //======================================Old Desk Type==========================
  // fullName?: string;
  photo?: string;
  email?: string;
  properties?: Property;
  identity?: Identity;

  //=========================================IAM-USER-TYPE====================
  // id?: string; //extends IdName
  orgId?: string;
  displayName?: string;
  fullName?: string;
  urlName?: string;
  primaryEmail?: string;
  primaryPhone?: string;
  emails?: Email[];
  phones?: Phone[];
  createdAt?: any;
  updatedAt?: any;
}

interface Identity {
  identifier: string;
}

interface Property {
  crmBaseGroup: Group;
  crmGroups: Group[];
  crmRoleId?: string;
}

export interface Group extends IdName {
  order?: number;
  up?: string;
  children?: Group[];
}

export interface AssignToName {
  user: IdName;
  group?: IdName;
}
