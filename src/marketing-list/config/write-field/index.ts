import * as keyNames from '@marketing-list/config/keyNames';
import * as components from '@marketing-list/config/write-field/components';
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { LABEL_VALUE_BIRTHDAY, LABEL_VALUE_CUSTOM_WEB } from '@base/config/constant';
import { TextField } from '@mui/material';
import { t } from 'i18next';
import Switch from '@base/components/@hanbiro/Switch';
import { MARKETING_TYPE_OPTIONS } from '@marketing-list/config/constants';
import SelectBox from '@base/components/@hanbiro/SelectBox';

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
  [keyNames.KEY_NAME_CUSTOMER_MARKETING_TYPE]: {
    component: SelectBox,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off',
      options: MARKETING_TYPE_OPTIONS
    },
    showFullRow: true,
    defaultValue: MARKETING_TYPE_OPTIONS[0],
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_ACTIVE]: {
    component: Switch,
    //component: baseComponents.NumberRangeField,
    componentProps: {
      // fullWidth: true,
      // autoComplete: 'off'
    },
    // showFullRow: true,
    defaultValue: false,
    //parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  },
  [keyNames.KEY_NAME_CUSTOMER_MARKETING_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      multiline: true,
      rows: 2,
      placeholder: 'Autosize height based on content lines'
    },
    defaultValue: '',
    parseParam: (value: any) => value
  }
};
