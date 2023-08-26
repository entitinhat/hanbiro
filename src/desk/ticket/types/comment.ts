import { UserOrCustomer } from '@activity/types/activity';
import { IdName } from '@base/types/common';
import { User } from '@base/types/user';
import { ChipProps } from '@mui/material';
import { Ticket } from './ticket';

export type CommentType = 'TC_TYPE_NONE' | 'TC_TYPE_COMMENT' | 'TC_TYPE_EMAIL' | 'TC_TYPE_SMS' | 'TC_TYPE_CALL' | 'TC_TYPE_FAX';
export enum CommentKind {
  NONE = 'KIND_NONE',
  COMMENT = 'KIND_COMMENT',
  REPLY = 'KIND_REPLY',
  FORWARD = 'KIND_FORWARD'
}
interface ColorNameIcon {
  color: ChipProps['color'];
  name: string;
  icon?: string;
  textColor?: string; // text color of chip
  backgroundColor?: string; // background color of chip
}

export interface ColorNameIconConfig {
  [x: string]: ColorNameIcon;
}

// Interface for Reply Form
export interface CommentTicket {
  attachedFiles?: any;
  content: string;
  display: string;
}

export interface EmailTicket {
  subject: string;
  to: UserOrCustomer[];
  from: UserOrCustomer[];
  cc?: UserOrCustomer[];
  content: string;
  tpl: IdName;
  attachedFiles?: any;
  sendStatus: string;
}

export interface SMSTicket extends EmailTicket {}
export interface TicketComment {
  id: string;
  ticket: Ticket;
  kind: CommentKind;
  parent?: any;
  comment: CommentTicket;
  email: EmailTicket;
  sms: SMSTicket;
  createdAt: string;
  createdBy: User;
}
