import Icon from '@base/assets/icons/svg-icons';
import * as keyNames from '@activity/config/keyNames';

import { LabelValue, SignatureIndex } from '@base/types/app';
import _ from 'lodash';

export const ACTIVITY_TASK_TYPE_NONE = 'TASK_TYPE_NONE';
export const ACTIVITY_TASK_TYPE_MANUAL = 'TASK_TYPE_MANUAL';
export const ACTIVITY_TASK_TYPE_CHECKLIST = 'TASK_TYPE_CHECKLIST';
export const ACTIVITY_TASK_TYPE_SEQUENCE = 'TASK_TYPE_SEQUENCE';

export const ACTIVITY_STATUS_TODO = 'STATUS_TODO';
export const ACTIVITY_STATUS_DOING = 'STATUS_DOING';
export const ACTIVITY_STATUS_HOLID = 'STATUS_HOLD';
export const ACTIVITY_STATUS_DONE = 'STATUS_DONE';
export const ACTIVITY_STATUS_CANCEL = 'STATUS_CANCEL';

export const ACTIVITY_TYPE_TASK = 'TYPE_TASK';
export const ACTIVITY_TYPE_CALL = 'TYPE_CALL';
export const ACTIVITY_TYPE_MAIL = 'TYPE_MAIL';
export const ACTIVITY_TYPE_SMS = 'TYPE_SMS';
export const ACTIVITY_TYPE_PROCESS = 'TYPE_PROCESS';

export const ACTIVITY_CALL_TYPE_LOG = 'CALL_TYPE_LOG';
export const ACTIVITY_CALL_TYPE_SCHEDULE = 'CALL_TYPE_SCHEDULE';
export const ACTIVITY_CALL_TYPE_NONE = 'CALL_TYPE_NONE';

export const ACTIVITY_DIRECTION_IN = 'DIRECTION_IN';
export const ACTIVITY_DIRECTION_OUT = 'DIRECTION_OUT';

export const ACTIVITY_SEND_TYPE_NOW = 'SEND_TYPE_NOW';
export const ACTIVITY_SEND_TYPE_LATER = 'SEND_TYPE_LATER';

export const ACTIVITY_SMS_TYPE_SMS = 'SMS_TYPE_SMS';
export const ACTIVITY_SMS_TYPE_LMS = 'SMS_TYPE_LMS';

export const ACTIVITY_VIEW_PAGE_SIZE = 15;

interface ActivityIndex {
  [key: string]: any;
}

export const ACTIVITY_MENU_DEFAULT = 'master';
export const ACTIVITY_MENU_TASK = 'task';
export const ACTIVITY_MENU_CALL = 'call';
export const ACTIVITY_MENU_EMAIL = 'email';
export const ACTIVITY_MENU_SMS = 'sms';
export const ACTIVITY_MENU_TICKET = 'ticket';

export const ACTIVITY_ICONS: ActivityIndex = {
  [ACTIVITY_TYPE_TASK]: Icon(ACTIVITY_MENU_TASK),
  [ACTIVITY_TYPE_CALL]: Icon(ACTIVITY_MENU_CALL),
  [ACTIVITY_TYPE_MAIL]: Icon(ACTIVITY_MENU_EMAIL),
  [ACTIVITY_TYPE_SMS]: Icon(ACTIVITY_MENU_SMS)
};

export const ACTIVITY_MENU_KEYS: ActivityIndex = {
  [ACTIVITY_TYPE_TASK]: ACTIVITY_MENU_TASK,
  [ACTIVITY_TYPE_CALL]: ACTIVITY_MENU_CALL,
  [ACTIVITY_TYPE_MAIL]: ACTIVITY_MENU_EMAIL,
  [ACTIVITY_TYPE_SMS]: ACTIVITY_MENU_SMS
};

export const ACTIVITY_MENU_PROTO: ActivityIndex = {
  [ACTIVITY_MENU_TASK]: ACTIVITY_TYPE_TASK,
  [ACTIVITY_MENU_CALL]: ACTIVITY_TYPE_CALL,
  [ACTIVITY_MENU_EMAIL]: ACTIVITY_TYPE_MAIL,
  [ACTIVITY_MENU_SMS]: ACTIVITY_TYPE_SMS
};

export const ACTIVITY_VIEW_FIELDS_ORDER = [
  keyNames.KEY_NAME_ACTIVITY_TASK_TYPE,
  keyNames.KEY_NAME_ACTIVITY_CALL_TYPE,
  keyNames.KEY_NAME_ACTIVITY_SEND_TYPE,
  keyNames.KEY_NAME_ACTIVITY_DIRECTION,
  keyNames.KEY_NAME_ACTIVITY_TO,
  keyNames.KEY_NAME_ACTIVITY_STATUS,
  keyNames.KEY_NAME_ACTIVITY_START_TIME,
  keyNames.KEY_NAME_ACTIVITY_DUE_DATE,
  keyNames.KEY_NAME_ACTIVITY_EDURATION,
  keyNames.KEY_NAME_ACTIVITY_END_TIME,
  keyNames.KEY_NAME_ACTIVITY_DURATION,
  // keyNames.KEY_NAME_ACTIVITY_ASSIGN_TO,

  keyNames.KEY_NAME_ACTIVITY_FROM,

  keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
  keyNames.KEY_NAME_ACTIVITY_PRIORITY,
  keyNames.KEY_NAME_ACTIVITY_PURPOSE,
  keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
  keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
  keyNames.KEY_NAME_ACTIVITY_TASK_KNOWLEDGE,
  keyNames.KEY_NAME_ACTIVITY_REPEAT,
  keyNames.KEY_NAME_ACTIVITY_TPL,
  keyNames.KEY_NAME_ACTIVITY_TAGS,
  keyNames.KEY_NAME_ACTIVITY_DESCRIPTION
];
export const ACTIVITY_VIEW_FIELDS_EMAIL_ORDER = [
  keyNames.KEY_NAME_ACTIVITY_TASK_TYPE,
  keyNames.KEY_NAME_ACTIVITY_CALL_TYPE,
  keyNames.KEY_NAME_ACTIVITY_SEND_TYPE,
  keyNames.KEY_NAME_ACTIVITY_DIRECTION,
  keyNames.KEY_NAME_ACTIVITY_FROM,
  keyNames.KEY_NAME_ACTIVITY_TO,
  keyNames.KEY_NAME_ACTIVITY_STATUS,
  keyNames.KEY_NAME_ACTIVITY_START_TIME,
  keyNames.KEY_NAME_ACTIVITY_DUE_DATE,
  keyNames.KEY_NAME_ACTIVITY_EDURATION,
  keyNames.KEY_NAME_ACTIVITY_END_TIME,
  keyNames.KEY_NAME_ACTIVITY_DURATION,
  keyNames.KEY_NAME_ACTIVITY_ASSIGN_TO,

  keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
  keyNames.KEY_NAME_ACTIVITY_PRIORITY,
  keyNames.KEY_NAME_ACTIVITY_PURPOSE,
  keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
  keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
  keyNames.KEY_NAME_ACTIVITY_TASK_KNOWLEDGE,
  keyNames.KEY_NAME_ACTIVITY_REPEAT,
  keyNames.KEY_NAME_ACTIVITY_TPL,
  keyNames.KEY_NAME_ACTIVITY_TAGS,
  keyNames.KEY_NAME_ACTIVITY_DESCRIPTION
];
export const ACTIVITY_VIEW_FIELDS_CALL_ORDER = [
  keyNames.KEY_NAME_ACTIVITY_CALL_TYPE,
  keyNames.KEY_NAME_ACTIVITY_DIRECTION,
  keyNames.KEY_NAME_ACTIVITY_TO,
  keyNames.KEY_NAME_ACTIVITY_STATUS,
  keyNames.KEY_NAME_ACTIVITY_START_TIME,
  // keyNames.KEY_NAME_ACTIVITY_DUE_DATE,
  // keyNames.KEY_NAME_ACTIVITY_EDURATION,
  // keyNames.KEY_NAME_ACTIVITY_END_TIME,
  keyNames.KEY_NAME_ACTIVITY_DURATION,
  keyNames.KEY_NAME_ACTIVITY_FROM,

  keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
  keyNames.KEY_NAME_ACTIVITY_PRIORITY,
  keyNames.KEY_NAME_ACTIVITY_PURPOSE,
  keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
  keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
  // keyNames.KEY_NAME_ACTIVITY_TASK_KNOWLEDGE,
  keyNames.KEY_NAME_ACTIVITY_REPEAT,
  keyNames.KEY_NAME_ACTIVITY_TPL,
  keyNames.KEY_NAME_ACTIVITY_TAGS,
  keyNames.KEY_NAME_ACTIVITY_DESCRIPTION
];
export const ACTIVITY_VIEW_FIELDS_SMS_ORDER = [
  keyNames.KEY_NAME_ACTIVITY_TASK_TYPE,
  keyNames.KEY_NAME_ACTIVITY_CALL_TYPE,
  keyNames.KEY_NAME_ACTIVITY_SEND_TYPE,
  keyNames.KEY_NAME_ACTIVITY_DIRECTION,
  keyNames.KEY_NAME_ACTIVITY_FROM,
  keyNames.KEY_NAME_ACTIVITY_TO,
  keyNames.KEY_NAME_ACTIVITY_STATUS,
  keyNames.KEY_NAME_ACTIVITY_START_TIME,
  keyNames.KEY_NAME_ACTIVITY_DUE_DATE,
  keyNames.KEY_NAME_ACTIVITY_EDURATION,
  keyNames.KEY_NAME_ACTIVITY_END_TIME,
  keyNames.KEY_NAME_ACTIVITY_DURATION,
  keyNames.KEY_NAME_ACTIVITY_ASSIGN_TO,

  keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
  keyNames.KEY_NAME_ACTIVITY_PRIORITY,
  keyNames.KEY_NAME_ACTIVITY_PURPOSE,
  keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
  keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
  keyNames.KEY_NAME_ACTIVITY_TASK_KNOWLEDGE,
  keyNames.KEY_NAME_ACTIVITY_REPEAT,
  keyNames.KEY_NAME_ACTIVITY_TPL,
  keyNames.KEY_NAME_ACTIVITY_TAGS,
  keyNames.KEY_NAME_ACTIVITY_DESCRIPTION
];
export const StatusFields = (props: SignatureIndex) => [
  {
    label: props.todo,
    value: ACTIVITY_STATUS_TODO
  },
  {
    label: props.doing,
    value: ACTIVITY_STATUS_DOING
  },
  {
    label: props.hold,
    value: ACTIVITY_STATUS_HOLID
  },
  {
    label: props.done,
    value: ACTIVITY_STATUS_DONE
  },
  {
    label: props.cancel,
    value: ACTIVITY_STATUS_CANCEL
  }
];

export const ActivityTypesOptions: LabelValue[] = [
  {
    label: 'ncrm_activity_call',
    value: ACTIVITY_TYPE_CALL
  },
  {
    label: 'ncrm_activity_task',
    value: ACTIVITY_TYPE_TASK
  },
  {
    label: 'ncrm_activity_email',
    value: ACTIVITY_TYPE_MAIL
  },
  {
    label: 'ncrm_activity_sms',
    value: ACTIVITY_TYPE_SMS
  }
];

export const ActivityDirectionOptions: LabelValue[] = [
  {
    label: 'ncrm_activity_incoming',
    value: ACTIVITY_DIRECTION_IN
  },
  {
    label: 'ncrm_activity_outgoing',
    value: ACTIVITY_DIRECTION_OUT
  }
];

export const ActivityTaskTypeOptions: LabelValue[] = [
  {
    label: 'ncrm_activity_manual',
    value: ACTIVITY_TASK_TYPE_MANUAL
  },
  {
    label: 'ncrm_activity_checklist',
    value: ACTIVITY_TASK_TYPE_CHECKLIST
  },
  {
    label: 'ncrm_activity_sequence',
    value: ACTIVITY_TASK_TYPE_SEQUENCE
  }
];

export const ActivityStatusOptions: LabelValue[] = [
  {
    label: 'Todo',
    value: ACTIVITY_STATUS_TODO
  },
  {
    label: 'Doing',
    value: ACTIVITY_STATUS_DOING
  },
  {
    label: 'Hold',
    value: ACTIVITY_STATUS_HOLID
  },
  {
    label: 'Done',
    value: ACTIVITY_STATUS_DONE
  }
];

export const ActivityCallTypeOptions: LabelValue[] = [
  {
    label: 'ncrm_activity_call_log',
    value: ACTIVITY_CALL_TYPE_LOG
  },
  {
    label: 'ncrm_activity_scheduled_call',
    value: ACTIVITY_CALL_TYPE_SCHEDULE
  }
];

export const ActivitySendTypeOptions: LabelValue[] = [
  {
    label: 'ncrm_activity_send_now',
    value: ACTIVITY_SEND_TYPE_NOW
  },
  {
    label: 'ncrm_activity_send_later',
    value: ACTIVITY_SEND_TYPE_LATER
  }
];

export const ActivitySmsTypeOptions: LabelValue[] = [
  {
    label: 'SMS',
    value: ACTIVITY_SMS_TYPE_SMS
  },
  {
    label: 'LMS',
    value: ACTIVITY_SMS_TYPE_LMS
  }
];

export const defaultReDay = 'nnnnnn';
export const lastDay = 'l';
export const months: LabelValue[] = [
  {
    value: 1,
    label: 'ncrm_common_january'
  },
  {
    value: 2,
    label: 'ncrm_common_february'
  },
  {
    value: 3,
    label: 'ncrm_common_march'
  },
  {
    value: 4,
    label: 'ncrm_common_april'
  },
  {
    value: 5,
    label: 'ncrm_common_may'
  },
  {
    value: 6,
    label: 'ncrm_common_june'
  },
  {
    value: 7,
    label: 'ncrm_common_july'
  },
  {
    value: 8,
    label: 'ncrm_common_august'
  },
  {
    value: 9,
    label: 'ncrm_common_september'
  },
  {
    value: 10,
    label: 'ncrm_common_october'
  },
  {
    value: 11,
    label: 'ncrm_common_november'
  },
  {
    value: 12,
    label: 'ncrm_common_december'
  }
];
export const MONTHS: LabelValue[] = [
  {
    value: 1,
    label: 'ncrm_common_january'
  },
  {
    value: 2,
    label: 'ncrm_common_february'
  },
  {
    value: 3,
    label: 'ncrm_common_march'
  },
  {
    value: 4,
    label: 'ncrm_common_april'
  },
  {
    value: 5,
    label: 'ncrm_common_may'
  },
  {
    value: 6,
    label: 'ncrm_common_june'
  },
  {
    value: 7,
    label: 'ncrm_common_july'
  },
  {
    value: 8,
    label: 'ncrm_common_august'
  },
  {
    value: 9,
    label: 'ncrm_common_september'
  },
  {
    value: 10,
    label: 'ncrm_common_october'
  },
  {
    value: 11,
    label: 'ncrm_common_november'
  },
  {
    value: 12,
    label: 'ncrm_common_december'
  }
];

// export const every_type = {
//   hourly: 'h',
//   daily: 'd',
//   weekly: 'w',
//   monthly: 'm',
//   yearly: 'y',
// };

export const RECURRENCE_TYPE: { [index: string]: string } = {
  hourly: 'TYPE_HOURLY',
  daily: 'TYPE_DAILY',
  weekly: 'TYPE_WEEKLY',
  monthly: 'TYPE_MONTHLY',
  yearly: 'TYPE_YEARLY'
};

export const RECURRENCE_EVERY_TYPE: { [index: string]: string } = {
  day: 'EVERY_DAYS',
  week: 'EVERY_WEEKS',
  last: 'EVERY_LAST_DAY_OF_MONTH'
};

export const RECURRENCE_EVERY_TYPE_REVERSE: { [index: string]: string } = _.invert(RECURRENCE_EVERY_TYPE);

export const RECURRENCE_TYPE_LABEL: { [index: string]: string } = {
  [RECURRENCE_TYPE.monthly]: 'month(s)',
  [RECURRENCE_TYPE.yearly]: 'year(s)',
  [RECURRENCE_TYPE.weekly]: 'week(s)'
};

export const langRecurrence: { [index: string]: string } = {
  [RECURRENCE_TYPE.hourly]: 'hourly',
  [RECURRENCE_TYPE.daily]: 'daily',
  [RECURRENCE_TYPE.weekly]: 'weekly',
  [RECURRENCE_TYPE.monthly]: 'monthly',
  [RECURRENCE_TYPE.yearly]: 'yearly',
  mon: 'mon',
  tue: 'tue',
  wed: 'wed',
  thu: 'thu',
  fri: 'fri',
  sat: 'sat',
  sun: 'sun'
};

export const days: LabelValue[] = [
  {
    value: 1,
    label: langRecurrence.mon
  },
  {
    value: 2,
    label: langRecurrence.tue
  },
  {
    value: 3,
    label: langRecurrence.wed
  },
  {
    value: 4,
    label: langRecurrence.thu
  },
  {
    value: 5,
    label: langRecurrence.fri
  },
  {
    value: 6,
    label: langRecurrence.sat
  },
  {
    value: 0,
    label: langRecurrence.sun
  }
];

export const RECURRENCES: LabelValue[] = [
  {
    value: RECURRENCE_TYPE.hourly,
    label: langRecurrence[RECURRENCE_TYPE.hourly]
  },
  {
    value: RECURRENCE_TYPE.daily,
    label: langRecurrence[RECURRENCE_TYPE.daily]
  },
  {
    value: RECURRENCE_TYPE.weekly,
    label: langRecurrence[RECURRENCE_TYPE.weekly]
  },
  {
    value: RECURRENCE_TYPE.monthly,
    label: langRecurrence[RECURRENCE_TYPE.monthly]
  },
  {
    value: RECURRENCE_TYPE.yearly,
    label: langRecurrence[RECURRENCE_TYPE.yearly]
  }
];
