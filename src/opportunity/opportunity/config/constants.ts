import Icon from '@base/assets/icons/svg-icons';
import { LabelValue, LabelValueIcon } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import * as keyNames from '@opportunity/config/keyNames';

export const OPPORTUNITY_TYPE_NEW_CUSTOMER = 'TYPE_NEW_CUSTOMER';
export const OPPORTUNITY_TYPE_EXISTING_CUSTOMER = 'TYPE_EXISTING_CUSTOMER';
export const OPPORTUNITY_TYPE_WIN_CUSTOMER = 'TYPE_WIN_BACK';

export const OPPORTUNITY_CLOSE_TYPE_HOLD = 'CLOSE_TYPE_HOLD';
export const OPPORTUNITY_CLOSE_TYPE_LOST = 'CLOSE_TYPE_LOST';

export const OPPORTUNITY_TIME_FRAME_THIS_QUARTER = 'TIME_FRAME_THIS_QUARTER';
export const OPPORTUNITY_TIME_FRAME_NEXT_QUARTER = 'TIME_FRAME_NEXT_QUARTER';
export const OPPORTUNITY_TIME_FRAME_THIS_YEAR = 'TIME_FRAME_THIS_YEAR';
export const OPPORTUNITY_TIME_FRAME_UNKNOWN = 'TIME_FRAME_UNKNOWN';

export const OPPORTUNITY_TYPES: OptionValue[] = [
  { languageKey: 'New Customer', keyName: OPPORTUNITY_TYPE_NEW_CUSTOMER },
  { languageKey: 'Existing Customer', keyName: OPPORTUNITY_TYPE_EXISTING_CUSTOMER },
  { languageKey: 'Win Back', keyName: OPPORTUNITY_TYPE_WIN_CUSTOMER }
];

export const OPPORTUNITY_TOOLBAR_MORE_OPTIONS: LabelValueIcon[] = [
  {
    label: 'Import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'Export',
    value: 'export',
    icon: Icon('download')
  },
  {
    label: 'Sales Preferences',
    value: 'sales_setting',
    icon: Icon('column_settings')
  }
];

//delete groupby
export const OPPORTUNITY_DELTED_OPTIONS: LabelValueIcon[] = [
  {
    label: 'Import',
    value: 'import',
    icon: Icon('upload_cloud')
  },
  {
    label: 'Export',
    value: 'export',
    icon: Icon('download')
  },
  {
    label: 'ncrm_common_btn_empty_all',
    value: 'empty',
    icon: Icon('empty')
  }
];

// opportunity type
export const OPP_TYPES: LabelValue[] = [
  { label: 'New Customer', value: OPPORTUNITY_TYPE_NEW_CUSTOMER },
  { label: 'Existing Customer', value: OPPORTUNITY_TYPE_EXISTING_CUSTOMER },
  { label: 'Win Back', value: OPPORTUNITY_TYPE_WIN_CUSTOMER }
];
export const CUST_TYPES: LabelValue[] = [
  { label: 'Create Account', value: CUSTOMER_CATEGORY_ACCOUNT },
  { label: 'Create Contact', value: CUSTOMER_CATEGORY_CONTACT }
];

// decision maker

export const DECISION_MAKER_INDIVIDUAL = 'DECISION_MAKER_INDIVIDUAL';
export const DECISION_MAKER_COMMITTEE = 'DECISION_MAKER_COMMITTEE';

export const DECISION_MAKER_OPTIONS: OptionValue[] = [
  { keyName: DECISION_MAKER_INDIVIDUAL, languageKey: 'individual' },
  { keyName: DECISION_MAKER_COMMITTEE, languageKey: 'committee' }
];

export const TIME_FRAME_THIS_QUARTER = 'TIME_FRAME_THIS_QUARTER';
export const TIME_FRAME_NEXT_QUARTER = 'TIME_FRAME_NEXT_QUARTER';
export const TIME_FRAME_THIS_YEAR = 'TIME_FRAME_THIS_YEAR';
export const TIME_FRAME_UNKNOWN = 'TIME_FRAME_UNKNOWN';

export const TIME_FRAME_OPTIONS: OptionValue[] = [
  { keyName: TIME_FRAME_THIS_QUARTER, languageKey: 'This quater' },
  { keyName: TIME_FRAME_NEXT_QUARTER, languageKey: 'Next quater' },
  { keyName: TIME_FRAME_THIS_YEAR, languageKey: 'This year' },
  { keyName: TIME_FRAME_UNKNOWN, languageKey: 'Unknown' }
];

export const CONTACT_METHOD_STATUS_ALLOW = 'STATUS_ALLOW';
export const CONTACT_METHOD_STATUS_DENY = 'STATUS_DENY';

export const CONTACT_METHOD_STATUS_OPTIONS: OptionValue[] = [
  { keyName: CONTACT_METHOD_STATUS_ALLOW, languageKey: 'Allow' },
  { keyName: CONTACT_METHOD_STATUS_DENY, languageKey: 'Deny' }
];

// close type
export const CLOSE_TYPE_HOLD = 'CLOSE_TYPE_HOLD';
export const CLOSE_TYPE_LOST = 'CLOSE_TYPE_LOST';
export const CLOSE_TYPE_NONE = 'CLOSE_TYPE_NONE';

export const CLOSE_TYPE_OPTIONS: OptionValue[] = [
  { keyName: CLOSE_TYPE_HOLD, languageKey: 'Hold' },
  { keyName: CLOSE_TYPE_LOST, languageKey: 'Lost' }
];

//file type
export const FILE_TYPE_CTA = 'TYPE_CTA';
export const FILE_TYPE_LANDING_PAGE = 'TYPE_LANDING_PAGE';
export const FILE_TYPE_NONE = 'TYPE_NONE';

// perception analysis  type
// TYPE_USER; TYPE_ACCOUNT; TYPE_CONTACT;
export const ANALYSIS_TYPE_USER = 'TYPE_USER';
export const ANALYSIS_TYPE_ACCOUNT = 'TYPE_ACCOUNT';
export const ANALYSIS_TYPE_CONTACT = 'TYPE_CONTACT';

export const ANALYSIS_TYPE_OPTIONS: OptionValue[] = [
  { keyName: ANALYSIS_TYPE_USER, languageKey: 'User' },
  { keyName: ANALYSIS_TYPE_ACCOUNT, languageKey: 'Account' },
  { keyName: ANALYSIS_TYPE_CONTACT, languageKey: 'Contact' }
];

// SALES_REP_TYPE_USER; SALES_REP_TYPE_TEAM;
export const SALES_REP_TYPE_USER = 'SALES_REP_TYPE_USER';
export const SALES_REP_TYPE_TEAM = 'SALES_REP_TYPE_TEAM';

export const SALES_REP_TYPE_OPTIONS: OptionValue[] = [
  { keyName: SALES_REP_TYPE_USER, languageKey: 'Sales Person' },
  { keyName: SALES_REP_TYPE_TEAM, languageKey: 'Sales Team' }
];
