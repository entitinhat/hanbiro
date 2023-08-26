import * as keyNames from '@activity/config/keyNames';

// const allTaskColumn = [
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_SUBJECT,
//     languageKey: 'activity_task_field_basic_subject',
//     defaultViewInList: true,
//     sortable: true,
//     name: keyNames.KEY_NAME_ACTIVITY_SUBJECT,
//     title: 'activity_task_field_basic_subject'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_TO,
//     languageKey: 'activity_task_field_basic_to',
//     defaultViewInList: true,
//     sortable: false,
//     name: keyNames.KEY_NAME_ACTIVITY_TO,
//     title: 'activity_task_field_basic_to'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_TASK_TYPE,
//     languageKey: 'activity_task_field_basic_tasktype',
//     defaultViewInList: true,
//     sortable: false,
//     name: keyNames.KEY_NAME_ACTIVITY_TASK_TYPE,
//     title: 'activity_task_field_basic_tasktype'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_DUE_DATE,
//     languageKey: 'activity_task_field_basic_duedate',
//     defaultViewInList: true,
//     sortable: true,
//     name: keyNames.KEY_NAME_ACTIVITY_DUE_DATE,
//     title: 'activity_task_field_basic_duedate'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_END_TIME,
//     languageKey: 'activity_task_field_basic_endtime',
//     defaultViewInList: true,
//     sortable: true,
//     name: keyNames.KEY_NAME_ACTIVITY_END_TIME,
//     title: 'activity_task_field_basic_endtime'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_DURATION,
//     languageKey: 'activity_task_field_basic_duration',
//     defaultViewInList: true,
//     sortable: true,
//     name: keyNames.KEY_NAME_ACTIVITY_DURATION,
//     title: 'activity_task_field_basic_duration'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_STATUS,
//     languageKey: 'activity_task_field_basic_status',
//     defaultViewInList: true,
//     sortable: false,
//     name: keyNames.KEY_NAME_ACTIVITY_STATUS,
//     title: 'activity_task_field_basic_status'
//   },
//   {
//     keyName: keyNames.KEY_NAME_ACTIVITY_FROM,
//     languageKey: 'activity_task_field_basic_from',
//     defaultViewInList: true,
//     sortable: false,
//     name: keyNames.KEY_NAME_ACTIVITY_FROM,
//     title: 'activity_task_field_basic_from'
//   }
// ];

const allTaskColumn = [
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
  }

  // Error with updatedBy field
  // {
  //   keyName: keyNames.KEY_NAME_ACTIVITY_UPDATED_BY,
  //   languageKey: 'activity_activity_field_more_updatedby', // Updated By
  //   defaultViewInList: false,
  //   sortable: true,
  //   name: keyNames.KEY_NAME_ACTIVITY_UPDATED_BY,
  //   title: 'activity_activity_field_more_updatedby'
  // }
];

export default allTaskColumn;
