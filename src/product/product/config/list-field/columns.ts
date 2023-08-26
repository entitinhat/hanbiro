import commonConfigs from '@base/config/list-field/columns';
import * as keyNames from '@product/product/config/keyNames';

import {
  all,
  myProduct,
  myGroupProduct,
  myGroupProduct2,
  unassignedProduct,
  productsPerGroup,
  productsPerGroup2,
  canBeSoldProduct,
  purchasedProduct,
  producedProduct,
  activeProduct,
  inActiveProduct,
  notCreatedItem,
  deletedProduct,
  gridSplitProduct
} from '@product/product/config/list-field/productColumns';

export const listLayoutColumns: { [index: string]: any[] } = {
  all: all,
  myProduct: myProduct,
  myGroupProduct: myGroupProduct,
  myGroupProduct2: myGroupProduct2,
  unassignedProduct: unassignedProduct,
  productsPerGroup: productsPerGroup,
  productsPerGroup2: productsPerGroup2,
  canBeSoldProduct: canBeSoldProduct,
  purchasedProduct: purchasedProduct,
  producedProduct: producedProduct,
  activeProduct: activeProduct,
  inActiveProduct: inActiveProduct,
  notCreatedItem: notCreatedItem,
  deletedProduct: deletedProduct,
  gridSplitProduct: gridSplitProduct
};

export const configFields = {
  ...commonConfigs,
  [keyNames.KEY_PRODUCT_TYPE]: {
    componentProps: {},
    schema: keyNames.KEY_PRODUCT_TYPE
  },
  [keyNames.KEY_PRODUCT_GROUP]: {
    schema: `group {
      id
      name
    }`
  },
  [keyNames.KEY_PRODUCT_ACTIVE]: {
    schema: keyNames.KEY_PRODUCT_ACTIVE
  },
  [keyNames.KEY_PRODUCT_TYPE_BE_SOLD]: {
    schema: keyNames.KEY_PRODUCT_TYPE_BE_SOLD
  },
  [keyNames.KEY_PRODUCT_START_DATE]: {
    schema: keyNames.KEY_PRODUCT_START_DATE
  },
  [keyNames.KEY_PRODUCT_END_DATE]: {
    schema: `
    endDate
    `
  },
  [keyNames.KEY_PRODUCT_BASE_UNIT]: {
    schema: `unit {
      id
      name
      unitValues {
        id
        name
        qty
      }
    }`
  },
  [keyNames.KEY_PRODUCT_ATTRIBUTE]: {
    schema: `useAttr
    attributes {
      id
      name
      values {
        id
        name
      }
    }`
  },
  [keyNames.KEY_PRODUCT_ASSIGN_TO]: {
    schema: `assignTo {
      user {
        id
        name
      }
      group {
        id
        name
      }
    }`
  },
  [keyNames.KEY_PRODUCT_VENDOR]: {
    schema: `vendor {
      id
      code
      name
    }`
  },
  [keyNames.KEY_PRODUCT_MANUFACTURERS]: {
    schema: `manufacturer {
      id
      code
      name
    }`
  },
  [keyNames.KEY_PRODUCT_COUNTRY_ORIGIN]: {
    schema: keyNames.KEY_PRODUCT_COUNTRY_ORIGIN
  },
  [keyNames.KEY_PRODUCT_ITEMS]: {
    schema: `items {
      id
      name
    }`
  },
  [keyNames.KEY_PRODUCT_DESCRIPTION]: {
    schema: keyNames.KEY_PRODUCT_DESCRIPTION
  },
  [keyNames.KEY_PRODUCT_COST_OF_GOODS]: {
    schema: keyNames.KEY_PRODUCT_COST_OF_GOODS
    // component: components.ProductCostOfGoodsView
  }
};

// chua cos: KEY_PRODUCT_NO_END_DATE
