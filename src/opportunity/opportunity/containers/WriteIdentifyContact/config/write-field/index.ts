//third-party
import { TextField } from '@mui/material';
//import { t } from 'i18next';

//project base
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';

//menu
import * as keyNames from '@opportunity/containers/WriteIdentifyContact/keyNames';
//import * as components from './components';
import { MENU_OPPORTUNITY_IDENTIFY_CONTACT } from '@base/config/menus';

export default {
  // [keyNames.KEY_NAME_IDENTIFY_CONTACT_CODE]: {
  //   component: baseComponents.CodeGenerator,
  //   componentProps: {
  //     menu: MENU_OPPORTUNITY_IDENTIFY_CONTACT
  //   },
  //   showFullRow: true,
  //   validate: {
  //     required: validators.required
  //   },
  //   defaultValue: '',
  //   parseParam: (value: string) => value
  // },
  [keyNames.KEY_NAME_IDENTIFY_CONTACT_NAME]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    showFullRow: true,
    validate: {
      required: (v: string) => validators.required(v) || 'Name is required.'
    },
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_IDENTIFY_CONTACT_BUYING_ROLE]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      single: true,
      sourceKey: 'buying_role',
      sourceType: 'setting',
      sourceMenu: 'sales',
      keyOptionValue: 'id',
      keyOptionLabel: 'name'
    },
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => ({ id: value.id, name: value.name })
  },
  [keyNames.KEY_NAME_IDENTIFY_CONTACT_MOBILE]: {
    component: baseComponents.MobileInput,
    componentProps: {
      isMultiple: true
    },
    validate: {},
    defaultValue: [],
    showFullRow: true,
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
  [keyNames.KEY_NAME_IDENTIFY_CONTACT_PHONE]: {
    component: baseComponents.PhoneInput,
    componentProps: {
      isMultiple: true
    },
    validate: {},
    defaultValue: [],
    showFullRow: true,
    parseParam: (value: any) =>
      value
        ?.filter((_ele: any) => _ele.phoneNumber.length > 0)
        ?.map((_ele: any) => ({
          label: _ele.label?.label || '',
          labelValue: _ele.labelValue,
          country: _ele.country,
          phoneNumber: _ele.phoneNumber,
          extension: _ele.extension
        }))
  },
  [keyNames.KEY_NAME_IDENTIFY_CONTACT_EMAIL]: {
    component: baseComponents.EmailInput,
    componentProps: {
      isMultiple: true
    },
    validate: {
      emails: validators.emails //'emails' --> error key
    },
    defaultValue: [],
    showFullRow: true,
    parseParam: (value: any) =>
      value?.map((_ele: any) => ({
        label: _ele.label?.label || '',
        labelValue: _ele.labelValue,
        email: _ele.email
      }))
  },
  [keyNames.KEY_NAME_IDENTIFY_CONTACT_DEPARTMENT]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_IDENTIFY_CONTACT_JOB]: {
    component: baseComponents.DataSourceSelect,
    componentProps: {
      sourceKey: 'job_position',
      sourceType: 'field',
      single: true
    },
    showFullRow: true,
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => ({ id: value.keyName, name: value.languageKey })
  }
};
