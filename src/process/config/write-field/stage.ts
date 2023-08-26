import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import * as keyNames from '@process/config/keyNames';

export const StageWriteField = {
  [keyNames.KEY_NAME_STAGE_NAME]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: validators.required
    },
    defaultValue: '',
    showFullRow: true,
    languageKey: 'process_stage_name',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_STAGE_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    defaultValue: '',
    showFullRow: true,
    languageKey: 'process_stage_description',
    parseParam: (value: string) => value
  },
  // [keyNames.KEY_NAME_STAGE_PROPERTY]: {
  //   component: Switch,
  //   showFullRow: true,
  //   defaultValue: false,
  //   componentProps: {
  //     label: 'process_stage_property',
  //   },
  //   hideTitle: true,
  //   parseParam: (value: boolean) => value,
  // },
};

export default StageWriteField;
