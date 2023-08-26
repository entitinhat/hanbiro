import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import * as components from '@settings/digital/ticket-form/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';

export default {
  [keyNames.KEY_TICKET_FORM_NAME]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_TICKET_FORM_LANGUAGE]: {
    component: components.LanguageSelect,
    componentProps: {},
    showFullRow: true,
    defaultValue: 'en'
  },
  [keyNames.KEY_TICKET_FORM_PRODUCTS]: {
    component: components.ProductAutoComplete,
    componentProps: {
      showAllOption: true
    },
    defaultValue: [],
    showFullRow: true
  },
  [keyNames.KEY_TICKET_FORM_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      multiline: true,
      rows: 5
    },
    defaultValue: '',
    showFullRow: true,
    parseParam: (value: string) => value
  }
};
