export type ActivityDirection = 'DIRECTION_IN' | 'DIRECTION_OUT';
export type ActivityTaskType = 'TASK_TYPE_MANUAL' | 'TASK_TYPE_CHECKLIST' | 'TASK_TYPE_SEQUENCE';
export type ActivityStatus = 'STATUS_DOING' | 'STATUS_HOLD' | 'STATUS_DONE' | 'STATUS_CANCEL';
export type ActivityType = 'TYPE_TASK' | 'TYPE_CALL' | 'TYPE_MAIL' | 'TYPE_SMS' | 'TYPE_PROCESS' | 'TYPE_TICKET';
export type ActivityCallType = 'CALL_TYPE_LOG' | 'CALL_TYPE_SCHEDULE';
export type ActivitySendType = 'SEND_TYPE_NOW' | 'SEND_TYPE_LATER';
export type ActivitySmsType = 'SMS_TYPE_SMS' | 'SMS_TYPE_LMS';
export type ActivityReminderNotify = 'NOTIFY_SMS' | 'NOTIFY_EMAIL' | 'NOTIFY_TEAMCHANNEL';

export type ReminderState = {
  use: boolean;
  notify: string;
  end: number;
};

export type PriorityOption = {
  priority: string;
  languageKey: string;
  isDefault?: boolean;
  active?: boolean;
};
