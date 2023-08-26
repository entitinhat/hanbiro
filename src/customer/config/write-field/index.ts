//third-party
import { TextField } from '@mui/material';
import { t } from 'i18next';

//project base
import * as keyNames from '@customer/config/keyNames';
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { LABEL_VALUE_BIRTHDAY, LABEL_VALUE_CUSTOM_WEB } from '@base/config/constant';

//menu
import * as components from '@customer/config/write-field/components';

export default {
  [keyNames.KEY_NAME_CUSTOMER_NAME]: {
    component: TextField,
    //component: baseComponents.NumberRangeField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: (v: string) => validators.required(v) || 'Name is required.'
    },
    showFullRow: true,
    defaultValue: '',
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_PHOTO]: {
    component: components.ImageUpload,
    componentProps: {},
    validate: {},
    defaultValue: null,
    //parseValue: (valueApi: any) => valueApi || null,
    parseParam: (value: any) => value //File[]
  },
  [keyNames.KEY_NAME_CUSTOMER_EMAIL]: {
    component: baseComponents.EmailInput,
    componentProps: {
      isMultiple: true
    },
    validate: {
      emails: validators.emails //'emails' --> error key
    },
    defaultValue: [],
    //showFullRow: true,
    //parseValue: (valueApi: any) => valueApi || [],
    parseParam: (value: any) =>
      value?.map((_ele: any) => ({
        label: _ele.label?.label || '',
        labelValue: _ele.labelValue,
        email: _ele.email
      }))
  },
  [keyNames.KEY_NAME_CUSTOMER_GENDER]: {
    component: baseComponents.GenderSelect,
    componentProps: {},
    validate: {},
    defaultValue: null,
    //parseValue: (valueApi: any) => valueApi || null,
    parseParam: (value: any) => value.value || ''
  },
  [keyNames.KEY_NAME_CUSTOMER_PHONES]: {
    component: baseComponents.PhoneInput,
    componentProps: {
      isMultiple: true
    },
    validate: {},
    defaultValue: [],
    //showFullRow: true,
    //parseValue: (valueApi: any) => valueApi || [],
    parseParam: (value: any) =>
      value
        ?.filter((_ele: any) => _ele.phoneNumber.length > 0 && _ele.country.length > 0)
        ?.map((_ele: any) => ({
          label: _ele.label?.label || '',
          labelValue: _ele.labelValue,
          country: _ele.country,
          phoneNumber: _ele.phoneNumber,
          extension: _ele.extension
        }))
  },
  [keyNames.KEY_NAME_CUSTOMER_MOBILE]: {
    component: baseComponents.MobileInput,
    componentProps: {
      isMultiple: true
    },
    validate: {},
    defaultValue: [],
    //showFullRow: true,
    //parseValue: (valueApi: any) => valueApi || [],
    parseParam: (value: any) =>
      value
        ?.filter((_ele: any) => _ele.mobileNumber.length > 0)
        ?.map((_ele: any) => ({
          label: _ele.label?.label || '',
          labelValue: _ele.labelValue,
          country: _ele.country,
          mobileNumber: _ele.mobileNumber
          //extension: _ele.extension,
        }))
  },
  // [keyNames.KEY_NAME_CUSTOMER_ADDRESSES]: {
  //   component: baseComponents.AddressInput,
  //   componentProps: {
  //     isMultiple: true
  //   },
  //   defaultValue: [],
  //   //showFullRow: true,
  //   //parseValue: (valueApi: any) => valueApi || [],
  //   parseParam: (value: any) =>
  //     value
  //       .filter((_ele: any) => _ele.street.length > 0)
  //       .map((_ele: any) => ({
  //         //label: _ele.label?.label,
  //         //labelValue: _ele.labelValue,
  //         country: _ele.country?.isoCode2,
  //         addrState: _ele.state,
  //         city: _ele.city,
  //         street: _ele.street,
  //         zipcode: _ele.zipcode
  //       }))
  // },
  [keyNames.KEY_NAME_CUSTOMER_BILL_ADDRESSES]: {
    component: baseComponents.AddressInput,
    componentProps: {
      isMultiple: false
    },
    defaultValue: null,
    //showFullRow: true,
    //parseValue: (valueApi: any) => valueApi || [],
    parseParam: (value: any) =>
      // value
      //   .filter((_ele: any) => _ele.street.length > 0)
      //   .map((_ele: any) => ({
      //     //label: _ele.label?.label,
      //     //labelValue: _ele.labelValue,
      //     country: _ele.country?.isoCode2,
      //     addrState: _ele.state,
      //     city: _ele.city,
      //     street: _ele.street,
      //     zipcode: _ele.zipcode
      //   }))
      value
        ? {
            //label: _ele.label?.label,
            //labelValue: _ele.labelValue,
            country: value.country?.isoCode2,
            addrState: value.state,
            city: value.city,
            street: value.street,
            zipcode: value.zipcode
          }
        : null
  },
  [keyNames.KEY_NAME_CUSTOMER_SHIP_ADDRESSES]: {
    component: baseComponents.AddressInput,
    componentProps: {
      isMultiple: false
    },
    defaultValue: null,
    //showFullRow: true,
    //parseValue: (valueApi: any) => valueApi || [],
    parseParam: (value: any) =>
      // value
      //   .filter((_ele: any) => _ele.street.length > 0)
      //   .map((_ele: any) => ({
      //     //label: _ele.label?.label,
      //     //labelValue: _ele.labelValue,
      //     country: _ele.country?.isoCode2,
      //     addrState: _ele.state,
      //     city: _ele.city,
      //     street: _ele.street,
      //     zipcode: _ele.zipcode
      //   }))
      value
        ? {
            //label: _ele.label?.label,
            //labelValue: _ele.labelValue,
            country: value.country?.isoCode2,
            addrState: value.state,
            city: value.city,
            street: value.street,
            zipcode: value.zipcode
          }
        : null
  },
  [keyNames.KEY_NAME_CUSTOMER_TYPE]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      sourceType: 'field',
      sourceKey: 'customer_category',
      //sourceMenu: 'customer',
      single: true
    },
    validate: {
      required: validators.required
    },
    //showFullRow: true,
    defaultValue: null,
    //parseValue: (valueApi: any) => valueApi || null,
    parseParam: (value: any) => value?.keyName || ''
  },
  [keyNames.KEY_NAME_CUSTOMER_INDUSTRIES]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      single: false,
      sourceKey: 'industry',
      sourceType: 'field'
    },
    //showFullRow: true,
    validate: {},
    defaultValue: [],
    parseParam: (value: any) =>
      value.map((_ele: any) => ({
        id: _ele.keyName,
        name: t(_ele.languageKey) //_ele.keyName
      }))
  },
  [keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES]: {
    component: baseComponents.AnniversaryInput,
    componentProps: {
      isMultiple: true
    },
    validate: {},
    defaultValue: [],
    //showFullRow: true,
    //parseValue: (valueApi: any) => valueApi || [],
    parseParam: (value: any) =>
      value.map((_ele: any) => ({
        label: _ele.label?.label || LABEL_VALUE_BIRTHDAY,
        labelValue: _ele?.labelValue || '',
        anniversary: _ele.anniversary
      }))
  },
  [keyNames.KEY_NAME_CUSTOMER_WEBSITES]: {
    component: baseComponents.WebsiteInput,
    componentProps: {
      isMultiple: false
    },
    validate: {},
    //showFullRow: true,
    defaultValue: [],
    //parseValue: (valueApi: any) => valueApi || [],
    parseParam: (value: any) => ({
      //label: value.label?.label || LABEL_VALUE_CUSTOM_WEB,
      //labelValue: value?.labelValue || '',
      website: value.website,
      protocol: value.protocol
    })
    // value.map((_ele: any) => ({
    //   label: _ele.label?.label || LABEL_VALUE_CUSTOM_WEB,
    //   labelValue: _ele?.labelValue || '',
    //   website: _ele.website,
    //   protocol: _ele.protocol
    // }))
  },
  [keyNames.KEY_NAME_CUSTOMER_ASSIGN_TO]: {
    component: components.UserAutoComplete,
    componentProps: {
      showAvatar: true,
      single: false
    },
    validate: {},
    defaultValue: [],
    //parseValue: (valueApi: any) => valueApi || null,
    parseParam: (value: any[]) =>
      value?.map((_ele: any) => ({
        user: {
          id: _ele.id ? _ele.id : '',
          name: _ele.name ? _ele.name : ''
        },
        group: {
          id: _ele.properties?.crmGroups?.length > 0 ? _ele.properties?.crmGroups[0]?.id : '',
          name: _ele.properties?.crmGroups?.length > 0 ? _ele.properties?.crmGroups[0]?.name : ''
        }
      }))
  },
  [keyNames.KEY_NAME_CUSTOMER_DESCRIPTION]: {
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
