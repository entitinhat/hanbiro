import * as keyNames from '../keyNames';
import * as components from './components';

import validators from '@base/utils/validation/fieldValidator';
import { SETTING_CTA_CONTENT_TYPES, SETTING_CTA_LINK_TYPES, SETTING_CTA_TEXT_FONT_WEIGHT_OPTIONS, SETTING_CTA_TYPES } from '../constants';
import { TextField } from '@mui/material';
import { LanguageValue } from '@base/types/app';
import { LANDING_PAGE_TYPE_OPTIONS } from '@settings/digital/landing-page/config/constants';
import { SITE_GROUP_OPTION, SITE_GROUP_OPTION_NUMBER, SITE_TYPE_OPTIONS } from '@settings/site/config/constants';
import { SURVEY_TYPES } from '@settings/digital/survey/config/constants';

export default {
  [keyNames.KEY_SETTING_CTA_NAME]: {
    component: TextField,
    componentProps: {
      type: 'text'
    },
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_TYPE]: {
    component: components.SelectBox,
    componentProps: {
      options: SETTING_CTA_TYPES
    },
    showFullRow: true,
    validate: {
      required: true
    },
    defaultValue: SETTING_CTA_TYPES[0],
    parseParam: (value: any) => value?.value
  },
  [keyNames.KEY_SETTING_CTA_LANGUAGE]: {
    component: components.LanguageSelect,
    componentProps: {},
    showFullRow: true,
    defaultValue: 'en',
    parseParam: (value: LanguageValue | null) => value?.value || value
  },
  [keyNames.KEY_SETTING_CTA_VALUE]: {
    component: null
  },
  [keyNames.KEY_SETTING_CTA_IMAGE_URL]: {
    component: components.CtaImageUploadSample,
    validate: {
      required: validators.required
    },
    showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_SETTING_CTA_IMAGE_SIZE]: {
    component: components.CtaImageSize,
    validate: {},
    defaultValue: { width: 300, height: 300 },
    showFullRow: false,
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_IMAGE_ALT]: {
    component: TextField,
    componentProps: {
      type: 'text'
    },
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_LINK_TYPE]: {
    component: components.SelectBox,
    componentProps: {
      options: SETTING_CTA_LINK_TYPES
      // isSearchable: false
    },
    showFullRow: true,
    defaultValue: SETTING_CTA_LINK_TYPES[0],
    parseParam: (value: any) => value?.value
  },
  [keyNames.KEY_SETTING_CTA_EXT_SITE_NAME]: {
    component: TextField,
    componentProps: {
      type: 'text'
    },
    validate: {},
    showFullRow: true,
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_LINK_URL]: {
    component: components.Website,
    componentProps: {},
    showFullRow: true,
    validate: {
      required: validators.ctaLink
    },
    defaultValue: { link: '', openNewWindow: false },
    parseParam: (value: any) => {
      return value;
    }
  },
  [keyNames.KEY_SETTING_CTA_CONTENT_TYPE]: {
    component: components.SelectBox,
    componentProps: {
      options: SETTING_CTA_CONTENT_TYPES
    },
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: SETTING_CTA_CONTENT_TYPES[0],
    parseParam: (value: any) => value?.value
  },
  [keyNames.KEY_SETTING_CTA_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      rows: 4,
      multiline: true
    },
    showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_AB_TEST]: {
    component: components.Switch,
    showFullRow: true,
    validate: {},
    defaultValue: false,
    parseParam: (value: boolean) => value
  },
  [keyNames.KEY_SETTING_CTA_TEXT_VALUE]: {
    component: TextField,
    componentProps: {
      type: 'text'
    },
    showFullRow: true,
    validate: {},
    defaultValue: 'BUTTON',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_TEXT_BG_COLOR]: {
    component: TextField,
    componentProps: {
      type: 'color'
    },
    showFullRow: false,
    validate: {},
    defaultValue: '#1890ff',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_TEXT_TEXT_COLOR]: {
    component: TextField,
    componentProps: {
      type: 'color'
    },
    showFullRow: false,
    validate: {},
    defaultValue: '#ffffff',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_TEXT_FONT_SIZE]: {
    component: TextField,
    componentProps: {},
    showFullRow: false,
    validate: {},
    defaultValue: 11,
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_TEXT_FONT_WEIGHT]: {
    component: components.SelectBox,
    componentProps: {
      options: SETTING_CTA_TEXT_FONT_WEIGHT_OPTIONS
    },
    showFullRow: false,
    validate: {},
    defaultValue: null,
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_TEXT_ROUNDED]: {
    component: TextField,
    componentProps: {
      type: 'range'
    },
    showFullRow: false,
    validate: {},
    defaultValue: 8,
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_LANDINGPAGE]: {
    component: components.LandingPageAutocomplete,
    componentProps: {},
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseParam: (value: any) => {
      return { id: value?.id, name: value?.name };
    }
  },
  [keyNames.KEY_SETTING_CTA_LANDINGPAGE_TYPE]: {
    component: components.SelectBox,
    componentProps: {
      options: LANDING_PAGE_TYPE_OPTIONS?.map((type: any) => {
        return {
          ...type,
          keyName: type.value
        };
      })
    },
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseParam: (value: any) => value?.value
  },
  [keyNames.KEY_SETTING_CTA_LANDINGPAGE_TITLE]: {
    component: TextField,
    showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_SITE]: {
    component: components.SiteAutocomplete,
    componentProps: {},
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseParam: (value: any) => {
      return { id: value?.id, name: value?.name };
    }
  },
  [keyNames.KEY_SETTING_CTA_SITE_TYPE]: {
    component: components.SelectBox,
    componentProps: {
      options: SITE_TYPE_OPTIONS?.map((type: any) => {
        return {
          ...type,
          keyName: type?.value,
          languageKey: type?.label
        };
      })
    },
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseParam: (value: any) => SITE_GROUP_OPTION[value?.value]
  },
  [keyNames.KEY_SETTING_CTA_SITE_TITLE]: {
    component: TextField,
    showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_SETTING_CTA_SURVEY]: {
    component: components.SurveyAutocomplete,
    componentProps: {},
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseParam: (value: any) => {
      return { id: value?.id, name: value?.name };
    }
  },
  [keyNames.KEY_SETTING_CTA_SURVEY_TYPE]: {
    component: components.SelectBox,
    componentProps: {
      options: SURVEY_TYPES?.map((type: any) => {
        return {
          ...type,
          value: type.keyName
        };
      })
    },
    showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: null,
    parseParam: (value: any) => value?.value
  },
  [keyNames.KEY_SETTING_CTA_SURVEY_TITLE]: {
    component: TextField,
    showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  }
};
