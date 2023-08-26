//third-party
import { TextField } from '@mui/material';
//import { t } from 'i18next';

//project base
import * as baseComponents from '@base/config/write-field/components';
import validators from '@base/utils/validation/fieldValidator';
import { MENU_COMPETITOR } from '@base/config/menus';

//menu
import * as keyNames from '@competitor/config/keyNames';
import * as components from '@competitor/config/write-field/components';

export default {
  [keyNames.KEY_NAME_COMPETITOR_CODE]: {
    component: baseComponents.CodeGenerator,
    componentProps: {
      menu: MENU_COMPETITOR
    },
    //showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_COMPETITOR_NAME]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    showFullRow: true,
    validate: {
      required: (v: string) => validators.required(v) || 'Name is required.'
    },
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_COMPETITOR_WEBSITE]: {
    component: baseComponents.WebsiteInput,
    componentProps: {
      isMultiple: false
    },
    //showFullRow: true,
    defaultValue: null,
    parseParam: (value: any) =>
      value
        ? {
            protocol: value.protocol,
            website: value.website
          }
        : null
  },
  [keyNames.KEY_NAME_COMPETITOR_PRODUCT]: {
    component: components.ProductAutoComplete,
    componentProps: {
      single: false
    },
    //showFullRow: true,
    defaultValue: [],
    parseParam: (value: any) => (value ? value.map((_ele: any) => ({ id: _ele.id, name: _ele.name })) : [])
  },
  [keyNames.KEY_NAME_COMPETITOR_STRENGTH]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      multiline: true,
      rows: 2
    },
    //showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_COMPETITOR_WEAKNESS]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      multiline: true,
      rows: 2
    },
    //showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  },
  [keyNames.KEY_NAME_COMPETITOR_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      multiline: true,
      rows: 2
    },
    //showFullRow: true,
    validate: {},
    defaultValue: '',
    parseParam: (value: string) => value
  }
};
