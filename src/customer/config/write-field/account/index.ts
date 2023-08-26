import * as keyNames from '@customer/config/keyNames';
import * as components from '@customer/config/write-field/components';
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import BaseConfigs from '@customer/config/write-field';
import { TextField } from '@mui/material';

export default {
  ...BaseConfigs,
  [keyNames.KEY_NAME_CUSTOMER_CODE]: {
    component: baseComponents.CodeGenerator,
    componentProps: {
      menu: 'account'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    //parseValue: (valueApi: string) => valueApi || '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_EMPLOYEES_NUMBER]: {
    component: TextField,
    componentProps: {
      type: 'number',
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {},
    //showFullRow: true,
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_ANNUAL_REVENUE]: {
    component: baseComponents.NumberField,
    componentProps: {
      prefix: '$',
      thousandSeparator: ','
    },
    validate: {},
    //showFullRow: true,
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_MAIN_PRODUCT]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {},
    //showFullRow: true,
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_BUSINESS_NUMBER]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {},
    //showFullRow: true,
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: string) => value
  },

  // TODO - not on WRITE FORM - FOR later-On
  // [keyNames.KEY_NAME_CUSTOMER_PREFERRED]: {
  //   //component: components.Input, //--> Checkbox
  //   component: TextField,
  //   componentProps: {
  //     fullWidth: true
  //   },
  //   validate: {},
  //   defaultValue: false,
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: boolean) => value
  // },
  // [keyNames.KEY_NAME_CUSTOMER_SALES_COMMISSION]: {
  //   //component: components.Input, //-->TODO: Select
  //   component: TextField,
  //   componentProps: {
  //     fullWidth: true
  //   },
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value
  // },
  [keyNames.KEY_NAME_CUSTOMER_PARENT_ACCOUNT]: {
    component: components.CustomerAutoComplete,
    componentProps: {
      single: true,
      category: 'account'
    },
    validate: {},
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_SLA]: {
    //component: components.Input, //-->TODO select
    component: TextField,
    componentProps: {
      fullWidth: true
    },
    validate: {},
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_FAX]: {
    component: baseComponents.FaxInput,
    componentProps: {
      isMultiple: true
    },
    validate: {},
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) =>
      value
        ?.filter((_ele: any) => _ele.faxNumber.length > 0)
        ?.map((_ele: any) => ({
          label: _ele.label?.label || '',
          labelValue: _ele.labelValue,
          country: _ele.country,
          faxNumber: _ele.faxNumber
        }))
  }

  // [keyNames.KEY_NAME_CUSTOMER_REFERRAL_REWARD]: {
  //   component: components.Input, //--> Select
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_SALES_PRODUCT]: {
  //   component: components.Input, //--> Select
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_RELATED_PRODUCT]: {
  //   component: components.Input, //--> Select
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_PAYMENT_TERM]: {
  //   component: components.Input, //--> Select
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_CURRENCY]: {
  //   component: components.Input, //--> Select
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_TAX]: {
  //   component: components.Input, //--> Select
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_CHARGE_LATE_FEE]: {
  //   component: components.Input, //--> Select
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },

  // [keyNames.KEY_NAME_CUSTOMER_OPENING_BALANCE]: {
  //   component: components.Input,
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_CREDIT_LIMIT]: {
  //   component: components.Input,
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_RECEIPT_TYPE]: {
  //   component: components.Input, // ---> Select
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_SEND_MODE]: {
  //   component: components.Input, // ---> radio
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: any) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_BUSINESS_FIELD]: {
  //   component: components.Input,
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: string) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_BUSINESS_NAME]: {
  //   component: components.Input,
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: string) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_BUSINESS_INDUSTRY]: {
  //   component: components.Input,
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: string) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_BUSINESS_TYPE]: {
  //   component: components.Input,
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: string) => value,
  // },
  // [keyNames.KEY_NAME_CUSTOMER_BUSINESS_AGENT]: {
  //   component: components.Input,
  //   validate: {},
  //   defaultValue: '',
  //   //parseValue: (valueApi: any) => valueApi || '',
  //   parseParam: (value: string) => value,
  // },
};
