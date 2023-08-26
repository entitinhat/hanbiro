import * as components from '@desk/ticket/config/write-field/components';
import { useTicketTags } from '@desk/ticket/hooks/useTicketTags';
import * as keyNames from '@desk/ticket/config/keyNames';
import { t } from 'i18next';
import * as ticketGroupBy from '@desk/ticket/config/list-field/ticketGroupBy';
import { LabelValue } from '@base/types/app';

export const groupByOptions = [
  { label: 'ncrm_desk_ticket_group_by_all_tickets', value: ticketGroupBy.ALL_TICKETS }, // All Tickets
  { label: 'ncrm_desk_ticket_group_by_my_ticket', value: ticketGroupBy.MY_TICKETS }, // My Tickets
  { label: 'ncrm_desk_ticket_group_by_my_new_ticket', value: ticketGroupBy.MY_NEW_TICKETS }, // My New Tickets
  { label: 'ncrm_desk_ticket_group_by_my_overdue_ticket', value: ticketGroupBy.MY_OVERDUE_TICKETS }, // My Overdue Tickets
  { label: 'ncrm_desk_ticket_group_by_my_group_ticket', value: ticketGroupBy.MY_GROUP_TICKETS }, // My Group
  { label: 'ncrm_desk_ticket_group_by_my_group_ticket_2', value: ticketGroupBy.MY_GROUP_TICKETS_2 }, // My Group Ticket - Type 2
  { label: 'ncrm_desk_ticket_group_by_unassigned_tickets', value: ticketGroupBy.UNASSIGNED_TICKETS }, // Unassigned Tickets
  { label: 'ncrm_desk_ticket_group_by_ticket_per_customer', value: ticketGroupBy.TICKETS_PER_CUSTOMER }, // Tickets per Customer
  { label: 'ncrm_desk_ticket_group_by_ticket_per_customer_2', value: ticketGroupBy.TICKETS_PER_CUSTOMER_2 }, // Ticket Per Customer - Type 2
  { label: 'ncrm_desk_ticket_group_by_ticket_per_priority', value: ticketGroupBy.TICKETS_PER_PRIORITY }, // Tickets per Priority
  { label: 'ncrm_desk_ticket_group_by_ticket_per_priority_2', value: ticketGroupBy.TICKETS_PER_PRIORITY_2 }, // Ticket Per Priority - Type 2
  { label: 'ncrm_desk_ticket_group_by_ticket_per_channel', value: ticketGroupBy.TICKETS_PER_CHANNEL }, // Tickets per Channel
  { label: 'ncrm_desk_ticket_group_by_ticket_per_channel_2', value: ticketGroupBy.TICKETS_PER_CHANNEL_2 }, // Ticket Per Channel - Type 2
  { label: 'ncrm_desk_ticket_group_by_ticket_per_process', value: ticketGroupBy.TICKETS_PER_PROCESS }, // Tickets per Process
  { label: 'ncrm_desk_ticket_group_by_ticket_per_process_2', value: ticketGroupBy.TICKETS_PER_PROCESS_2 }, // Ticket Per Process - Type 2
  { label: 'ncrm_desk_ticket_group_by_deleted_ticket', value: ticketGroupBy.DELETED_TICKET } // Deleted Ticket
];

export const dateByOptions = [
  { label: 'ncrm_desk_ticket_filter_1st_response_due', value: 'firstRespondDue' }, // 1st Response Due
  { label: 'ncrm_desk_ticket_filter_resolution_due', value: 'resolutionDue' }, // Resolution Due
  { label: 'ncrm_desk_ticket_filter_created_date', value: 'createdAt' }, // Created date
  { label: 'ncrm_desk_ticket_filter_resolved_date', value: 'resolvedAt' }, // Resolved date
  { label: 'ncrm_desk_ticket_filter_closed_date', value: 'closedAt' }, // Closed date
  { label: 'ncrm_desk_ticket_filter_updated_date', value: 'updatedAt' } // Updated date
];

export const filterByOptions = [
  {
    label: 'ncrm_desk_ticket_filter_customer', //Customer
    value: keyNames.KEY_TICKET_CUSTOMER,
    component: components.CustomerAutoComplete,
    componentProps: {
      //single: true,
      showAvatar: true,
      addLabel: 'ncrm_desk_ticket_filter_add_new_customer' //Add new customer
    },
    getValue: (value: any) => {
      //return param for query
      return value.length > 0 ? value.map((v: any) => v.id).join(',') : '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  {
    label: 'ncrm_desk_ticket_filter_priority', // Priority
    value: keyNames.KEY_TICKET_PRIORITY,
    component: components.PrioritySelect,
    componentProps: {},
    getValue: (value: any) => {
      //return param for query
      return value?.priority || '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  {
    // label: 'ncrm_desk_ticket_filter_product_category', //Product / Category
    label: 'ncrm_desk_ticket_filter_category', // Category
    value: keyNames.KEY_TICKET_CATEGORY,
    // component: components.ProductCategorySelect,
    component: components.CategorySelect,
    componentProps: {},
    getValue: (value: any) => {
      //return param for query
      return value?.category ? value.category.id : '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  // { label: 'Assigned Group', value: 'assignedGroup' },
  // {
  //   label: 'ncrm_desk_ticket_filter_assigned_group_rep', //Assigned Group / Rep
  //   value: 'assignedUser',
  //   component: components.AssignGroupRep,
  //   componentProps: {},
  //   getValue: (value: any) => {
  //     //return param for query
  //     return value?.assignedUser ? value.assignedUser.id : ''; //TODO: assignedGroup ?
  //   },
  //   setValue: (value: any) => {
  //     //initial value for component
  //   }
  // },
  {
    label: 'ncrm_desk_ticket_filter_process', //Process
    value: keyNames.KEY_TICKET_PROCESS,
    component: components.ProcessAutoComplete,
    componentProps: {
      // fetchList: useTicketProcesses,
      // fetchList: useGetModuleProcesses,
      // fieldValue: 'id',
      // fieldLabel: 'name',
      // extraParams: { module: 'MODULE_DESK' },
      // isSearch: false
    },
    getValue: (value: any) => {
      //return param for query
      return value?.id || '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  {
    label: 'ncrm_desk_ticket_filter_classification', // Classification
    value: keyNames.KEY_TICKET_CLASSIFICATION,
    component: components.Classification,
    componentProps: {
      column: 1
    },
    getValue: (value: any) => {
      //return param for query
      let newParam: string = '';
      if (value?.region) {
        newParam += value.region.id + '|' + value.region.value;
      }
      if (value?.language) {
        newParam += '|__|' + value.language.id + '|' + value.language.value;
      }
      return newParam;
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  {
    label: 'ncrm_desk_ticket_filter_assigned_group',
    value: keyNames.KEY_TICKET_ASSIGN_GROUP,
    component: components.AssignGroupAutocomplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_desk_ticket_filter_assigned_rep',
    value: keyNames.KEY_TICKET_ASSIGN_USER,
    component: components.AssignRepAutocomplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_desk_ticket_filter_cc', //Cc
    value: 'ccUsers',
    component: components.UserAutoComplete,
    componentProps: {},
    getValue: (value: any) => {
      //return param for query
      return value.length > 0 ? value.map((v: any) => v.id).join(',') : '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  // { label: 'Customer Satisfaction', value: 'cusSatisfaction' },
  // { label: 'Channel', value: 'channel' },
  {
    label: 'ncrm_desk_ticket_filter_tag', //Tag
    value: keyNames.KEY_TICKET_TAG,
    component: components.Tags,
    componentProps: {
      fieldValue: 'id',
      fieldLabel: 'name'
      // isMultiple: true
    },
    defaultValue: []
  },
  {
    label: 'ncrm_desk_ticket_filter_owner',
    value: 'createdBy',
    component: components.UserAutoComplete,
    componentProps: {
      single: false,
      showAvatar: true
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'ncrm_desk_ticket_filter_updated_by',
    value: keyNames.KEY_TICKET_UPDATED_BY,
    component: components.UserAutoComplete,
    componentProps: {
      single: false,
      showAvatar: true
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  }
];

export const sortByOptions: LabelValue[] = [
  {
    value: keyNames.KEY_TICKET_SUBJECT,
    // label: 'Subject'
    label: 'ncrm_desk_ticket_filter_subject'
  },
  {
    value: keyNames.KEY_TICKET_CUSTOMER,
    // label: 'Customer'
    label: 'ncrm_desk_ticket_filter_customer'
  },
  {
    value: keyNames.KEY_TICKET_PRIORITY,
    // label: 'Priority'
    label: 'ncrm_desk_ticket_filter_priority'
  },
  {
    value: keyNames.KEY_TICKET_ASSIGN_USER,
    // label: 'Assigned Rep'
    label: 'ncrm_desk_ticket_filter_assigned_rep'
  },
  {
    value: keyNames.KEY_TICKET_CREATED_AT,
    // label: 'Created Date'
    label: 'ncrm_desk_ticket_filter_created_date'
  },
  {
    value: keyNames.KEY_TICKET_UPDATED_AT,
    // label: 'Updated Date'
    label: 'ncrm_desk_ticket_filter_updated_date'
  },
  {
    value: keyNames.KEY_TICKET_RESPONSE_DUE,
    // label: '1st Response Due'
    label: 'ncrm_desk_ticket_filter_1st_response_due'
  },
  {
    value: keyNames.KEY_TICKET_RESOLUTION_DUE,
    // label: 'Resolution Due'
    label: 'ncrm_desk_ticket_filter_resolution_due'
  },
  {
    value: keyNames.KEY_TICKET_CLOSED_AT,
    // label: 'Closed Date'
    label: 'ncrm_desk_ticket_filter_closed_date'
  }
];

export const dateByFields: string[] = [
  keyNames.KEY_TICKET_CLOSED_AT,
  keyNames.KEY_TICKET_RESOLUTION_DUE,
  keyNames.KEY_TICKET_RESPONSE_DUE,
  keyNames.KEY_TICKET_UPDATED_AT,
  keyNames.KEY_TICKET_CREATED_AT
];
export const searchFields: string[] = [keyNames.KEY_TICKET_SUBJECT];
