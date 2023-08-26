import Icon from '@base/assets/icons/svg-icons';
import { LabelValue } from '@base/types/app';
import { OptionValue } from '@base/types/common';

export const KEY_CUSTOMER_MERGE = 'merge';
export const KEY_CUSTOMER_EXPORT = 'export';
export const KEY_CUSTOMER_IMPORT = 'import';
export const KEY_CUSTOMER_CLONE = 'clone';
export const KEY_CUSTOMER_EMPTY = 'empty';
export const KEY_CUSTOMER_MARKETING_PREFERENCES = 'marketing_preferences';

//api values
export const CUSTOMER_CATEGORY_NONE = 'none';
export const CUSTOMER_CATEGORY_MASTER = 'master';
export const CUSTOMER_CATEGORY_ALL = 'all';
export const CUSTOMER_CATEGORY_BLOCK_LIST = 'block_list';
export const CUSTOMER_CATEGORY_MARKETING_LIST = 'marketing_list';
// export const CUSTOMER_CATEGORY_ACCOUNT = 'account'; //1
// export const CUSTOMER_CATEGORY_CONTACT = 'contact'; //2
// export const CUSTOMER_CATEGORY_EMPLOYEE = 'employee'; //3
// export const CUSTOMER_CATEGORY_SUBSIDIARY = 'subsidiary'; //4

//options mapping keyName and enum string
export const CUSTOMER_CATEGORY_ENUM = {
  [CUSTOMER_CATEGORY_NONE]: 'CATEGORY_NONE',
  [CUSTOMER_CATEGORY_BLOCK_LIST]: 'CATEGORY_BLOCK_LIST',
  [CUSTOMER_CATEGORY_MARKETING_LIST]: 'CATEGORY_MARKETING_LIST'
};

// ---------------------marketing----------------------
// fake options

export const MARKETING_TYPE_STATIC = 'MARKETING_TYPE_STATIC';
export const MARKETING_TYPE_UPDATE_AUTOMATICALLY = 'MARKETING_TYPE_UPDATE_AUTOMATICALLY';
export const MARKETING_TYPE_EMAIL_SENT = 'MARKETING_TYPE_EMAIL_SENT';
export const MARKETING_TYPE_SMS_SENT = 'MARKETING_TYPE_SMS_SENT';

export const MARKETING_TYPE_OPTIONS: OptionValue[] = [
  {
    languageKey: 'Static',
    keyName: 'MARKETING_STATIC'
  },
  {
    languageKey: 'Update Automatically',
    keyName: 'MARKETING_UPDATE_AUTOMATICALLY'
  },
  {
    languageKey: 'Email sent',
    keyName: 'MARKETING_EMAIL_SENT'
  },
  {
    languageKey: 'SMS Sent',
    keyName: 'MARKETING_SMS_SENT'
  }
];

export const MARKETING_STATUS_ACTIVE = 'Active';
export const MARKETING_STATUS_DISABLE = 'Disable';

export const MARKETING_STATUS_OPTIONS: OptionValue[] = [
  {
    languageKey: 'Active',
    keyName: 'Active',
    extra: true
  },
  {
    languageKey: 'Disable',
    keyName: 'Disable',
    extra: false
  }
];
