import * as keyNames from '@activity/config/keyNames';

// const allSentEmailColumn = [
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_SUBJECT,
//     languageKey: 'activity_email_field_basic_subject',
//     defaultViewInList: true,
//     sortable: true,
//     name: keyNames.KEY_NAME_ACTIVITY_SUBJECT,
//     title: 'activity_email_field_basic_subject'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_PURPOSE,
//     languageKey: 'activity_email_field_basic_purpose',
//     defaultViewInList: true,
//     sortable: false,
//     name: keyNames.KEY_NAME_ACTIVITY_PURPOSE,
//     title: 'activity_email_field_basic_purpose'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_TO,
//     languageKey: 'ncrm_activity_customer',
//     defaultViewInList: true,
//     sortable: false,
//     name: keyNames.KEY_NAME_ACTIVITY_TO,
//     title: 'ncrm_activity_customer'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_START_TIME,
//     languageKey: 'ncrm_activity_email_send_date',
//     defaultViewInList: true,
//     sortable: true,
//     name: keyNames.KEY_NAME_ACTIVITY_START_TIME,
//     title: 'ncrm_activity_email_send_date'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_FROM,
//     languageKey: 'activity_activity_field_basic_from',
//     defaultViewInList: true,
//     sortable: false,
//     name: keyNames.KEY_NAME_ACTIVITY_FROM,
//     title: 'activity_activity_field_basic_from'
//   }
// ];

const allSentEmailColumn = [
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_SUBJECT,
    languageKey: 'activity_activity_field_basic_subject', // Subject
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_SUBJECT,
    title: 'activity_activity_field_basic_subject'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_TO,
    languageKey: 'activity_activity_field_basic_to', // Customer
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_TO,
    title: 'activity_activity_field_basic_to'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_PRIORITY,
    languageKey: 'ncrm_activity_priority', // Priority
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_NAME_ACTIVITY_PRIORITY,
    title: 'ncrm_activity_priority'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_PURPOSE,
    languageKey: 'activity_activity_field_basic_purpose', // Purpose
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_PURPOSE,
    title: 'activity_activity_field_basic_purpose'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
    languageKey: 'activity_activity_field_basic_relatedto', // Related To
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
    title: 'activity_activity_field_basic_relatedto'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
    languageKey: 'activity_activity_field_basic_products', // Related Product
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
    title: 'activity_activity_field_basic_products'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_TASK_TYPE,
    languageKey: 'activity_activity_field_basic_tasktype', // Task Type
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_TASK_TYPE,
    title: 'activity_activity_field_basic_tasktype'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
    languageKey: 'activity_activity_field_basic_callresult', // Call Result
    defaultViewInList: false,
    sortable: false,
    name: keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
    title: 'activity_activity_field_basic_callresult'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
    languageKey: 'activity_activity_field_basic_duration', // Duration
    defaultViewInList: false,
    sortable: false,
    name: keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
    title: 'activity_activity_field_basic_duration'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_STATUS,
    languageKey: 'activity_activity_field_basic_status', // Activity Status
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_NAME_ACTIVITY_STATUS,
    title: 'activity_activity_field_basic_status'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_FROM,
    languageKey: 'activity_activity_field_basic_from', // Assigned Rep
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_FROM,
    title: 'activity_activity_field_basic_from'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_CREATED_BY,
    languageKey: 'activity_activity_field_basic_owner', // Owner
    defaultViewInList: false,
    sortable: false,
    name: keyNames.KEY_NAME_ACTIVITY_CREATED_BY,
    title: 'activity_activity_field_basic_owner'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_DATE,
    languageKey: 'activity_activity_field_basic_activitydate', // Activity Date
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_DATE,
    title: 'activity_activity_field_basic_activitydate'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_DUE_DATE,
    languageKey: 'activity_activity_field_basic_duedate', // Due Date
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_DUE_DATE,
    title: 'activity_activity_field_basic_duedate'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_CREATED_AT,
    languageKey: 'activity_activity_field_more_createdat', // Created Date
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_CREATED_AT,
    title: 'activity_activity_field_more_createdat'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_UPDATED_AT,
    languageKey: 'activity_activity_field_more_updatedat', // Updated Date
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_UPDATED_AT,
    title: 'activity_activity_field_more_updatedat'
  },
  {
    keyName: keyNames.KEY_NAME_ACTIVITY_UPDATED_BY,
    languageKey: 'activity_activity_field_more_updatedby', // Updated By
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_UPDATED_BY,
    title: 'activity_activity_field_more_updatedby'
  },
   {
    keyName: keyNames.KEY_NAME_ACTIVITY_START_TIME,
    languageKey: 'ncrm_activity_email_send_date',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_ACTIVITY_START_TIME,
    title: 'ncrm_activity_email_send_date'
  },
];

export default allSentEmailColumn;
