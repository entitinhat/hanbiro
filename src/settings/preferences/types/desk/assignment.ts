import { IdName } from '@base/types/common';

export enum DeskAssignType {
  NONE = 'ATYPE_NONE',
  USER = 'ATYPE_USER',
  GROUP = 'ATYPE_GROUP'
}
export interface AssignmentRepInfo {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: IdName | null;
}
export interface AssignmentUser {
  id: string;
  user: AssignmentRepInfo | null;
  isEmail: boolean;
  isSms: boolean;
  active: boolean;
  name?: string;
}
export interface AssignmentRep {
  id: string;
  user: AssignmentRepInfo | null;
  capacity: number;
}
export interface AssignmentGroup {
  id: string;
  name: string;
  reps?: AssignmentRep[] | null;
  description: string;
  active: boolean;
}
