import * as keyNames from '@product/unit/config/keyNames';
import * as itemKeyNames from '@product/item/config/keyNames';

import commonConfigs from '@base/config/list-field/columns';
import { allUnit, prodPerUnit, deletedUnit } from './unitColumns';

export const listLayoutColumns: { [index: string]: any[] } = {
    all: allUnit,
    prodPerUnit: prodPerUnit,
    deletedUnit: deletedUnit
};

export const configFields = {
  ...commonConfigs,
  [keyNames.KEY_UNIT_RELATED_PRODUCTS]: {
    schema: `relatedProducts {
      id
      name
    }`
  },
  [keyNames.KEY_UNIT_NAME]: {
    schema: keyNames.KEY_UNIT_NAME
  },
  [keyNames.KEY_UNIT_ACTIVE]: {
    schema: keyNames.KEY_UNIT_ACTIVE
  },
  [keyNames.KEY_UNIT_VALUES]: {
    schema: `unitValues {
      id
      name
      qty
    }`,
  },
  [keyNames.KEY_UNIT_QTY]: {
    schema: `unitValues {
        id
        name
        qty
    }`,
  },

  //config fields for case  'Product-Item list by Base Unit'
  [itemKeyNames.KEY_ITEM_NAME]:{
    schema: `name`,
  },
  [itemKeyNames.KEY_ITEM_IMAGES]:{
    schema: `images{
      id
      name
      orgName
    }`,
  },
  [itemKeyNames.KEY_ITEM_ACTIVE]:{
    schema: `active`,
  },
  [itemKeyNames.KEY_ITEM_UNIT]:{
    schema: `unit{
      id
      name
    }`,
  },
  [itemKeyNames.KEY_ITEM_PRODUCT]:{
    schema: `prod {
      id
      name
      type
      group {
        id
        name
      }
    }`,
  },
  [itemKeyNames.KEY_ITEM_UNIT_VALUE]:{
    schema: `unitVal {
      id
      name
      qty
    }`,
  },
  [itemKeyNames.KEY_ITEM_UNIT_VALUE_QTY]:{
    schema: `unitVal {
      id
      name
      qty
    }`,
  },
};
