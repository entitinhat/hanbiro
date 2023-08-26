import Icon from '@base/assets/icons/svg-icons';
import { LabelValueIcon } from '@base/types/app';
import * as keyNames from '@campaign/config/keyNames';

export const CAMPAIGN_CATEGORY_ALL = 'all';
export const CAMPAIGN_CATEGORY_EMAIL = 'email';
export const CAMPAIGN_CATEGORY_SMS = 'sms';
export const CAMPAIGN_EXPORT = 'export';
export const CAMPAIGN_IMPORT = 'import';
export const CAMPAIGN_SETTING = 'setting';
export const CAMPAIGN_EMPTY = 'empty';
export const CAMPAIGN_PAGELAYOUT_ALL = 'campaign_all';
export const CAMPAIGN_PAGELAYOUT_EMAIL = 'campaign_email';
export const CAMPAIGN_PAGELAYOUT_SMS = 'campaign_sms';
export const CAMPAIGN_CATEGOTY_ENUM_EMAIL = 'CAMPAIGN_TYPE_EMAIL';
export const CAMPAIGN_CATEGOTY_ENUM_SMS = 'CAMPAIGN_TYPE_SMS';

export const CATEGORY_OPTIONS = {
  all: 'All Campaigns',
  email: 'Email Campaigns',
  sms: 'SMS Campaigns'
};

export const CAMPAIGN_ADD_OPTIONS: any = {
  email: {
    name: 'Email Campaign',
    icon: Icon('email')
  },
  sms: {
    name: 'SMS Campaign',
    icon: Icon('sms')
  }
};

export const CAMPAIGN_TOOLBAR_MORE_OPTIONS: LabelValueIcon[] = [
  {
    label: 'Import',
    value: CAMPAIGN_IMPORT,
    icon: Icon('upload_cloud')
  },
  {
    label: 'Export',
    value: CAMPAIGN_EXPORT,
    icon: Icon('download')
  },
  {
    label: 'Marketing  Preferences',
    value: CAMPAIGN_SETTING,
    icon: Icon('marketing')
  }
];

export const CAMPAIGN_MAIL_SEND_NONE = 'SEND_TYPE_NONE';
export const CAMPAIGN_MAIL_SEND_NOW = 'SEND_TYPE_NOW';
export const CAMPAIGN_MAIL_SCHEDULE = 'SEND_TYPE_SCHEDULE';

export const CAMPAIGN_SENDER_SINGLE = 'EMAILER_TYPE_SINGLE';
export const CAMPAIGN_SENDER_OWNER = 'EMAILER_TYPE_OWNER';

export const ACTIVITY_TYPE_OPTIONS = [
  { keyName: 'CAMPAIGN_TYPE_EMAIL', languageKey: 'Email' },
  { keyName: 'CAMPAIGN_TYPE_SMS', languageKey: 'SMS' }
];

export const OBJECTIVE_OPTIONS = [
  { keyName: '123', languageKey: 'Sales Promotion 1' },
  { keyName: '456', languageKey: 'Sales Promotion 2' }
];

export const SMS_TYPE_OPTIONS = [
  { value: 'SMS_TYPE_SMS', label: 'SMS' },
  { value: 'SMS_TYPE_LMS', label: 'LMS' },
  { value: 'SMS_TYPE_MMS', label: 'MMS' }
];

export const STEP_FIELDS = [
  [
    keyNames.KEY_CAMPAIGN_NAME,
    keyNames.KEY_CAMPAIGN_OBJECTIVE,
    keyNames.KEY_CAMPAIGN_ACTIVITY,
    keyNames.KEY_CAMPAIGN_PRODUCT,
    keyNames.KEY_CAMPAIGN_PROCESS,
    keyNames.KEY_CAMPAIGN_DESCRIPTION,
    keyNames.KEY_CAMPAIGN_ONWER
  ],
  [
    keyNames.KEY_CAMPAIGN_SCHEDULE_SEND,
    keyNames.KEY_CAMPAIGN_SENDER,
    keyNames.KEY_CAMPAIGN_REPLY_TRACKING,
    keyNames.KEY_CAMPAIGN_REPLY_TO,
    keyNames.KEY_CAMPAIGN_ATTACHMENT,
    keyNames.KEY_CAMPAIGN_FOOTER,
    keyNames.KEY_CAMPAIGN_EXPENSES,
    keyNames.KEY_CAMPAIGN_KPI,
    keyNames.KEY_CAMPAIGN_SMS_TYPE
  ],
  [keyNames.KEY_CAMPAIGN_SUBJECT, keyNames.KEY_CAMPAIGN_CONTENT]
];

export const SECTION_VIEW_FIELDS = [
  [
    keyNames.KEY_CAMPAIGN_NAME,
    keyNames.KEY_CAMPAIGN_OBJECTIVE,
    keyNames.KEY_CAMPAIGN_ACTIVITY,
    keyNames.KEY_CAMPAIGN_PRODUCT,
    keyNames.KEY_CAMPAIGN_PROCESS,
    keyNames.KEY_CAMPAIGN_DESCRIPTION,
    keyNames.KEY_CAMPAIGN_ONWER,
    keyNames.KEY_CAMPAIGN_LAUNCHED_ON
  ],
  [
    keyNames.KEY_CAMPAIGN_SCHEDULE_SEND,
    keyNames.KEY_CAMPAIGN_SENDER,
    keyNames.KEY_CAMPAIGN_REPLY_TRACKING,
    keyNames.KEY_CAMPAIGN_REPLY_TO,
    keyNames.KEY_CAMPAIGN_ATTACHMENT,
    keyNames.KEY_CAMPAIGN_FOOTER,
    keyNames.KEY_CAMPAIGN_EXPENSES,
    keyNames.KEY_CAMPAIGN_KPI,
    keyNames.KEY_CAMPAIGN_SMS_TYPE
  ],
  [keyNames.KEY_CAMPAIGN_SUBJECT, keyNames.KEY_CAMPAIGN_CONTENT]
];

export const CAMPAIGN_INTERACTION_OPEN = 'opened';
export const CAMPAIGN_INTERACTION_CLICK = 'clicked';
export const CAMPAIGN_INTERACTION_REPLY = 'replied';
export const CAMPAIGN_INTERACTION_BOUNCE = 'bounced';

export const INTERACTION_ACTIONS = [
  { keyName: CAMPAIGN_INTERACTION_OPEN, languageKey: 'Opened', color: 'success' },
  { keyName: CAMPAIGN_INTERACTION_CLICK, languageKey: 'Clicked', color: 'primary' },
  { keyName: CAMPAIGN_INTERACTION_REPLY, languageKey: 'Replied', color: 'error' },
  { keyName: CAMPAIGN_INTERACTION_BOUNCE, languageKey: 'Bounced', color: 'info' }
];
