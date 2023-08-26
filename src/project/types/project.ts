import { IdName } from '@base/types/common';
import { User } from '@base/types/user';

export type MemberRole = 'ROLE_PM' | 'ROLE_PL' | 'ROLE_PE' | 'ROLE_QA';

export interface Project {
  id: string;
  name: string;
  parent: IdName;
  ptype: IdName;
  stage: string;
  description?: string;
  account: IdName[];
  members: AssignRole[];
  startDate: Date;
  dueDate: Date;
  process?: IdName;
  createdAt: Date;
  createdBy?: User;
}

export interface AssignRole {
  id: string;
  role: MemberRole;
  fields: Field[];
}

export interface Field {
  field: IdName;
  assignTo: User[];
}
