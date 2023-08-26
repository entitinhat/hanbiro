import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import { initStatusForm } from '@process/components/Diagram/Status/StatusWrite';
import {
  KEY_NAME_SETTING_ACTION_DESCRIPTION,
  KEY_NAME_SETTING_ACTION_NAME,
  KEY_NAME_SETTING_ACTION_STATUSES
} from '@process/config/keyNames';

import { ActionSettingWrite } from './components';

export const ActionWriteField = {
  [KEY_NAME_SETTING_ACTION_NAME]: {
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
    languageKey: 'ncrm_process_action_name'
  },
  [KEY_NAME_SETTING_ACTION_DESCRIPTION]: {
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
  [KEY_NAME_SETTING_ACTION_STATUSES]: {
    component: ActionSettingWrite,
    showFullRow: true,
    languageKey: 'ncrm_process_action_statuses',
    defaultValue: null
  }
};

export default ActionWriteField;
