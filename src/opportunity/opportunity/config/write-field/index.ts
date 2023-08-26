//third-party
import { TextField } from '@mui/material';
//import { t } from 'i18next';

//project base
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { MENU_OPPORTUNITY } from '@base/config/menus';

//menu
import * as keyNames from '@opportunity/config/keyNames';
import * as components from '@opportunity/config/write-field/components';
import { useGetModuleProcesses } from '@process/hooks/useModule';
import { OPPORTUNITY_TYPE_NEW_CUSTOMER } from '@opportunity/config/constants';
import { CUSTOMER_CATEGORY_ACCOUNT } from '@customer/config/constants';

export default {
  [keyNames.KEY_NAME_OPPORTUNITY_CODE]: {
    component: baseComponents.CodeGenerator,
    componentProps: {
      menu: MENU_OPPORTUNITY
    },
    //showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_OPPORTUNITY_TITLE]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    showFullRow: true,
    validate: {
      required: (v: string) => validators.required(v) || 'Title is required.'
    },
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_OPPORTUNITY_TYPE]: {
    component: components.OpportunityType,
    componentProps: {},
    //showFullRow: true,
    defaultValue: {
      type: OPPORTUNITY_TYPE_NEW_CUSTOMER,
      customerType: CUSTOMER_CATEGORY_ACCOUNT
    },
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PRODUCT]: {
    component: components.ProductAutoComplete,
    componentProps: {
      single: false
    },
    //showFullRow: true,
    defaultValue: [],
    parseParam: (value: any) => (value ? value.map((_ele: any) => ({ id: _ele.id, name: _ele.name })) : [])
  },
  [keyNames.KEY_NAME_OPPORTUNITY_CUSTOMER]: {
    component: components.CustomerField,
    componentProps: {
      category: 'account' //default
    },
    showFullRow: true,
    validate: {
      required: (data: any) => validators.required(data?.name || '') || 'Customer name is required.'
    },
    defaultValue: null,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_OPPORTUNITY_SALES_REP]: {
    component: components.SalesRepTeam,
    componentProps: {
      single: false
    },
    //showFullRow: true,
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => value //(value ? value.map((_ele: any) => ({ type: 'TYPE_USER', id: _ele.id, name: _ele.name })) : [])
  },
  [keyNames.KEY_NAME_OPPORTUNITY_REFERRER]: {
    component: components.CustomerReferrer,
    componentProps: {},
    //showFullRow: true,
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => (value ? { id: value.id, name: value.name } : null)
  },
  [keyNames.KEY_NAME_OPPORTUNITY_PROCESS]: {
    component: baseComponents.LookUp,
    componentProps: {
      fetchList: useGetModuleProcesses,
      fieldValue: 'id',
      fieldLabel: 'name',
      extraParams: { module: 'MODULE_TICKET' }, //MODULE_QUOTE
      isSearch: false
    },
    //showFullRow: true,
    validate: {
      //required: validators.required
      required: (v: string) => validators.required(v) || 'Process is required.'
    },
    defaultValue: null,
    parseParam: (value: any) => (value ? { id: value.id, name: value.name } : null)
  },
  [keyNames.KEY_NAME_OPPORTUNITY_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      multiline: true,
      rows: 2
    },
    showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  }
};
