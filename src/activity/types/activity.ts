import {
  ActivityCallType,
  ActivityDirection,
  ActivitySendType,
  ActivitySmsType,
  ActivityStatus,
  ActivityTaskType,
  ActivityType
} from '@activity/types/type';
import { Duration, IdKeyNameLanguageKey, IdLanguageKey, IdName } from '@base/types/common';
import { User } from '@base/types/user';
import { TaskChecklist, TaskSequence } from './task';

export interface RelatedTo {
  type: string;
  id: string;
  name: string;
}

export interface UserOrCustomer extends RelatedTo {
  phone?: string;
  email?: string;
  photo?: string;
  group?: string;
  label?: string;
  value?: string;
}

export interface Source {
  id: string;
  menu: string;
}

export interface ActivityBase {
  id: string;
  type: ActivityType;
  subject: string;
  source: Source;
}

export interface Repeat {
  use: boolean;
  type: string;
  startTime: string;
  endTime: string;
  everyNr: number;
  weekdays: string;
  //monthly
  monthlyOption: string; //or 'day', 'last'
  monthlyWeek: number;
  monthlyDay: number;
  //yearly
  yearlyOption: string; //or 'day'
  yearlyWeekMonth: number;
  yearlyDayMonth: number;
  yearlyWeek: number;
  yearlyDay: number;

  typeEnd: string;
  endAfterTimes: number;
  endOnTime: string;
}

export interface Activity extends ActivityBase {
  taskType: ActivityTaskType;
  status: ActivityStatus;
  content: string;
  description: string;
  // reminder?: ReminderState;
  repeat?: Repeat;
  tpl: IdName;
  direction: ActivityDirection;
  priority: IdKeyNameLanguageKey;
  startTime: Date;
  endTime: Date;
  duration: Duration;
  eduration: Duration;
  dueDate: Date;
  createdAt: Date;
  createdBy?: User;
  from: UserOrCustomer[];
  to: UserOrCustomer[];
  cc?: UserOrCustomer[];
  bcc?: UserOrCustomer[];
  products?: IdName[];
  purpose: IdLanguageKey;
  relatedTo: RelatedTo[];
  sendType: ActivitySendType;
  callType: ActivityCallType;
  callResult: IdLanguageKey;
  smsType: ActivitySmsType;
  smsIamge: string;
  tags: string[];
  taskChecklist?: TaskChecklist[];
  TaskSequence?: TaskSequence[];
  TaskKnowledge?: IdName[];
  isRead?: Boolean;
  updatedBy?: User;
}

export interface RelatedActivity extends ActivityBase {
  status: ActivityStatus;
}
