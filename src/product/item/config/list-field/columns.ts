import * as keyNames from '@product/item/config/keyNames';
import commonConfigs from '@base/config/list-field/columns';
import {
  allItem,
  itemPerProd,
  inventoryItem,
  nonInventoryItem,
  generalItem,
  compositeItem,
  prepaidItem,
  deletedItem,
  gridSplitItems,
  activeItem,
  inActiveItem
} from './itemColumns';

export const listLayoutColumns: { [index: string]: any[] } = {
  all: allItem,
  myItem: allItem,
  myGroupItem: allItem,
  itemPerProduct1: itemPerProd,
  itemPerProduct2: itemPerProd,
  inventoryItem: inventoryItem,
  nonInventoryItem: nonInventoryItem,
  generalItem: generalItem,
  compositeItem: compositeItem,
  prepaidItem: prepaidItem,
  deletedItem: deletedItem,
  gridSplitItem: gridSplitItems,
  activeItem: activeItem,
  inActiveItem: inActiveItem
};

export const configFields = {
  ...commonConfigs,
  [keyNames.KEY_ITEM_PRODUCT]: {
    schema: `prod {
      id
      name
      type
      group {
        id
        name
      }
      canBeSold
    }`
  },
  [keyNames.KEY_ITEM_UNIT]: {
    schema: `unit {
      id
      name
    }`
  },
  [keyNames.KEY_ITEM_NAME]: {
    schema: keyNames.KEY_ITEM_NAME
  },
  [keyNames.KEY_ITEM_ACTIVE]: {
    schema: keyNames.KEY_ITEM_ACTIVE
  },
  [keyNames.KEY_ITEM_UNIT_VALUE]: {
    schema: `unitVal {
      id
      name
      qty
    }`
  },
  [keyNames.KEY_ITEM_UNIT_VALUE_QTY]: {
    schema: `unitVal {
      id
      name
      qty
    }`
  },
  [keyNames.KEY_ITEM_ATTR_VALUES]: {
    schema: `attrValues {
      id
      name
      attr {
        id
        name
      }
    }`
  },
  [keyNames.KEY_ITEM_WEIGHT]: {
    schema: `weight {
      unit
      val
    }`
  },
  [keyNames.KEY_ITEM_WARRANTY_PERIOD]: {
    schema: `warrantyPeriod {
      unit
      period
    }`
  },
  [keyNames.KEY_ITEM_DIMENSION]: {
    schema: `dimension {
      unit
      val {
        x
        y
        z
      }
    }`
  },
  [keyNames.KEY_ITEM_INVENTORY_TYPE]: {
    schema: keyNames.KEY_ITEM_INVENTORY_TYPE
  },
  [keyNames.KEY_ITEM_TYPE]: {
    schema: keyNames.KEY_ITEM_TYPE
  },
  [keyNames.KEY_ITEM_COUNTRY_ORIGIN]: {
    schema: keyNames.KEY_ITEM_COUNTRY_ORIGIN
  },
  [keyNames.KEY_ITEM_BARCODE]: {
    schema: keyNames.KEY_ITEM_BARCODE
  },
  [keyNames.KEY_ITEM_VENDOR]: {
    schema: `vendor {
      id
      code
      name
    }`
  },
  [keyNames.KEY_ITEM_MANUFACTURER]: {
    schema: `manufacturer {
      id
      code
      name
    }`
  },
  [keyNames.KEY_ITEM_MANUFACTURE_DATE]: {
    schema: keyNames.KEY_ITEM_MANUFACTURE_DATE
  },
  [keyNames.KEY_ITEM_EXPIRED_DATE]: {
    schema: keyNames.KEY_ITEM_EXPIRED_DATE
  },
  [keyNames.KEY_ITEM_BEST_BEFORE_DATE]: {
    schema: keyNames.KEY_ITEM_BEST_BEFORE_DATE
  },
  ['unitPrices']: {
    schema: ``
  },
  ['manufacturers']: {
    schema: ``
  },
  [keyNames.KEY_ITEM_UNIT_PRICE]: {
    schema: `unitPrice {
      amount
      currency
    }
    basePrice {
      amount
      currency
    }
    costPrice {
      amount
      currency
    }
    `
  },
  [keyNames.KEY_ITEM_BASE_PRICE]: {
    schema: `basePrice {
      amount
      currency
    }`
  },
  [keyNames.KEY_ITEM_COST_PRICE]: {
    schema: `costPrice {
      amount
      currency
    }`
  },
  [keyNames.KEY_ITEM_BEST_PRICE]: {
    schema: `bestPrice {
      amount
      currency
    }`
  },
  [keyNames.KEY_ITEM_PURCHASE_PRICE]: {
    schema: `purchasePrice {
      amount
      currency
    }`
  },
  [keyNames.KEY_ITEM_DESCRIPTION]: {
    schema: keyNames.KEY_ITEM_DESCRIPTION
  },
  [keyNames.KEY_ITEM_IMAGES]: {
    schema: `images {
      id
      name
      orgName
    }`
  },
  [keyNames.KEY_ITEM_BRAND]: {
    schema: keyNames.KEY_ITEM_BRAND
  },
  [keyNames.KEY_ITEM_ASSIGN_TO]: {
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
  [keyNames.KEY_ITEM_OPEN_STOCK]: {
    schema: keyNames.KEY_ITEM_OPEN_STOCK
  },
  [keyNames.KEY_ITEM_SKU]: {
    schema: `sku`
  },
  [keyNames.KEY_ITEM_REPLENISHMENT_POINT]: {
    schema: keyNames.KEY_ITEM_REPLENISHMENT_POINT
  },
  [keyNames.KEY_ITEM_STOCK_ON_HAND]: {
    schema: keyNames.KEY_ITEM_STOCK_ON_HAND
  },
  [keyNames.KEY_ITEM_ASSOCIATED_ITEMS]: {
    schema: `associatedItems {
       qty
       item {
        id
        name
       }
      }`
  }
};
export const disabledColumns = [keyNames.KEY_ITEM_NAME];
