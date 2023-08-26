import React from 'react';

// mui import
import { TextField } from '@mui/material';

// project import
import validators from '@base/utils/validation/fieldValidator';

// menu
import * as keyNames from '@product/unit/config/keyNames';
import Switch from '@base/components/@hanbiro/Switch';
import UnitValues from '@product/unit/containers/WriteFields/UnitValues';
import { UnitValue } from '@product/unit/types/unit';
import { KEY_UNIT_NAME, KEY_UNIT_QTY } from '@product/unit/config/keyNames';

const defaultItem: UnitValue = {
  id: '',
  [KEY_UNIT_NAME]: '',
  [KEY_UNIT_QTY]: 1
};

export default {
  [keyNames.KEY_UNIT_NAME]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      autoComplete: 'off'
    },
    validate: {
      required: validators.required
    },
    showFullRow: false
  },
  [keyNames.KEY_UNIT_ACTIVE]: {
    component: Switch,
    componentProps: {
      value: true
    },
    validate: {},
    defaultValue: true,
    showFullRow: false,
    parseValue: (valueApi: any) => valueApi || true,
    parseParam: (value: any) => value
  },
  [keyNames.KEY_UNIT_VALUES]: {
    component: UnitValues,
    showFullRow: true,
    hideTitle: true,
    defaultValue: [defaultItem],
    validate: {
      required: (value: any) => {
        let valid: boolean = true
        value?.forEach((_ele: any) => {
          if(_ele?.name == '' || _ele?.qty <= 0 ){
            valid = false
          }
        })
        return valid;
      }
    },
  },
  [keyNames.KEY_UNIT_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      fullWidth: true,
      rows: 2,
      multiline: true
    },
    defaultValue: '',
    showFullRow: true
  },
};
