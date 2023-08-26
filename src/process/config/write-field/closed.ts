import { MuiRadioGroup, SelectBox } from '@base/config/write-field/components';
import { LabelValue } from '@base/types/app';
import { OptionValue } from '@base/types/common';
import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';
import * as keyNames from '@process/config/keyNames';

import { PROCESS_CLOSED_PROPERTY_OPTIONS, PROCESS_CLOSED_VIEW_OPTIONS } from '../constants';
import { SwitchWrite } from './components';

const ClosedWriteField = {
  [keyNames.KEY_NAME_CLOSED_NAME]: {
    component: TextField,
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: '',
    languageKey: 'process_closed_name',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_CLOSED_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    showFullRow: true,
    languageKey: 'process_closed_description',
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_CLOSED_PROPERTY]: {
    component: SelectBox,
    showFullRow: true,
    defaultValue: PROCESS_CLOSED_PROPERTY_OPTIONS[0],
    languageKey: 'process_closed_property',
    componentProps: {
      options: PROCESS_CLOSED_PROPERTY_OPTIONS
    },
    parseParam: (v: OptionValue) => v.keyName
  },
  [keyNames.KEY_NAME_CLOSED_VIEW]: {
    component: MuiRadioGroup,
    showFullRow: true,
    defaultValue: PROCESS_CLOSED_VIEW_OPTIONS[0],
    languageKey: 'process_closed_view',
    componentProps: {
      options: PROCESS_CLOSED_VIEW_OPTIONS,
      isHorizontal: true
    },
    parseParam: (v: LabelValue) => v.value
  },
  [keyNames.KEY_NAME_CLOSED_JUMP]: {
    component: SwitchWrite,
    showFullRow: true,
    defaultValue: false,
    componentProps: {
      label: 'process_business_form_msg_possible_to_jump'
    },
    hideTitle: true,
    languageKey: 'process_closed_jump'
  }
};

export default ClosedWriteField;
