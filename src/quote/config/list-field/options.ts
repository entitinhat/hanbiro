//menu
import * as keyNames from '@quote/config/keyNames';
import * as components from '@quote/config/write-field/components';
import * as baseComponents from '@base/config/write-field/components';

//related menu
import { useGetModuleProcesses } from '@process/hooks/useModule';

//project base
import { LabelValue } from '@base/types/app';

//third-party
import { TextField } from '@mui/material';

//group by columns which displaying
export const FIELDS_GROUP_BY: any = {
  all: [
    keyNames.KEY_NAME_QUOTE_SALES_REP,
    keyNames.KEY_NAME_QUOTE_NAME,
    keyNames.KEY_NAME_QUOTE_CUSTOMER,
    keyNames.KEY_NAME_QUOTE_CODE,
    keyNames.KEY_NAME_QUOTE_DATE,
    keyNames.KEY_NAME_QUOTE_ITEMS,
    keyNames.KEY_NAME_QUOTE_STAGE,
    keyNames.KEY_NAME_QUOTE_STATUS,
    keyNames.KEY_NAME_QUOTE_SUMMARY
  ],
  myQuote: [],
  myGroupQuote: [],
  itemQuote: [],
  processQuote: [
    keyNames.KEY_NAME_QUOTE_PROCESS,
    keyNames.KEY_NAME_QUOTE_NAME,
    keyNames.KEY_NAME_QUOTE_CODE,
    keyNames.KEY_NAME_QUOTE_CUSTOMER,
    keyNames.KEY_NAME_QUOTE_DATE,
    keyNames.KEY_NAME_QUOTE_STAGE,
    keyNames.KEY_NAME_QUOTE_STATUS,
    keyNames.KEY_NAME_QUOTE_SUMMARY,
    keyNames.KEY_NAME_QUOTE_SALES_REP
  ],
  deletedQuote: []
};

//custom hidden fields for group by
export const HIDDEN_FIELDS_GROUP_BY: { [key: string]: any } = {};

//cannot change in column settings
export const BASE_FIELDS = [keyNames.KEY_NAME_QUOTE_NAME, keyNames.KEY_NAME_QUOTE_CODE];

//disabled sortBy columns
export const DISABLED_SORT_FIELDS = [keyNames.KEY_NAME_QUOTE_ITEMS, keyNames.KEY_NAME_QUOTE_SUMMARY];

export const groupByOptions: LabelValue[] = [
  { label: 'All', value: 'all' },
  { label: 'My Quotes', value: 'myQuote' },
  { label: 'My Group Quotes', value: 'myGroupQuote' },
  { label: 'Quotes per Customer', value: 'customerQuote' },
  { label: 'Quotes per Item', value: 'itemQuote' },
  { label: 'Quotes per Process', value: 'processQuote' },
  { label: 'Deleted Quotes', value: 'deletedQuote' }
];

export const dateByOptions: LabelValue[] = [
  { label: 'Quote Date', value: keyNames.KEY_NAME_QUOTE_DATE },
  { label: 'Expiry Date', value: keyNames.KEY_NAME_QUOTE_EXPIRY_DATE },
  { label: 'Created Date', value: keyNames.KEY_NAME_QUOTE_CREATED_AT },
  { label: 'Updated Date', value: keyNames.KEY_NAME_QUOTE_UPDATED_AT },
  { label: 'Closed Date', value: keyNames.KEY_NAME_QUOTE_CLOSED_AT }
];

export const filterByOptions = [
  {
    label: 'Customer',
    value: keyNames.KEY_NAME_QUOTE_CUSTOMER,
    component: components.CustomerAutoComplete,
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
    label: 'Sales Rep',
    value: keyNames.KEY_NAME_QUOTE_SALES_REP,
    component: components.UserAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Product',
    value: keyNames.KEY_NAME_QUOTE_PRODUCT,
    component: components.ProductAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Item',
    value: keyNames.KEY_NAME_QUOTE_PRODUCT_ITEM,
    component: components.ItemAutoComplete,
    getValue: (value: any) => {
      return value?.length > 0 ? value?.map((v: any) => v?.id).join(',') : '';
    },
    setValue: (value: string) => {
      return value ? value.split(',') : [];
    }
  },
  {
    label: 'Process',
    value: keyNames.KEY_NAME_QUOTE_PROCESS,
    component: baseComponents.LookUp,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' },
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
    label: 'Stage',
    value: keyNames.KEY_NAME_QUOTE_STAGE,
    component: baseComponents.SelectBox,
    componentProps: {
      options: []
    }
  },
  {
    label: 'Status',
    value: keyNames.KEY_NAME_QUOTE_STATUS,
    component: baseComponents.SelectBox,
    componentProps: {
      options: []
    }
  },
  {
    label: 'Total Amount',
    value: keyNames.KEY_NAME_QUOTE_TOTAL_AMOUNT,
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
    label: 'Owner',
    value: keyNames.KEY_NAME_QUOTE_CREATED_BY,
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
    value: keyNames.KEY_NAME_QUOTE_NAME,
    label: 'Quote Name'
  },
  {
    value: keyNames.KEY_NAME_QUOTE_STAGE,
    label: 'Stage'
  },
  {
    value: keyNames.KEY_NAME_QUOTE_CREATED_AT,
    label: 'Created At'
  },
  {
    value: keyNames.KEY_NAME_QUOTE_UPDATED_AT,
    label: 'Updated At'
  }
];
