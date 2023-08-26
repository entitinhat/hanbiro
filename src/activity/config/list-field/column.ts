import * as keyNames from '@activity/config/keyNames';

import {
  allCallColumn,
  allIncomingCallColumn,
  allMissedCallColumn,
  allOutgoingCallColumn,
  allScheduledCallColumn,
  allScheduleCallColumn,
  myCallColumn,
  myIncomingCallColumn,
  myMissedCallColumn,
  myOutgoingCallColumn,
  myScheduledCallColumn,
  myScheduleCallColumn
} from './call-column';
import {
  allEmailColumn,
  allReceiveEmailColumn,
  allScheduleEmailColumn,
  allSentEmailColumn,
  myEmailColumn,
  myReceiveEmailColumn,
  mySentEmailColumn
} from './mail-column';
import myScheduleEmailColumn from './mail-column/myScheduleEmailColumn';
import { myColumn, myGroupColumnType1, myGroupColumnType2, myGroupColumn } from './my-column';
import { allScheduleSmsColumn, allSmsColumn, mySmsColumn } from './sms-column';
import myScheduleSmsColumn from './sms-column/myScheduleSmsColumn';
import { allTaskColumn, myTaskColumn } from './task-column';
import { deleteColumn } from './delete-column';
import {
  ACTIVITY_STATUS_TODO,
  ACTIVITY_STATUS_DOING,
  ACTIVITY_STATUS_HOLID,
  ACTIVITY_STATUS_DONE,
  ACTIVITY_STATUS_CANCEL,
  ACTIVITY_TYPE_CALL,
  ACTIVITY_TYPE_MAIL,
  ACTIVITY_TYPE_PROCESS,
  ACTIVITY_TYPE_SMS,
  ACTIVITY_TYPE_TASK
} from '@activity/config/constants';
import { PRIORITY_HIGH, PRIORITY_LOW, PRIORITY_MEDIUM, PRIORITY_URGENT, PRIORITY_VERY_LOW } from '@base/config/constant';
import { ColorNameIconConfig } from '@activity/types/interface';

/*
dataType: "activity_type"
defaultViewInList: true
hidden: false
id: "24886442-767b-460a-9774-7e79309c3f16"
isDefault: true
keyName: "type"
languageKey: "activity_activity_field_basic_type"
name: "type"
order: 0
orderInList: 0
orderInView: 0
orderInWrite: 0
permissionType: "basic_fixed"
showInList: true
showInView: false
showInWrite: true
title: "activity_activity_field_basic_type"
*/

export const listLayoutColumns: { [index: string]: any[] } = {
  my: myColumn,
  my_group: myGroupColumn,
  my_group_type_1: myGroupColumnType1,
  my_group_type_2: myGroupColumnType2,
  all_call: allCallColumn,
  all_missed_call: allMissedCallColumn,
  all_outgoing_call: allOutgoingCallColumn,
  all_scheduled_call: allScheduledCallColumn,
  all_incoming_call: allIncomingCallColumn,
  all_scheduled_calls: allScheduleCallColumn,
  all_emails: allEmailColumn,
  all_scheduled_emails: allScheduleEmailColumn,
  all_sent_emails: allSentEmailColumn,
  all_received_emails: allReceiveEmailColumn,
  all_sms: allSmsColumn,
  all_scheduled_sms: allScheduleSmsColumn,
  all_tasks: allTaskColumn,
  all_scheduled_tasks: allTaskColumn,
  my_calls: myCallColumn,
  my_missed_call: myMissedCallColumn,
  my_outgoing_call: myOutgoingCallColumn,
  my_scheduled_call: myScheduledCallColumn,
  my_incoming_call: myIncomingCallColumn,
  my_scheduled_calls: myScheduleCallColumn,
  my_emails: myEmailColumn,
  my_scheduled_emails: myScheduleEmailColumn,
  my_sent_emails: mySentEmailColumn,
  my_received_emails: myReceiveEmailColumn,
  my_sms: mySmsColumn,
  my_scheduled_sms: myScheduleSmsColumn,
  my_tasks: myTaskColumn,
  deletedActivity: deleteColumn
};

export const configFields = {
  [keyNames.KEY_NAME_ACTIVITY_SUBJECT]: {
    schema: `
      subject
      source {
        id
        menu
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_FROM]: {
    schema: `
      from {
        type
        id
        name
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_CREATED_BY]: {
    schema: `
      createdBy {
        id
        name
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_TO]: {
    schema: `
      to {
        type
        id
        name
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_DATE]: {
    schema: `
      startTime  
      endTime
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_DURATION]: {
    schema: `
      duration {
        time
        unit
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_EDURATION]: {
    schema: `
      eduration {
        time
        unit
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_PRIORITY]: {
    schema: `
      priority {
        id
        keyName
        languageKey
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_PURPOSE]: {
    schema: `
      purpose {
        id
        languageKey
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_CALL_RESULT]: {
    schema: `
      callResult {
        id
        languageKey
      }
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_RELATED_TO]: {
    schema: `
      relatedTo
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_PRODUCTS]: {
    schema: `
      products  
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_TASK_TYPE]: {
    schema: `
      taskType
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_STATUS]: {
    schema: `
      status
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_DUE_DATE]: {
    schema: `
      dueDate
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_CREATED_AT]: {
    schema: `
      createdAt
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_UPDATED_AT]: {
    schema: `
      updatedAt
    `
  },
  [keyNames.KEY_NAME_ACTIVITY_UPDATED_BY]: {
    schema: `
      updatedBy{
        id
        name
      }
    `
  }
};

export const typeConfigs: ColorNameIconConfig = {
  [ACTIVITY_TYPE_TASK]: {
    icon: 'task',
    color: 'primary',
    name: 'Task'
  },
  [ACTIVITY_TYPE_CALL]: {
    icon: 'call',
    color: 'info',
    name: 'Call'
  },
  [ACTIVITY_TYPE_MAIL]: {
    icon: 'email',
    color: 'success',
    name: 'Email'
  },
  [ACTIVITY_TYPE_SMS]: {
    icon: 'sms',
    color: 'secondary',
    name: 'Sms'
  },
  [ACTIVITY_TYPE_PROCESS]: {
    icon: 'manage_process',
    color: 'error',
    name: 'Process'
  }
};

export const priorityConfigs: ColorNameIconConfig = {
  [PRIORITY_URGENT]: {
    color: 'volcano',
    textColor: 'error.main',
    backgroundColor: 'error.lighter',
    name: 'Urgent'
  },
  [PRIORITY_HIGH]: {
    color: 'orange',
    textColor: 'warning.main',
    backgroundColor: 'warning.lighter',
    name: 'High'
  },
  [PRIORITY_MEDIUM]: {
    color: 'primary',
    textColor: 'primary.main',
    backgroundColor: 'primary.lighter',
    name: 'Medium'
  },
  [PRIORITY_LOW]: {
    color: 'success',
    textColor: 'success.main',
    backgroundColor: 'success.lighter',
    name: 'Low'
  }
};

export const statusConfigs: ColorNameIconConfig = {
  [ACTIVITY_STATUS_TODO]: {
    color: 'magenta',
    name: 'Todo'
  },
  [ACTIVITY_STATUS_DONE]: {
    color: 'success',
    name: 'Done'
  },
  [ACTIVITY_STATUS_DOING]: {
    color: 'info',
    name: 'Doing'
  },
  [ACTIVITY_STATUS_HOLID]: {
    color: 'warning',
    name: 'Hold'
  },
  [ACTIVITY_STATUS_CANCEL]: {
    color: 'error',
    name: 'Cancel'
  }
};
