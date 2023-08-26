//material
import { TextField } from '@mui/material';

//project
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { OptionValue } from '@base/types/common';

//menu
import * as keyNames from '@settings/digital/survey/config/keyNames';
import * as components from '@settings/digital/survey/config/write-field/components';
import { SURVEY_TYPES } from '../constants';
import { LanguageValue } from '@base/types/app';

import { t } from 'i18next'

export default {
  [keyNames.KEY_SURVEY_NAME]: {
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
  [keyNames.KEY_SURVEY_TITLE]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    showFullRow: true,
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SURVEY_TYPE]: {
    component: baseComponents.SelectBox,
    componentProps: {
      options: SURVEY_TYPES.map((item) => {
        return {
          ...item,
          languageKey: t(item.languageKey)
        }
      })
    },
    showFullRow: true,
    defaultValue: SURVEY_TYPES.map((item) => {
      return {
        ...item,
        languageKey: t(item.languageKey)
      }
    })?.[0],
    parseParam: (value: OptionValue) => value.keyName
  },
  [keyNames.KEY_SURVEY_LANGUAGE]: {
    component: components.LanguageSelect,
    componentProps: {},
    showFullRow: true,
    defaultValue: 'en',
    parseParam: (value: LanguageValue | null) => value?.value || ''
  },
  [keyNames.KEY_SURVEY_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      multiline: true,
      rows: 5
    },
    defaultValue: '',
    showFullRow: true,
    parseParam: (value: string) => value
  },
  // [keyNames.KEY_SURVEY_TEMPLATE]: {
  //   component: TextField, //components.SiteTemplateSelect,
  //   componentProps: {},
  //   showFullRow: true,
  //   validate: {},
  //   defaultValue: null,
  //   parseParam: (value: any) => value
  // },
  [keyNames.KEY_SURVEY_CONTENT]: {
    component: components.SurveyForm,
    componentProps: {
      storageOn: true
    },
    showFullRow: true,
    validate: {},
    defaultValue: null,
    parseParam: (value: any) => value
  }
};
