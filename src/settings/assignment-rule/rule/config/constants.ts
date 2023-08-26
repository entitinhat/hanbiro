import Icon from '@base/assets/icons/svg-icons';
import { LabelValueIcon, LabelValue } from '@base/types/app';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import { EAREntryCriteriaType } from '../types/enums';

export const REPLY_TYPE_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' }
];

export const TICKET_COMMENT_KIND_NEW = 'KIND_COMMENT';
export const TICKET_COMMENT_KIND_REPLY = 'KIND_REPLY';
export const TICKET_COMMENT_KIND_FORWARD = 'KIND_FORWARD';
export const TICKET_COMMENT_DISPLAY_PUBLIC = 'DISPLAY_PUBLIC';
export const TICKET_COMMENT_DISPLAY_PRIVATE = 'DISPLAY_PRIVATE';

export const ASSIGNMENT_RULE_MODULE_DESK = 'AR_MODULE_DESK';

export const TicketToolbarMoreOptions: LabelValueIcon[] = [
  {
    label: 'ncrm_common_import',
    value: 'import',
    icon: Icon('UploadCloud')
  },
  {
    label: 'ncrm_common_export',
    value: 'export',
    icon: Icon('Download')
  }
];

export const CheckAssignOptions: LabelValue[] = [
  {
    label: 'ncrm_generalsetting_assignment_rule_field_basic_user',
    value: 'AR_ASSGIN_TO_MODE_USERS'
  },
  {
    label: 'ncrm_generalsetting_assignment_rule_field_basic_group',
    value: 'AR_ASSGIN_TO_MODE_GROUPS'
  }
];

export const CheckAvailableOptions: LabelValue[] = [
  {
    label: 'ncrm_generalsetting_assignment_rule_online_status',
    value: 'AR_ENTRY_ASSIGN_CHECK_ONLINE'
  },
  {
    label: 'ncrm_generalsetting_assignment_rule_work_day',
    value: 'AR_ENTRY_ASSIGN_CHECK_WORK_DAY'
  },
  {
    label: 'ncrm_generalsetting_assignment_rule_none',
    value: 'AR_ENTRY_ASSIGN_CHECK_NONE'
  }
];

export const AssignmentTypeOptions: LabelValue[] = [
  {
    value: 'AR_MODULE_DESK',
    label: 'Desk'
  },
  {
    value: 'AR_MODULE_OPPORTUNITY',
    label: 'Opportunity'
  }
];
export const AssignmentChannelOptions: LabelValue[] = [
  {
    value: 'CHANNEL_LANDING_PAGE',
    label: 'ncrm_generalsetting_assignment_rule_landing_page'
  },
  {
    value: 'CHANNEL_EMAIL',
    label: 'ncrm_generalsetting_assignment_rule_email'
  },
  {
    value: 'CHANNEL_DIRECT_INPUT',
    label: 'ncrm_generalsetting_assignment_rule_direct_input'
  },
  {
    value: 'CHANNEL_WEBHOOK',
    label: 'ncrm_generalsetting_assignment_rule_webhook'
  }
  /*{
    value: 'AR_MODULE_CUSTOMER',
    label: 'Customer'
  },
  {
    value: 'AR_MODULE_PRODUCT',
    label: 'Product'
  }*/
];
export const AttributesSelectOptions: LabelValue[] = [
  { value: 'AR_ATTRIBUTE_DATE_1ST_RESPONSE_DUE', label: 'ncrm_generalsetting_assignment_rule_1st_response_due' },
  { value: 'AR_ATTRIBUTE_DATE_RESOLUTION_DUE', label: 'ncrm_generalsetting_assignment_rule_resolution_due' },
  { value: 'AR_ATTRIBUTE_DATE_CREATED', label: 'ncrm_generalsetting_assignment_rule_created_date' },
  { value: 'AR_ATTRIBUTE_DATE_UPDATED', label: 'ncrm_generalsetting_assignment_rule_updated_date' },
  { value: 'AR_ATTRIBUTE_DATE_BIRTHDAY', label: 'ncrm_generalsetting_assignment_rule_birthday' },
  { value: 'AR_ATTRIBUTE_DATE_CHRISTMAS', label: 'ncrm_generalsetting_assignment_rule_christmas' }
];
export const AttributesOptions: LabelValue[] = [
  { value: 'AR_ATTRIBUTE_DATE_SELECTED_ON_DATE', label: 'ncrm_generalsetting_assignment_rule_the_day' },
  { value: 'AR_ATTRIBUTE_DATE_SELECTED_BEFORE_DATE', label: 'ncrm_generalsetting_assignment_rule_before' },
  { value: 'AR_ATTRIBUTE_DATE_SELECTED_AFFER_DATE', label: 'ncrm_generalsetting_assignment_rule_after' }
];

export const AR_CRITERIA_OPTIONS_LANG: any = {
  product: 'Product',
  channel: 'Channel',
  region: 'Region',
  language: 'Language',
  category: 'Category',
  tag: 'Tag',
  ticket_classification: 'Ticket Classification'
};

export const AR_CRITERIA_OPTIONS_CHANNEL = [
  {
    keyName: 'channel_01',
    languageKey: 'Channel 01'
  },
  {
    keyName: 'channel_02',
    languageKey: 'Channel 02'
  },
  {
    keyName: 'channel_03',
    languageKey: 'Channel 03'
  }
];
export const AR_CRITERIA_OPTIONS_TAG = [
  {
    keyName: 'tag_error',
    languageKey: 'Error'
  },
  {
    keyName: 'tag_qa',
    languageKey: 'Q&A'
  },
  {
    keyName: 'tag_crm',
    languageKey: 'CRM'
  },
  {
    keyName: 'tag_others',
    languageKey: 'Others'
  }
];
export const AR_CRITERIA_OPTIONS_TICKET_CLASSI = [
  {
    keyName: 'Language',
    languageKey: 'Language'
  },
  {
    keyName: 'region',
    languageKey: 'Region'
  }
];
export const AR_CRITERIA_OPTIONS_CATEGORY = [
  {
    keyName: 'error',
    languageKey: 'Error'
  },
  {
    keyName: 'others',
    languageKey: 'Others'
  }
];
export const AR_CRITERIA_CONDITION: any = {
  channel: AR_CRITERIA_OPTIONS_CHANNEL,
  tag: AR_CRITERIA_OPTIONS_TAG,
  ticket_classification: AR_CRITERIA_OPTIONS_TICKET_CLASSI,
  category: AR_CRITERIA_OPTIONS_CATEGORY
};

export const DESK_CRITERIA_OPTIONS: LabelValue[] = [
  { value: keyNames.KEY_NAME_RULE_ENTRIES_CUSTOMER, label: 'assignment_rule_field_more_customer', extra: EAREntryCriteriaType.CUSTOMER },
  { value: keyNames.KEY_NAME_RULE_ENTRIES_ATTRIBUTE, label: 'assignment_rule_field_more_attribute', extra: EAREntryCriteriaType.ATTRIBUTE },
  { value: keyNames.KEY_NAME_RULE_ENTRIES_TAG, label: 'assignment_rule_field_more_tag', extra: EAREntryCriteriaType.TAG },
  {
    value: keyNames.KEY_NAME_RULE_ENTRIES_TICKET_CLASSIFICATION,
    label: 'assignment_rule_field_more_ticketclassification',
    extra: EAREntryCriteriaType.CLASSIFICATION
  },
  { value: keyNames.KEY_NAME_RULE_ENTRIES_CATEGORY, label: 'assignment_rule_field_more_category', extra: EAREntryCriteriaType.CATEGORY },
  { value: keyNames.KEY_NAME_RULE_ENTRIES_EMAIL, label: 'assignment_rule_field_more_email', extra: EAREntryCriteriaType.EMAIL }
];
export const OPPORTUNITY_CRITERIA_OPTIONS: LabelValue[] = [
  { value: keyNames.KEY_NAME_RULE_ENTRIES_CUSTOMER, label: 'assignment_rule_field_more_customer',extra:EAREntryCriteriaType.CUSTOMER  },
  { value: keyNames.KEY_NAME_RULE_ENTRIES_ATTRIBUTE, label: 'assignment_rule_field_more_attribute',extra:EAREntryCriteriaType.ATTRIBUTE  },
  { value: keyNames.KEY_NAME_RULE_ENTRIES_PRODUCT, label: 'assignment_rule_field_more_product',extra:EAREntryCriteriaType.PRODUCT }
];
export const EMAIL_CRITERIA_OPTIONS: LabelValue[] = [
  { value: keyNames.KEY_NAME_RULE_ENTRIES_EMAIL, label: 'ncrm_generalsetting_assignment_rule_email_address' }
];
