import MuiRadioGroup from '@base/components/@hanbiro/RadioGroup';
import { LabelValue } from '@base/types/app';
import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import { CRITERIA_TYPES } from '@process/components/Diagram/Criteria';
import {
  KEY_NAME_SETTING_CRITERIA_DESCRIPTION,
  KEY_NAME_SETTING_CRITERIA_NAME,
  KEY_NAME_SETTING_CRITERIA_STATUSES,
  KEY_NAME_SETTING_CRITERIA_TYPE
} from '@process/config/keyNames';
import { CriteriaSettingWrite } from './components';

export const CriteriaWriteField = {
  [KEY_NAME_SETTING_CRITERIA_NAME]: {
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
    languageKey: 'ncrm_process_criteria_name'
  },
  [KEY_NAME_SETTING_CRITERIA_TYPE]: {
    component: MuiRadioGroup,
    defaultValue: CRITERIA_TYPES[0],
    componentProps: {
      options: CRITERIA_TYPES,
      isVertical: false
    },
    validate: {
      required: validators.required
    },
    showFullRow: false,
    languageKey: 'ncrm_process_criteria_type',
    parseParam: (v: LabelValue) => v.value
  },
  [KEY_NAME_SETTING_CRITERIA_DESCRIPTION]: {
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
  [KEY_NAME_SETTING_CRITERIA_STATUSES]: {
    component: CriteriaSettingWrite,
    showFullRow: true,
    languageKey: 'ncrm_process_criteria_statuses',
    defaultValue: null
  }
};

export default CriteriaWriteField;
