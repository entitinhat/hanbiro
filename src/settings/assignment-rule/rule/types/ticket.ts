import { IdName, OptionValue } from '@base/types/common';
import { AssignToName, Group, User } from '@base/types/user';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';
import { DeskTag } from '@desk/main/types/desk';

export interface Ticket {
  id: string;
  code: string;
  subject: string;
  category: IdName;
  customer: IdName;
  contact?: IdName;
  product: IdName;
  priority: OptionValue;
  status: OptionValue;
  process?: IdName;
  channel?: IdName;
  duration?: number;
  durationUnit?: string;
  resolutionDue?: any;
  firstRespondDue?: any;
  tags?: DeskTag[];
  content?: string;
  assignedGroup?: IdName;
  assignedUser?: AssignToName;
  ccUsers?: AssignToName[];
  createdAt?: any;
  createdBy?: User;
  updatedAt?: any;
  updatedBy?: User;
  closedAt?: any;
  closedBy?: User;
}
export interface TicketKB {
  id: string;
  knowledge: KnowledgeBase;
}
