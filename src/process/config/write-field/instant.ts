import { SelectBox } from '@base/config/write-field/components';
import { OptionValue } from '@base/types/common';
import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import { INSTANT_ACTION_TYPE_OPTIONS } from '@process/config/constants';
import {
    KEY_NAME_AUTOMATION_INSTANT_FIELD, KEY_NAME_AUTOMATION_INSTANT_MESSAGE,
    KEY_NAME_AUTOMATION_INSTANT_NAME, KEY_NAME_AUTOMATION_INSTANT_TARGET_CUSTOMER,
    KEY_NAME_AUTOMATION_INSTANT_TARGET_USER, KEY_NAME_AUTOMATION_INSTANT_TEMPLATE,
  KEY_NAME_AUTOMATION_INSTANT_TYPE
} from '@process/config/keyNames';
import {
    CustomerAutoComplete, FieldValue, UserAutoComplete
} from '@process/config/write-field/components';

export const InstantWriteField = {
  [KEY_NAME_AUTOMATION_INSTANT_NAME]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    languageKey: 'ncrm_process_automation_instant_name'
  },
  [KEY_NAME_AUTOMATION_INSTANT_TYPE]: {
    component: SelectBox,
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    languageKey: 'ncrm_process_automation_instant_type',
    componentProps: {
      options: INSTANT_ACTION_TYPE_OPTIONS
    }
  },
  [KEY_NAME_AUTOMATION_INSTANT_TARGET_USER]: {
    component: UserAutoComplete,
    componentProps: {
      single: false,
      showAvatar: false,
      placement: 'left'
    },
    showFullRow: true,
    defaultValue: [],
    languageKey: 'ncrm_process_automation_instant_assign_user',
    parseParam: (v: any) => {
      return v
        ? v.map((val: any) => {
            return {
              id: val.id,
              name: val.name
            };
          })
        : null;
    }
  },
  [KEY_NAME_AUTOMATION_INSTANT_TARGET_CUSTOMER]: {
    component: CustomerAutoComplete,
    componentProps: {
      single: false,
      showAvatar: false,
      showEmail: false,
      placement: 'left'
    },
    showFullRow: true,
    defaultValue: [],
    languageKey: 'ncrm_process_automation_instant_customer',
    parseParam: (v: any) => {
      return v
        ? v.map((val: any) => {
            return {
              id: val.id,
              name: val.name
            };
          })
        : null;
    }
  },
  [KEY_NAME_AUTOMATION_INSTANT_TEMPLATE]: {
    component: SelectBox,
    showFullRow: true,
    componentProps: {
      options: []
    },
    defaultValue: null,
    languageKey: 'ncrm_process_automation_instant_template',
    parseParam: (value: OptionValue) =>
      value
        ? {
            id: value.keyName,
            name: value.languageKey
          }
        : null
  },
  [KEY_NAME_AUTOMATION_INSTANT_FIELD]: {
    component: FieldValue,
    showFullRow: true,
    defaultValue: null,
    componentProps: {
      module: ''
    },
    languageKey: 'ncrm_process_automation_instant_field'
  },
  [KEY_NAME_AUTOMATION_INSTANT_MESSAGE]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    showFullRow: true,
    defaultValue: '',
    languageKey: 'ncrm_process_automation_instant_outbound_message'
  }
};

export default InstantWriteField;
