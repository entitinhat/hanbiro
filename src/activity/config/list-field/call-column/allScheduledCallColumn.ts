import * as keyNames from '@activity/config/keyNames';

const allScheduledCallColumn = [
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_SUBJECT,
    languageKey: 'activity_call_field_basic_subject',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_SUBJECT,
    title: 'activity_call_field_basic_subject'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_TO,
    languageKey: 'ncrm_activity_customer',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_NAME_ACTIVITY_TO,
    title: 'ncrm_activity_customer'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_PRIORITY,
    languageKey: 'ncrm_activity_priority',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_NAME_ACTIVITY_PRIORITY,
    title: 'ncrm_activity_priority'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_PURPOSE,
    languageKey: 'activity_call_field_basic_purpose',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_NAME_ACTIVITY_PURPOSE,
    title: 'activity_call_field_basic_purpose'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_START_TIME,
    languageKey: 'ncrm_activity_call_start_date',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_START_TIME,
    title: 'ncrm_activity_call_start_date'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_DURATION,
    languageKey: 'ncrm_activity_call_duration',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_DURATION,
    title: 'ncrm_activity_call_duration'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_FROM,
    languageKey: 'activity_activity_field_basic_from',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_NAME_ACTIVITY_FROM,
    title: 'activity_activity_field_basic_from'
  }
];

export default allScheduledCallColumn;
