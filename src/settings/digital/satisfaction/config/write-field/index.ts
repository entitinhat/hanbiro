import * as keyNames from '@settings/digital/satisfaction/config/keyNames';
import * as components from '@settings/digital/satisfaction/config/write-field/components';
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { TextField } from '@mui/material';

export default {
  [keyNames.KEY_SATISFACTION_SURVEY_NAME]: {
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
  // [keyNames.KEY_SATISFACTION_SURVEY_TITLE]: {
  //   component: commonComponents.Input,
  //   componentProps: {
  //     type: 'text',
  //   },
  //   showFullRow: true,
  //   defaultValue: '',
  //   parseParam: (value: string) => value,
  // },
  // [keyNames.KEY_SATISFACTION_SURVEY_TYPE]: {
  //   component: commonComponents.Select,
  //   componentProps: {
  //     options: [],
  //   },
  //   showFullRow: true,
  //   defaultValue: null,
  //   parseParam: (value: any) => value,
  // },
  [keyNames.KEY_SATISFACTION_SURVEY_LANGUAGE]: {
    component: components.LanguageSelect,
    componentProps: {},
    showFullRow: true,
    defaultValue: 'en',
    parseParam: (value: any) => value?.value
  },
  [keyNames.KEY_SATISFACTION_SURVEY_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      multiline: true,
      rows: 5
    },
    defaultValue: '',
    showFullRow: true,
    parseParam: (value: string) => value
  },
  // [keyNames.KEY_SATISFACTION_SURVEY_TEMPLATE]: {
  //   component: components.SiteTemplateSelect,
  //   componentProps: {},
  //   showFullRow: true,
  //   validate: {},
  //   defaultValue: null,
  //   parseParam: (value: any) => value,
  // },
  [keyNames.KEY_SATISFACTION_SURVEY_CONTENT]: {
    component: components.SatisfactionForm,
    componentProps: {
      storageOn: true
      //storageId: 'satisfaction-form'
    },
    showFullRow: true,
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => value
  }
};
