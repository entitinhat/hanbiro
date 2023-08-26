import { IdName, OptionValue } from '@base/types/common';
import { Group, User } from '@base/types/user';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { DeskTag } from '@desk/main/types/desk';
import { EAREntryCriteriaType, EAssignmentRuleModule } from './enums';

export interface AssignRule {
  id: string;
  name: string;
  // active: boolean;
  module: string;
  description: string;
  // rulesEntry: RuleEntry;
  createdBy: any;
  createdAt: string;
  updatedAt: string;
}

export interface RuleEntry {
  id: string;
  order: number;
  criteria: {
    key: string;
    condition: any;
  }[];
  criteriaType: EAREntryCriteriaType;
  assignTo: IAREntryAssignToItem;
}
export interface AssignmentRule {
  id: string;
  name: string;
  module: EAssignmentRuleModule;
  channel: IdName;
  description: string;
  rulesEntry: RuleEntry[];
  assignUnassigned: IAREntryAssignToItem;
}
export interface IAREntryAssignToItem {
  // id: string;
  assignsTo: IAssignToName[];
  mode: EAREntryAssignToMode;
  checkAvailable?: EAREntryAssignCheckAvailable;
  // type: EAREntryAssignToType;
  // baseOnWorkDay: boolean;
  // online: boolean;
  // capacity: number;
}
export interface IAssignToName {
  user?: User;
  group?: Group;
}

// export enum EAREntryAssignToType {
//   NONE = 'AR_ASSIGN_TO_TYPE_NONE',
//   QUEUE = 'AR_ASSIGN_TO_TYPE_QUEUE',
//   ROUND_ROBIN = 'AR_ASSIGN_TO_TYPE_ROUND_ROBIN',
//   BALANCE_NUM = 'AR_ASSIGN_TO_TYPE_LOAD_BALANCE_NUM',
//   BALANCE_CAP = 'AR_ASSIGN_TO_TYPE_LOAD_BALANCE_CAP'
// }

export enum EAREntryAssignToMode {
  USER = 'AR_ASSGIN_TO_MODE_USER',
  GROUP = 'AR_ASSGIN_TO_MODE_GROUP'
}
export enum EAREntryAssignCheckAvailable {
  NONE = 'AR_ENTRY_ASSIGN_CHECK_NONE',
  ONLINE = 'AR_ENTRY_ASSIGN_CHECK_ONLINE',
  WORK = 'AR_ENTRY_ASSIGN_CHECK_WORK_DAY'
}
