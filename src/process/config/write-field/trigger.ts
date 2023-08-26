import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import {
  KEY_NAME_SETTING_TRIGGER_DESCRIPTION,
  KEY_NAME_SETTING_TRIGGER_NAME,
  KEY_NAME_SETTING_TRIGGER_TRIGGER
} from '@process/config/keyNames';
import { TriggerSettingWrite } from './components';

export const TriggerWriteField = {
  [KEY_NAME_SETTING_TRIGGER_NAME]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: (v: string) => validators.required(v) || 'Name is required.'
    },
    defaultValue: '',
    languageKey: 'ncrm_process_trigger_name'
  },
  [KEY_NAME_SETTING_TRIGGER_DESCRIPTION]: {
    component: TextField,
    showFullRow: true,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    defaultValue: '',
    languageKey: 'ncrm_common_description'
  },
  [KEY_NAME_SETTING_TRIGGER_TRIGGER]: {
    component: TriggerSettingWrite,
    showFullRow: true,
    languageKey: 'ncrm_process_trigger_trigger'
  }
};

export default TriggerWriteField;
