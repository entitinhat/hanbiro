import React from 'react';

// mui import
import { TextField } from '@mui/material';

// project import
import validators from '@base/utils/validation/fieldValidator';
import * as baseComponents from '@base/config/write-field/components';
import { LabelValue } from '@base/types/app';

// menu
import * as keyNames from '@product/item/config/keyNames';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';

import { PRODUCT_ITEM_TYPE_OPTIONS, PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS } from '@product/main/config/constants';
import { KEY_PRODUCT_ATTRIBUTE } from '@product/product/config/keyNames';
import BaseUnitName from '@product/item/containers/WriteFields/BaseUnitName';
import AttributeValue from '@product/item/containers/WriteFields/AttributeValue';
import AssociatedItems from '@product/item/containers/AssociatedItems';
import { TextAreaView } from '@base/config/view-field/components';

export default {
  [keyNames.KEY_ITEM_PRODUCT]: {
    component: ProductAutoComplete,
    componentProps: {
      single: true
    },
    validate: {
      required: validators.required
    },
    showFullRow: true
  },
  [keyNames.KEY_ITEM_TYPE]: {
    component: baseComponents.MuiRadioGroup,
    componentProps: {
      size: 'md',
      options: PRODUCT_ITEM_TYPE_OPTIONS
    },
    // showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: PRODUCT_ITEM_TYPE_OPTIONS[0],
    parseParam: (v: LabelValue) => v.value
  },
  [keyNames.KEY_ITEM_INVENTORY_TYPE]: {
    component: baseComponents.MuiRadioGroup,
    componentProps: {
      size: 'md',
      options: PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS
    },
    // showFullRow: true,
    validate: {
      required: validators.required
    },
    defaultValue: PRODUCT_ITEM_INVENTORY_TYPE_OPTIONS[0],
    parseParam: (v: LabelValue) => v.value
  },
  [keyNames.KEY_ITEM_UNIT]: {
    component: BaseUnitName,
    componentProps: {},
    hideTitle: true,
    showFullRow: true,
    validate: {
      required: validators.itemUnit
    }
  },
  [KEY_PRODUCT_ATTRIBUTE]: {
    component: AttributeValue,
    componentProps: {},
    hideTitle: true,
    showFullRow: true,
    validate: {
      required: validators.itemAttribute
    }
  },
  [keyNames.KEY_ITEM_ASSOCIATED_ITEMS]: {
    component: AssociatedItems,
    componentProps: {},
    showFullRow: true,
    hideTitle: true
  },
  [keyNames.KEY_ITEM_DESCRIPTION]: {
    component: TextField,
    componentProps: {
      multiline: true,
      rows: 3,
      autoComplete: 'off'
    },
    showFullRow: true,
    parseValue: (valueApi: any) => valueApi || '',
    parseParam: (value: any) => value
  }
};
