import { IdName, OptionValue } from '@base/types/common';
import { Group, User } from '@base/types/user';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { DeskTag } from '@desk/main/types/desk';

export interface AssignRule {
  id: string;
  name: string;
  active: boolean;
  module: string;
  rulesEntry: RuleEntry;
}

export interface RuleEntry {
  id: string;
  order: number;
  criteria: {
    key: string;
    condition: any;
  }[];
  assignTo: IAREntryAssignToItem;
}

export interface IAREntryAssignToItem {
  id: string;
  assignsTo: IAssignToName[];
  mode: EAREntryAssignToMode;
  type: EAREntryAssignToType;
  baseOnWorkDay: boolean;
  online: boolean;
  capacity: number;
}
export interface IAssignToName {
  user?: User;
  group?: Group;
}

export enum EAREntryAssignToType {
  NONE = 'AR_ASSIGN_TO_TYPE_NONE',
  QUEUE = 'AR_ASSIGN_TO_TYPE_QUEUE',
  ROUND_ROBIN = 'AR_ASSIGN_TO_TYPE_ROUND_ROBIN',
  BALANCE_NUM = 'AR_ASSIGN_TO_TYPE_LOAD_BALANCE_NUM',
  BALANCE_CAP = 'AR_ASSIGN_TO_TYPE_LOAD_BALANCE_CAP'
}

export enum EAREntryAssignToMode {
  USER = 'AR_ASSGIN_TO_MODE_USER',
  GROUP = 'AR_ASSGIN_TO_MODE_GROUP',
  USERS = 'AR_ASSGIN_TO_MODE_USERS',
  GROUPS = 'AR_ASSGIN_TO_MODE_GROUPS'
}
