//menu
import * as keyNames from '@opportunity/config/keyNames';
import * as components from '@opportunity/config/write-field/components';
import * as baseComponents from '@base/config/write-field/components';

//project base
import { LabelValue } from '@base/types/app';
import { useGetModuleProcesses } from '@process/hooks/useModule';

//menu
import { OPPORTUNITY_TYPES } from '../constants';

export const OPPORTUNITY_GROUP_BY_ALL = 'all';
export const OPPORTUNITY_GROUP_BY_MY = 'myOpportunity';
export const OPPORTUNITY_GROUP_BY_MY_GROUP = 'myGroupOpportunity';
export const OPPORTUNITY_GROUP_BY_CUSTOMER = 'opportunityPerCustomer';
export const OPPORTUNITY_GROUP_BY_PRODUCT = 'opportunityPerProduct';
export const OPPORTUNITY_GROUP_BY_COMPETITOR = 'opportunityPerCompetitor';
export const OPPORTUNITY_GROUP_BY_PROCESS = 'opportunityPerProcess';
export const OPPORTUNITY_GROUP_BY_DELETED = 'deletedOpportunity';

//custom fields for group by
export const FIELDS_GROUP_BY: any = {
  [OPPORTUNITY_GROUP_BY_ALL]: [],
  [OPPORTUNITY_GROUP_BY_MY]: [],
  [OPPORTUNITY_GROUP_BY_MY_GROUP]: [keyNames.KEY_NAME_OPPORTUNITY_CREATED_BY],
  [OPPORTUNITY_GROUP_BY_CUSTOMER]: [keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER],
  [OPPORTUNITY_GROUP_BY_PRODUCT]: [keyNames.KEY_NAME_OPPORTUNITY_PRODUCT],
  [OPPORTUNITY_GROUP_BY_COMPETITOR]: [keyNames.KEY_NAME_OPPORTUNITY_COMPETITOR],
  [OPPORTUNITY_GROUP_BY_PROCESS]: [keyNames.KEY_NAME_OPPORTUNITY_PROCESS],
  [OPPORTUNITY_GROUP_BY_DELETED]: [
    keyNames.KEY_NAME_OPPORTUNITY_TITLE,
    keyNames.KEY_NAME_OPPORTUNITY_DELETED_BY,
    keyNames.KEY_NAME_OPPORTUNITY_DELETED_AT
  ]
};

//custom hidden fields for group by
export const HIDDEN_FIELDS_GROUP_BY: { [key: string]: any } = {};

//cannot change in column settings
export const BASE_FIELDS = [keyNames.KEY_NAME_OPPORTUNITY_TITLE, keyNames.KEY_NAME_OPPORTUNITY_CODE];

//disabled sortBy columns
export const DISABLED_SORT_FIELDS = [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP, keyNames.KEY_NAME_OPPORTUNITY_PRODUCT];

export const groupByOptions: LabelValue[] = [
  { label: 'All', value: OPPORTUNITY_GROUP_BY_ALL },
  { label: 'My Opportunities', value: OPPORTUNITY_GROUP_BY_MY },
  { label: 'My Group Opportunities', value: OPPORTUNITY_GROUP_BY_MY_GROUP },
  { label: 'Opportunities per Customer', value: OPPORTUNITY_GROUP_BY_CUSTOMER },
  { label: 'Opportunities per Product', value: OPPORTUNITY_GROUP_BY_PRODUCT },
  { label: 'Opportunities per Competitor', value: OPPORTUNITY_GROUP_BY_COMPETITOR },
  { label: 'Opportunities per Process', value: OPPORTUNITY_GROUP_BY_PROCESS },
  { label: 'Deleted Opportunities', value: OPPORTUNITY_GROUP_BY_DELETED }
];

export const dateByOptions: LabelValue[] = [
  { label: 'Created Date', value: keyNames.KEY_NAME_OPPORTUNITY_CREATED_AT },
  { label: 'Updated Date', value: keyNames.KEY_NAME_OPPORTUNITY_UPDATED_AT },
  { label: 'Closed Date', value: keyNames.KEY_NAME_OPPORTUNITY_CLOSE_DATE }
];

export const filterByOptions = [
  {
    label: 'Customer',
    value: keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER,
    component: components.CustomerAutoComplete,
    componentProps: {
      //category: 'account'
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Type',
    value: keyNames.KEY_NAME_OPPORTUNITY_TYPE,
    component: baseComponents.SelectBox,
    componentProps: {
      options: OPPORTUNITY_TYPES
    },
    getValue: (value: any) => {
      return value?.keyName || '';
    },
    setValue: (value: string) => {
      return OPPORTUNITY_TYPES.find((_ele: any) => _ele.keyName === value);
    }
  },
  {
    label: 'Sales Rep',
    value: keyNames.KEY_NAME_OPPORTUNITY_SALES_REP,
    component: components.UserAutoComplete,
    componentProps: {},
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Referrer',
    value: keyNames.KEY_NAME_OPPORTUNITY_REFERRER,
    component: components.CustomerAutoComplete,
    componentProps: {},
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Product',
    value: keyNames.KEY_NAME_OPPORTUNITY_PRODUCT,
    component: components.ProductAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Competitor',
    value: keyNames.KEY_NAME_OPPORTUNITY_COMPETITOR,
    component: components.CompetitorAutoComplete,
    componentProps: {
      single: false
    },
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Process',
    value: keyNames.KEY_NAME_OPPORTUNITY_PROCESS,
    component: baseComponents.LookUp,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' }, //TODO
      isSearch: false
    },
    getValue: (value: any) => {
      return value ? value.id : '';
    },
    setValue: (value: string) => {
      return value;
    }
  },
  {
    label: 'Estimated Revenue',
    value: keyNames.KEY_NAME_OPPORTUNITY_ESTIMATED_REVENUE,
    component: baseComponents.NumberRangeField,
    componentProps: {
      prefix: '',
      type: 'money',
      size: 'xs'
    },
    getValue: (value: any) => {
      //return `${value?.from || 0},${value?.to || 0}`;
      return [value?.from || 0, value?.to || 0];
    },
    setValue: (value: any) => {
      return value?.length > 0 ? { from: value[0], to: value[1] } : null;
    }
  },
  {
    label: 'Probability',
    value: keyNames.KEY_NAME_OPPORTUNITY_WIN_PROBABILITY,
    component: baseComponents.NumberRangeField,
    componentProps: {
      prefix: '%',
      type: 'number',
      size: 'xs'
    },
    getValue: (value: any) => {
      //return `${value?.from || 0},${value?.to || 0}`;
      return [value?.from || 0, value?.to || 0];
    },
    setValue: (value: any) => {
      return value?.length > 0 ? { from: value[0], to: value[1] } : null;
    }
  },
  {
    label: 'Owner',
    value: keyNames.KEY_NAME_OPPORTUNITY_CREATED_BY,
    component: components.UserAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  }
];

export const searchFields: LabelValue[] = [
  {
    value: 'name',
    label: 'Name'
  }
];

export const sortByOptions: LabelValue[] = [
  {
    value: keyNames.KEY_NAME_OPPORTUNITY_TITLE,
    label: 'Opportunity Title'
  },
  {
    value: keyNames.KEY_NAME_OPPORTUNITY_CREATED_AT,
    label: 'Created On'
  },
  {
    value: keyNames.KEY_NAME_OPPORTUNITY_UPDATED_AT,
    label: 'Updated On'
  }
];
