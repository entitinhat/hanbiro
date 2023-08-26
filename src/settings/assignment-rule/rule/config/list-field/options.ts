import * as components from '@desk/ticket/config/write-field/components';

export const groupByOptions = [
  { label: 'ncrm_generalsetting_ticket_form_groupby_all', value: 'all' },
  { label: 'My Tickets', value: 'my' },
  { label: 'My Group Ticket', value: 'myGroup' },
  { label: 'Unassigned Tickets', value: 'unassigned' },
  { label: 'My Due Today', value: 'myDueToday' },
  { label: 'My Overdue', value: 'myOverDue' },
  { label: 'My CC', value: 'myCC' },
  { label: 'Due Today in My Group', value: 'myGroupDueToday' },
  { label: 'Overdue in My Group', value: 'myGroupOverdue' },
  { label: 'Violated Response Due', value: 'violatedRespondDue' },
  { label: 'Violated Resolution Due', value: 'viololatedResolutionDue' }
  // { label: 'Deleted Tickets', value: 'deleted' },
];

export const dateByOptions = [
  { label: '1st Response Due', value: 'firstRespondDue' },
  { label: 'Resolution Due', value: 'resolutionDue' },
  { label: 'Created on', value: 'createdAt' },
  { label: 'Closed on', value: 'closedAt' },
  { label: 'Updated on', value: 'updatedAt' }
];

export const filterByOptions = [
  {
    label: 'Customer',
    value: 'customer',
    component: components.CustomerAutoComplete,
    componentProps: {
      //single: true,
      showAvatar: true,
      addLabel: 'Add new customer'
    },
    getValue: (value: any) => {
      //return param for query
      return value.length > 0 ? value.map((v: any) => v.id).join(',') : '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  },
  // {
  //   label: 'Priority',
  //   value: 'prioirty',
  //   component: components.PrioritySelect,
  //   componentProps: {},
  //   getValue: (value: any) => {
  //     //return param for query
  //     return value?.priority || '';
  //   },
  //   setValue: (value: any) => {
  //     //initial value for component
  //   }
  // },
  // {
  //   label: 'Product / Category',
  //   value: 'category',
  //   component: components.ProductCategorySelect,
  //   componentProps: {},
  //   getValue: (value: any) => {
  //     //return param for query
  //     return value?.category ? value.category.id : '';
  //   },
  //   setValue: (value: any) => {
  //     //initial value for component
  //   }
  // },
  // // { label: 'Assigned Group', value: 'assignedGroup' },
  // {
  //   label: 'Assigned Group / Rep',
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
    label: 'Owner',
    value: 'createdBy',
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
  {
    label: 'Process',
    value: 'process',
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
    label: 'Classification',
    value: 'classifications',
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
    label: 'Cc',
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
    label: 'Tag',
    value: 'tags',
    // component: components.TagsAutoComplete,
    componentProps: {
      // fetchList: useTicketTags,
      // fieldValue: 'id',
      // fieldLabel: 'name',
      // isMultiple: true
    },
    getValue: (value: any) => {
      //return param for query
      return value.length > 0 ? value.map((v: any) => v.id).join(',') : '';
    },
    setValue: (value: any) => {
      //initial value for component
    }
  }
];
