import _ from 'lodash';

import { ActivityDirectionOptions, ActivityTaskTypeOptions, ActivityTypesOptions } from '@activity/config/constants';
import * as keyNames from '@activity/config/keyNames';
import * as activitiesGroupBy from '@activity/config/list-field/activitiesGroupBy';
import { DurationRangeCustom, LookupCustom, SelectBoxCustom } from '@activity/config/write-field/components';
import { useSelectionFields } from '@base/services/graphql/format-service';
import { LabelValue } from '@base/types/app';
import { IdLanguageKey } from '@base/types/common';
import { DurationOptions } from '@base/utils/helpers/dateUtils';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';
import RelatedItem from '@activity/containers/RelatedItem';
import TagInput from '@base/components/@hanbiro/TagInput';

export const groupByOptions: LabelValue[] = [
  { label: 'ncrm_activity_all_activity', value: activitiesGroupBy.ALL_ACTIVITIES },
  { label: 'ncrm_activity_my_activity', value: activitiesGroupBy.MY_ACTIVITIES },
  { label: 'ncrm_activity_my_overdue', value: activitiesGroupBy.MY_OVERDUE_ACTIVITIES },
  { label: 'ncrm_activity_my_group_activity', value: 'my_group' },
  { label: 'ncrm_activity_my_group_activity_type_1', value: activitiesGroupBy.MY_GROUP_ACTIVITY_1 },
  { label: 'ncrm_activity_my_group_activity_type_2', value: activitiesGroupBy.MY_GROUP_ACTIVITY_2 },
  { label: 'ncrm_activity_all_call', value: activitiesGroupBy.ALL_CALL, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_all_missed_call', value: activitiesGroupBy.ALL_MISSED_CALL, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_all_outgoing_call', value: activitiesGroupBy.ALL_OUTGOING_CALL, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_all_scheduled_call', value: activitiesGroupBy.ALL_SCHEDULED_CALL, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_all_incoming_call', value: activitiesGroupBy.ALL_INCOMING_CALL, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_all_email', value: activitiesGroupBy.ALL_EMAILS, extra: 'TYPE_MAIL' },
  { label: 'ncrm_activity_all_scheduled_emails', value: activitiesGroupBy.ALL_SCHEDULED_EMAILS, extra: 'TYPE_MAIL' },
  { label: 'ncrm_activity_all_sent_email', value: activitiesGroupBy.ALL_SENT_EMAILS, extra: 'TYPE_MAIL' },
  { label: 'ncrm_activity_all_recived_call', value: activitiesGroupBy.ALL_RECEIVED_EMAILS, extra: 'TYPE_MAIL' },
  { label: 'ncrm_activity_all_sms', value: activitiesGroupBy.ALL_SMS, extra: 'TYPE_SMS' },
  { label: 'ncrm_activity_all_scheduled_sms', value: activitiesGroupBy.ALL_SCHEDULED_SMS, extra: 'TYPE_SMS' },
  { label: 'ncrm_activity_all_task', value: activitiesGroupBy.ALL_TASKS, extra: 'TYPE_TASK' },
  { label: 'ncrm_activity_all_overdue_task', value: activitiesGroupBy.ALL_OVERDUE_TASKS, extra: 'TYPE_TASK' },
  { label: 'ncrm_activity_all_todo_task', value: activitiesGroupBy.ALL_TODO_TASKS, extra: 'TYPE_TASK' },
  { label: 'ncrm_activity_all_done_task', value: activitiesGroupBy.ALL_DONE_TASKS, extra: 'TYPE_TASK' },
  { label: 'ncrm_activity_my_call', value: activitiesGroupBy.MY_CALLS, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_my_missed_call', value: activitiesGroupBy.MY_MISSED_CALL, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_my_outgoing_call', value: activitiesGroupBy.MY_OUTGOING_CALL, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_my_scheduled_call', value: activitiesGroupBy.MY_SCHEDULED_CALL, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_my_incoming_call', value: activitiesGroupBy.MY_INCOMING_CALL, extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_my_email', value: activitiesGroupBy.MY_EMAILS, extra: 'TYPE_MAIL' },
  { label: 'ncrm_activity_my_scheduled_emails', value: activitiesGroupBy.MY_SCHEDULED_EMAILS, extra: 'TYPE_MAIL' },
  { label: 'ncrm_activity_my_sent_email', value: activitiesGroupBy.MY_SENT_EMAILS, extra: 'TYPE_MAIL' },
  { label: 'ncrm_activity_my_received_emails', value: activitiesGroupBy.MY_RECEIVED_EMAILS, extra: 'TYPE_MAIL' },
  { label: 'ncrm_activity_my_sms', value: activitiesGroupBy.MY_SMS, extra: 'TYPE_SMS' },
  { label: 'ncrm_activity_my_scheduled_sms', value: activitiesGroupBy.MY_SCHEDULED_SMS, extra: 'TYPE_SMS' },
  { label: 'ncrm_activity_my_task', value: activitiesGroupBy.MY_TASKS, extra: 'TYPE_TASK' },
  { label: 'ncrm_activity_my_overdue_task', value: activitiesGroupBy.MY_OVERDUE_TASKS, extra: 'TYPE_TASK' },
  { label: 'ncrm_activity_my_todo_task', value: activitiesGroupBy.MY_TODO_TASKS, extra: 'TYPE_TASK' },
  { label: 'ncrm_activity_my_done_task', value: activitiesGroupBy.MY_DONE_TASKS, extra: 'TYPE_TASK' },
  { label: 'ncrm_activity_deleted_activities', value: activitiesGroupBy.DELETED_ACTIVITY },
  { label: 'ncrm_activity_all_received_call', value: activitiesGroupBy.ALL_RECEIVED_EMAILS, extra: 'TYPE_MAIL' }, // Received Emails
];

export const groupByMyworkOptions: LabelValue[] = [
  { label: 'ncrm_activity_all_works', value: 'all' },
  { label: 'ncrm_activity_my_call', value: 'my_calls', extra: 'TYPE_CALL' },
  { label: 'ncrm_activity_my_task', value: 'my_tasks', extra: 'TYPE_TASK' },
  { label: 'ncrm_activity_my_ticket', value: 'my_tickets', extra: 'TYPE_TICKET' }
];

// export const groupByMyworkOptions: LabelValue[] = [
//   { label: 'ncrm_activity_all_works', value: 'all' },
//   { label: 'ncrm_activity_my_work', value: 'my' },
//   { label: 'ncrm_activity_my_group_work', value: 'my_group' },
//   { label: 'ncrm_activity_all_scheduled_tasks', value: 'all_scheduled_tasks', extra: 'TYPE_TASK' },
//   { label: 'ncrm_activity_my_scheduled_tasks', value: 'my_scheduled_tasks', extra: 'TYPE_TASK' },
//   { label: 'ncrm_activity_all_scheduled_call', value: 'all_scheduled_calls', extra: 'TYPE_CALL' },
//   { label: 'ncrm_activity_my_scheduled_call', value: 'my_scheduled_calls', extra: 'TYPE_CALL' },
//   { label: 'ncrm_activity_all_scheduled_emails', value: 'all_scheduled_emails', extra: 'TYPE_MAIL' },
//   { label: 'ncrm_activity_my_scheduled_emails', value: 'my_scheduled_emails', extra: 'TYPE_MAIL' },
//   { label: 'ncrm_activity_all_scheduled_sms', value: 'all_scheduled_sms', extra: 'TYPE_SMS' },
//   { label: 'ncrm_activity_my_scheduled_sms', value: 'my_scheduled_sms', extra: 'TYPE_SMS' }
// ];

export const dateByOptions: LabelValue[] = [
  { label: 'activity_activity_field_more_createdat', value: keyNames.KEY_NAME_ACTIVITY_CREATED_AT },
  { label: 'activity_activity_field_basic_activitydate', value: keyNames.KEY_NAME_ACTIVITY_DATE },
  { label: 'activity_activity_field_basic_duedate', value: keyNames.KEY_NAME_ACTIVITY_DUE_DATE },
  { label: 'activity_activity_field_more_updatedat', value: keyNames.KEY_NAME_ACTIVITY_UPDATED_AT }
];

export const dateByMyworkOptions: LabelValue[] = [
  { label: 'activity_activity_field_more_createdat', value: keyNames.KEY_NAME_ACTIVITY_CREATED_AT },
  { label: 'activity_activity_field_basic_duedate', value: keyNames.KEY_NAME_ACTIVITY_DUE_DATE },
  { label: 'activity_activity_field_more_updatedat', value: keyNames.KEY_NAME_ACTIVITY_UPDATED_AT }
];

export const myWorkFilterByOptions = [
  {
    label: 'activity_activity_field_basic_work_type',
    value: keyNames.KEY_NAME_ACTIVITY_TYPE,
    component: SelectBoxCustom,
    componentProps: {
      options: ActivityTypesOptions,
      fieldValue: 'value',
      fieldLabel: 'label'
    },
    getValue: (val: LabelValue) => {
      return val?.value;
    },
    setValue: (val: string) => {
      return ActivityTypesOptions.find((e) => e.value == val);
    }
  },
  {
    label: 'activity_activity_field_basic_to',
    value: keyNames.KEY_NAME_ACTIVITY_TO,
    component: CustomerAutoComplete,
    componentProps: {
      //single: true,
      type: 'account'
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  }
];

export const filterByOptions = [
  {
    label: 'activity_activity_field_basic_type', // Activity Type
    value: keyNames.KEY_NAME_ACTIVITY_TYPE,
    component: SelectBoxCustom,
    componentProps: {
      options: ActivityTypesOptions,
      fieldValue: 'value',
      fieldLabel: 'label'
    },
    getValue: (val: LabelValue) => {
      return val?.value;
    },
    setValue: (val: string) => {
      return ActivityTypesOptions.find((e) => e.value == val);
    }
  },
  {
    label: 'activity_activity_field_basic_to', // Customer
    value: keyNames.KEY_NAME_ACTIVITY_TO,
    component: CustomerAutoComplete,
    componentProps: {
      //single: true,
      type: 'account'
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'activity_call_field_basic_direction', // Direction
    value: keyNames.KEY_NAME_ACTIVITY_DIRECTION,
    component: SelectBoxCustom,
    componentProps: {
      options: ActivityDirectionOptions,
      fieldValue: 'value',
      fieldLabel: 'label'
    },
    getValue: (val: LabelValue) => {
      return val?.value;
    },
    setValue: (val: string) => {
      return ActivityDirectionOptions.find((e) => e.value == val);
    }
  },
  {
    label: 'activity_call_field_basic_purpose', // Purpose
    value: keyNames.KEY_NAME_ACTIVITY_PURPOSE,
    component: LookupCustom,
    componentProps: {
      fetchList: useSelectionFields,
      fieldLabel: 'languageKey',
      fieldValue: 'id',
      extraParams: { filter: { query: 'keyRoot=activity_purpose' } },
      isMultiple: true,
      useDefault: false
    },
    getValue: (value: IdLanguageKey[]) => {
      return value?.map((v: any) => v?.id).join(',');
    }
  },
  {
    label: 'ncrm_activity_priority',
    value: keyNames.KEY_NAME_ACTIVITY_PRIORITY, // Priority
    component: LookupCustom,
    componentProps: {
      fetchList: useSelectionFields,
      fieldLabel: 'languageKey',
      fieldValue: 'id',
      extraParams: { filter: { query: 'keyRoot=priority' } },
      isMultiple: true,
      useDefault: false
    },
    getValue: (value: IdLanguageKey[]) => {
      return value?.map((v: any) => v?.id).join(',');
    }
  },
  {
    label: 'ncrm_activity_task_type', // Task Type
    value: keyNames.KEY_NAME_ACTIVITY_TASK_TYPE,
    component: SelectBoxCustom,
    componentProps: {
      options: ActivityTaskTypeOptions,
      fieldValue: 'value',
      fieldLabel: 'label'
    },
    getValue: (val: LabelValue) => {
      return val?.value;
    },
    setValue: (val: string) => {
      return ActivityTaskTypeOptions.find((e) => e.value == val);
    }
  },
  {
    label: 'ncrm_activity_related_product', // Related Product
    value: keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
    component: ProductAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_activity_related_to', // Related To
    value: keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
    component: RelatedItem,
    componentProps: {
      minWidth: 200
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_activity_tag', // Tag
    value: keyNames.KEY_NAME_ACTIVITY_TAGS,
    component: TagInput,
    componentProps: {},
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_activity_duration', // Duration
    value: keyNames.KEY_NAME_ACTIVITY_DURATION,
    components: DurationRangeCustom,
    componentProps: {
      options: _.clone(DurationOptions).splice(0, 4)
    }
  },
  {
    label: 'ncrm_activity_call_result', // Call Result
    value: keyNames.KEY_NAME_ACTIVITY_CALL_RESULT,
    component: LookupCustom,
    componentProps: {
      fetchList: useSelectionFields,
      fieldLabel: 'languageKey',
      fieldValue: 'id',
      extraParams: { filter: { query: 'keyRoot=activity_call_result' } },
      isMultiple: true,
      useDefault: false
    },
    getValue: (value: IdLanguageKey[]) => {
      return value?.map((v: any) => v?.id).join(',');
    }
  },
  {
    label: 'activity_activity_field_basic_from', // Assigned Rep
    value: keyNames.KEY_NAME_ACTIVITY_FROM,
    component: UserAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_activity_owner', // Owner
    value: keyNames.KEY_NAME_ACTIVITY_CREATED_BY,
    component: UserAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_activity_updated_by', // Updated By
    value: keyNames.KEY_NAME_ACTIVITY_UPDATED_BY,
    component: UserAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  }

  // {
  //   label: 'activity_activity_field_more_createdby', // Created By
  //   value: keyNames.KEY_NAME_ACTIVITY_CREATED_BY,
  //   component: UserAutoComplete,
  //   getValue: (value: any) => {
  //     return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
  //   },
  //   setValue: (value: string) => {
  //     return value ? value.split(',') : [];
  //   }
  // }

  // {
  //   label: 'ncrm_activity_expected_duration', // Expected Duration
  //   value: keyNames.KEY_NAME_ACTIVITY_EDURATION,
  //   component: DurationRangeCustom,
  //   componentProps: {
  //     options: _.clone(DurationOptions).splice(0, 4)
  //   }
  // },

  // {
  //   label: 'ncrm_activity_call_type', // Call Type
  //   value: keyNames.KEY_NAME_ACTIVITY_CALL_TYPE,
  //   component: SelectBoxCustom,
  //   componentProps: {
  //     options: ActivityCallTypeOptions,
  //     fieldValue: 'value',
  //     fieldLabel: 'label'
  //   },
  //   getValue: (val: LabelValue) => {
  //     return val?.value;
  //   },
  //   setValue: (val: string) => {
  //     return ActivityCallTypeOptions.find((e) => e.value == val);
  //   }
  // },

  // {
  //   label: 'ncrm_activity_status', // Status
  //   value: keyNames.KEY_NAME_ACTIVITY_STATUS,
  //   component: SelectBoxCustom,
  //   componentProps: {
  //     options: ActivityStatusOptions,
  //     fieldValue: 'value',
  //     fieldLabel: 'label'
  //   },
  //   getValue: (val: LabelValue) => {
  //     return val?.value;
  //   },
  //   setValue: (val: string) => {
  //     return ActivityStatusOptions.find((e) => e.value == val);
  //   }
  // },

  // {
  //   label: 'ncrm_activity_read', // Read
  //   value: 'isRead',
  //   component: Switch,
  //   componentProps: {},
  //   getValue: (value: any) => {
  //     return value;
  //   },
  //   setValue: (value: any) => {
  //     return value || false;
  //   },
  //   parseExtra: (value: boolean) => {
  //     return value ? t(`isRead`) : t(`unRead`);
  //   }
  // }
];

export const searchFields: LabelValue[] = [
  // {
  //   name: 'type',
  //   type: 'select',
  //   label: 'Type',
  //   defaultValue: '',
  //   options: [
  //     { label: 'All', value: 'TYPE_NONE' },
  //     { label: 'Customer', value: 'TYPE_CUSTOMER' },
  //     { label: 'Potential', value: 'TYPE_POTENTIAL' },
  //   ],
  // },
  // {
  //   name: 'email',
  //   type: 'email',
  //   label: 'Email',
  //   defaultValue: '',
  // },
  // {
  //   name: 'phone',
  //   type: 'text',
  //   label: 'Telephone',
  //   defaultValue: '',
  // },
  // {
  //   name: 'conversionDate',
  //   type: 'range',
  //   label: 'Conversion Date',
  //   time: true,
  // },
  {
    value: 'subject',
    label: 'Subject'
  }
];


//Comparision
export const groupByComparisionOptions: LabelValue[] = [
  { label: 'ncrm_activity_all_users', value: 'user' },
  { label: 'ncrm_activity_all_groups', value: 'group' }
];
export const sortsByOptions = [
  { label: 'Subject', value: keyNames.KEY_NAME_ACTIVITY_SUBJECT },
  { label: 'Customer', value: keyNames.KEY_NAME_ACTIVITY_TO },
  { label: 'Activity Date', value: keyNames.KEY_NAME_ACTIVITY_DATE },
  { label: 'Assigned Rep', value: keyNames.KEY_NAME_ACTIVITY_FROM }
];
