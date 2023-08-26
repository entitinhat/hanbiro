import * as keyNames from '@customer/config/keyNames';
import * as components from '@customer/config/write-field/components';
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import BaseConfigs from '@customer/config/write-field';
import { TextField } from '@mui/material';
import { Customer } from '@customer/types/interface';

export default {
  ...BaseConfigs,
  [keyNames.KEY_NAME_CUSTOMER_CODE]: {
    component: baseComponents.CodeGenerator,
    componentProps: {
      menu: 'contact'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    //parseValue: (valueApi: string) => valueApi || '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_CONTACT_TYPE]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      single: true,
      sourceKey: 'contact_type',
      sourceType: 'field',
      keyOptionValue: 'keyName', //'id'
      keyOptionLabel: 'languageKey'
    },
    //showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    //parseValue: (valueApi: any) => valueApi || null,
    parseParam: (value: any) => value?.keyName || ''
  },
  [keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      single: true,
      sourceKey: 'employee_role',
      sourceType: 'field'
    },
    //showFullRow: true,
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => ({ id: value.keyName, name: value.languageKey })
  },
  [keyNames.KEY_NAME_CUSTOMER_ACCOUNT]: {
    component: components.CustomerAutoComplete,
    componentProps: {
      single: true,
      category: 'account'
    },
    //showFullRow: true,
    validate: {
      required: (v: Customer) => validators.required(v.id) || 'Account is required.'
    },
    defaultValue: null,
    parseParam: (value: any) => ({
      id: value.id,
      name: value.name
    })
  },
  [keyNames.KEY_NAME_CUSTOMER_POSITION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {},
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_DEPARTMENT]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {},
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_JOB]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      sourceKey: 'job_position',
      sourceType: 'field',
      single: true
    },
    validate: {},
    defaultValue: null,
    //parseParam: (value: any) => (value ? value.keyName : '')
    parseParam: (value: any) => ({ id: value.keyName, name: value.languageKey })
  }
};
