import Icon from '@base/assets/icons/svg-icons';
import { LabelValue } from '@base/types/app';

export const KEY_CUSTOMER_MERGE = 'merge';
export const KEY_CUSTOMER_EXPORT = 'export';
export const KEY_CUSTOMER_IMPORT = 'import';
export const KEY_CUSTOMER_CLONE = 'clone';
export const KEY_CUSTOMER_EMPTY = 'empty';
export const KEY_CUSTOMER_MARKETING_PREFERENCES = 'marketing_preferences';

export const CATEGORY_OPTIONS = {
  all: 'Recent customers',
  account: 'Recent accounts',
  contact: 'Recent contacts'
};

export const CUSTOMER_ADD_OPTIONS: any = {
  account: {
    name: 'Account',
    icon: Icon('m_customer_account')
  },
  contact: {
    name: 'Contact',
    icon: Icon('contacts')
  }
};

//api values
export const CUSTOMER_CATEGORY_NONE = 'none';
export const CUSTOMER_CATEGORY_MASTER = 'master';
export const CUSTOMER_CATEGORY_ALL = 'all';
export const CUSTOMER_CATEGORY_BLOCK_LIST = 'block_list';
export const CUSTOMER_CATEGORY_MARKETING_LIST = 'marketing_list';
export const CUSTOMER_CATEGORY_ACCOUNT = 'account'; //1
export const CUSTOMER_CATEGORY_CONTACT = 'contact'; //2
export const CUSTOMER_CATEGORY_EMPLOYEE = 'employee'; //3
export const CUSTOMER_CATEGORY_SUBSIDIARY = 'subsidiary'; //4

export const CUSTOMER_CATEGORY_ACCOUNT_NUM = 1; //1
export const CUSTOMER_CATEGORY_CONTACT_NUM = 2; //2

export const CUSTOMER_TYPE_NONE = 'none'; //0
export const CUSTOMER_TYPE_CUSTOMER = 'customer'; //1
export const CUSTOMER_TYPE_POTENTIAL = 'potential'; //2
export const CUSTOMER_TYPE_SALES_AGENT = 'sales_agent'; //3
export const CUSTOMER_TYPE_VENDOR = 'vendor'; //4
export const CUSTOMER_TYPE_PARTNER = 'partner'; //5

export const CUSTOMER_STATE_NONE = 'none';
export const CUSTOMER_STATE_GENERAL = 'general';
export const CUSTOMER_STATE_FAILED = 'failed';
export const CUSTOMER_STATE_HOLD = 'hold';
export const CUSTOMER_STATE_TERMINATED = 'terminated';

// export const CUSTOMER_RANKING_NONE = 0;
// export const CUSTOMER_RANKING_GOLD = 1;
// export const CUSTOMER_RANKING_SILVER = 2;
// export const CUSTOMER_RANKING_COPPER = 3;

export const CUSTOMER_CONTACT_TYPE_NONE = 'none';
export const CUSTOMER_CONTACT_TYPE_EMPLOYEE = 'employee';
export const CUSTOMER_CONTACT_TYPE_INFLUENCER = 'influencer';
export const CUSTOMER_CONTACT_TYPE_CHAMPION = 'champion';
export const CUSTOMER_CONTACT_TYPE_BUDGET_HOLDER = 'budget_holder';
export const CUSTOMER_CONTACT_TYPE_DECISION_MAKER = 'decision_maker';
export const CUSTOMER_CONTACT_TYPE_END_USER = 'end_user';

//options mapping keyName and enum string
export const CUSTOMER_CATEGORY_ENUM = {
  [CUSTOMER_CATEGORY_NONE]: 'CATEGORY_NONE',
  [CUSTOMER_CATEGORY_ACCOUNT]: 'CATEGORY_ACCOUNT',
  [CUSTOMER_CATEGORY_CONTACT]: 'CATEGORY_CONTACT',
  [CUSTOMER_CATEGORY_BLOCK_LIST]: 'CATEGORY_BLOCK_LIST',
  [CUSTOMER_CATEGORY_MARKETING_LIST]: 'CATEGORY_MARKETING_LIST',
  [CUSTOMER_CATEGORY_EMPLOYEE]: 'CATEGORY_EMPLOYEE',
  [CUSTOMER_CATEGORY_SUBSIDIARY]: 'CATEGORY_SUBSIDIARY'
};

export const CUSTOMER_TYPES = {
  [CUSTOMER_TYPE_NONE]: 'TYPE_NONE',
  [CUSTOMER_TYPE_CUSTOMER]: 'TYPE_CUSTOMER',
  [CUSTOMER_TYPE_POTENTIAL]: 'TYPE_POTENTIAL',
  [CUSTOMER_TYPE_SALES_AGENT]: 'TYPE_SALES_AGENT',
  [CUSTOMER_TYPE_VENDOR]: 'TYPE_VENDOR',
  [CUSTOMER_TYPE_PARTNER]: 'TYPE_PARTNER'
};

export const CUSTOMER_TYPE_ENUM: any = {
  TYPE_NONE: 0,
  TYPE_CUSTOMER: 1,
  TYPE_POTENTIAL: 2,
  TYPE_SALES_AGENT: 3,
  TYPE_VENDOR: 4,
  TYPE_PARTNER: 5
};

export const CUSTOMER_CONTACT_TYPE_ENUM: any = {
  CONTACT_TYPE_NONE: 0,
  CONTACT_TYPE_EMPLOYEE: 1,
  CONTACT_TYPE_INFLUENCER: 2,
  CONTACT_TYPE_CHAMPION: 3,
  CONTACT_TYPE_BUDGET_HOLDER: 4,
  CONTACT_TYPE_DECISION_MAKER: 5,
  CONTACT_TYPE_END_USER: 6
};

// export const CUSTOMER_STATES = {
//     [CUSTOMER_STATE_NONE]: 'STATE_NONE',
//     [CUSTOMER_STATE_GENERAL]: 'STATE_GENERAL',
//     [CUSTOMER_STATE_FAILED]: 'STATE_FAILED',
//     [CUSTOMER_STATE_HOLD]: 'STATE_HOLD',
//     [CUSTOMER_STATE_TERMINATED]: 'STATE_TERMINATED',
// }

export const SEND_MODE_OPTIONS = [
  {
    label: 'Email',
    value: 'SEND_MODE_EMAIL'
  },
  {
    label: 'SMS',
    value: 'SEND_MODE_SMS'
  }
];

//receipt types
//Non Tax Invoice,Tax Invoice, Cash Receipt, Simple Receipt, Credit Card Sales Slips
export const RECEIPT_TYPE_NONE = 'RECEIPT_TYPE_NONE';
export const RECEIPT_TYPE_NONE_TAX_INVOICE = 'RECEIPT_TYPE_NONE_TAX_INVOICE';
export const RECEIPT_TYPE_TAX_INVOICE = 'RECEIPT_TYPE_TAX_INVOICE';
export const RECEIPT_TYPE_CASH_RECEIPT = 'RECEIPT_TYPE_CASH_RECEIPT';
export const RECEIPT_TYPE_SIMPLE_RECEIPT = 'RECEIPT_TYPE_SIMPLE_RECEIPT';
export const RECEIPT_TYPE_CC_SALES_SLIP = 'RECEIPT_TYPE_CC_SALES_SLIP';

export const RECEIPT_TYPE_OPTIONS = [
  {
    label: 'Non Tax Invoice',
    value: RECEIPT_TYPE_NONE_TAX_INVOICE
  },
  {
    label: 'Tax Invoice',
    value: RECEIPT_TYPE_TAX_INVOICE
  },
  {
    label: 'Cash Receipt',
    value: RECEIPT_TYPE_CASH_RECEIPT
  },
  {
    label: 'Simple Receipt',
    value: RECEIPT_TYPE_SIMPLE_RECEIPT
  },
  {
    label: 'Credit Card Sales Slips',
    value: RECEIPT_TYPE_CC_SALES_SLIP
  }
];

export const CUSTOMER_GENDER_OPTIONS = [
  {
    languageKey: 'Male',
    keyName: 'GENDER_MALE'
  },
  {
    languageKey: 'Female',
    keyName: 'GENDER_FEMALE'
  }
];

// ---------------------marketing----------------------
// fake options

export const MARKETING_TYPE_STATIC = 'MARKETING_TYPE_STATIC';
export const MARKETING_TYPE_UPDATE_AUTOMATICALLY = 'MARKETING_TYPE_UPDATE_AUTOMATICALLY';
export const MARKETING_TYPE_EMAIL_SENT = 'MARKETING_TYPE_EMAIL_SENT';
export const MARKETING_TYPE_SMS_SENT = 'MARKETING_TYPE_SMS_SENT';

export const MARKETING_TYPE_OPTIONS: LabelValue[] = [
  {
    label: 'static',
    value: 'MARKETING_TYPE_STATIC'
  },
  {
    label: 'Update Automatically',
    value: 'MARKETING_TYPE_UPDATE_AUTOMATICALLY'
  },
  {
    label: 'Email sent',
    value: 'MARKETING_TYPE_EMAIL_SENT'
  },
  {
    label: 'SMS Sent',
    value: 'MARKETING_TYPE_SMS_SENT'
  }
];

export const MARKETING_STATUS_ACTIVE = 'Active';
export const MARKETING_STATUS_DISABLE = 'DISABLE';

export const MARKETING_STATUS_OPTIONS: any[] = [
  {
    label: 'Active',
    value: true
  },
  {
    label: 'Disable',
    value: false
  }
];
