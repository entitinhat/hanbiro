import { Group, User } from '@base/types/user';
import {
  EAREntryAssignToMode,
  EAREntryAssignToType,
  EARAssignToMode,
  EARAssignToType,
} from '../enums';

export interface IARCriteria {
  key: string;
  condition: any;
}
export interface IAssignToName {
  user?: User;
  group?: Group;
}
export interface IARAssignTo {
  id: string;
  mode: EARAssignToMode;
  type: EARAssignToType;
  items: IAssignToName[];
  baseOnWorkDay: boolean;
  capacity: number;
}
export interface IARAssignToItem {
  id: string;
  assignTo: IAssignToName;
  mode: EARAssignToMode;
  type: EARAssignToType;
  baseOnWorkDay: boolean;
  capacity: number;
}

export interface IAssignMentRule {
  id: string;
  name: string;
  description: string;
  module: string[];
  criteria: IARCriteria[];
  assignsTo: IARAssignToItem[];
  active: boolean;
  createdAt: any;
  createdBy: User;
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
export interface IARRuleEntryItem {
  id: string;
  order: number;
  criteria: {
    key: string;
    condition: any;
  }[];
  assignTo: IAREntryAssignToItem;
}
