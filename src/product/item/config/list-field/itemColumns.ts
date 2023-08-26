import * as keyNames from '@product/item/config/keyNames';
//Default Column List: Item Photo, Item Name, Item Type, Inventory Type,  Unit Name, Attributes, Unit Price, Active
const allColumns: any = {
  [keyNames.KEY_ITEM_IMAGES]: {
    keyName: keyNames.KEY_ITEM_IMAGES,
    languageKey: 'product_item_field_basic_images',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_IMAGES,
    title: 'product_item_field_basic_images'
  },
  [keyNames.KEY_ITEM_NAME]: {
    keyName: keyNames.KEY_ITEM_NAME,
    languageKey: 'product_item_field_basic_name',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_NAME,
    title: 'product_item_field_basic_name'
  },
  [keyNames.KEY_ITEM_CODE]: {
    keyName: keyNames.KEY_ITEM_CODE,
    languageKey: 'product_item_field_basic_code',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_CODE,
    title: 'product_item_field_basic_code'
  },
  [keyNames.KEY_ITEM_TYPE]: {
    keyName: keyNames.KEY_ITEM_TYPE,
    languageKey: 'product_item_field_basic_itemtype',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_TYPE,
    title: 'product_item_field_basic_itemtype'
  },
  [keyNames.KEY_ITEM_UNIT_VALUE]: {
    keyName: keyNames.KEY_ITEM_UNIT_VALUE,
    languageKey: 'product_item_field_basic_unitval',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_UNIT_VALUE,
    title: 'product_item_field_basic_unitval'
  },
  [keyNames.KEY_ITEM_UNIT_VALUE_QTY]: {
    keyName: keyNames.KEY_ITEM_UNIT_VALUE_QTY,
    languageKey: 'product_item_field_basic_unitvalqty',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_UNIT_VALUE_QTY,
    title: 'product_item_field_basic_unitvalqty'
  },
  [keyNames.KEY_ITEM_ATTR_VALUES]: {
    keyName: keyNames.KEY_ITEM_ATTR_VALUES,
    languageKey: 'product_item_field_basic_attrvalues',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_ATTR_VALUES,
    title: 'product_item_field_basic_attrvalues'
  },
  [keyNames.KEY_ITEM_ACTIVE]: {
    keyName: keyNames.KEY_ITEM_ACTIVE,
    languageKey: 'product_item_field_basic_active',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_ACTIVE,
    title: 'product_item_field_basic_active'
  },
  [keyNames.KEY_ITEM_PRODUCT]: {
    keyName: keyNames.KEY_ITEM_PRODUCT,
    languageKey: 'product_item_field_basic_prod',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_PRODUCT,
    title: 'product_item_field_basic_prod'
  },
  [keyNames.KEY_ITEM_UNIT_PRICE]: {
    keyName: keyNames.KEY_ITEM_UNIT_PRICE,
    languageKey: 'product_item_field_basic_unitprice',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_UNIT_PRICE,
    title: 'product_item_field_basic_unitprice'
  },
  [keyNames.KEY_ITEM_INVENTORY_TYPE]: {
    keyName: keyNames.KEY_ITEM_INVENTORY_TYPE,
    languageKey: 'product_item_field_basic_inventorytype',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_INVENTORY_TYPE,
    title: 'product_item_field_basic_inventorytype'
  },
  [keyNames.KEY_ITEM_SKU]: {
    keyName: keyNames.KEY_ITEM_SKU,
    languageKey: 'product_item_field_basic_sku',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_SKU,
    title: 'product_item_field_basic_sku'
  },
  [keyNames.KEY_ITEM_STOCK_ON_HAND]: {
    keyName: keyNames.KEY_ITEM_STOCK_ON_HAND,
    languageKey: 'product_item_field_basic_stockonhand',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_STOCK_ON_HAND,
    title: 'product_item_field_basic_stockonhand'
  },
  [keyNames.KEY_ITEM_REPLENISHMENT_POINT]: {
    keyName: keyNames.KEY_ITEM_REPLENISHMENT_POINT,
    languageKey: 'product_item_field_basic_replenishmentpoint',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_REPLENISHMENT_POINT,
    title: 'product_item_field_basic_replenishmentpoint'
  },
  [keyNames.KEY_ITEM_BASE_PRICE]: {
    keyName: keyNames.KEY_ITEM_BASE_PRICE,
    languageKey: 'product_item_field_basic_baseprice',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_BASE_PRICE,
    title: 'product_item_field_basic_baseprice'
  },
  [keyNames.KEY_ITEM_COST_PRICE]: {
    keyName: keyNames.KEY_ITEM_COST_PRICE,
    languageKey: 'product_item_field_basic_basecost',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_COST_PRICE,
    title: 'product_item_field_basic_basecost'
  },
  [keyNames.KEY_ITEM_BEST_PRICE]: {
    keyName: keyNames.KEY_ITEM_BEST_PRICE,
    languageKey: 'product_item_field_basic_bestprice',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_BEST_PRICE,
    title: 'product_item_field_basic_bestprice'
  },
  [keyNames.KEY_ITEM_ASSOCIATED_ITEMS]: {
    keyName: keyNames.KEY_ITEM_ASSOCIATED_ITEMS,
    languageKey: 'product_item_field_basic_associateditems',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_ASSOCIATED_ITEMS,
    title: 'product_item_field_basic_associateditems'
  },
  [keyNames.KEY_ITEM_WARRANTY_PERIOD]: {
    keyName: keyNames.KEY_ITEM_WARRANTY_PERIOD,
    languageKey: 'product_item_field_more_warrantyperiod',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_ITEM_ASSOCIATED_ITEMS,
    title: 'product_item_field_more_warrantyperiod'
  },
  [keyNames.KEY_ITEM_BRAND]: {
    keyName: keyNames.KEY_ITEM_BRAND,
    languageKey: 'product_item_field_more_brand',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_ITEM_ASSOCIATED_ITEMS,
    title: 'product_item_field_more_brand'
  },
  [keyNames.KEY_ITEM_DIMENSION]: {
    keyName: keyNames.KEY_ITEM_DIMENSION,
    languageKey: 'product_item_field_more_dimension',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_ITEM_ASSOCIATED_ITEMS,
    title: 'product_item_field_more_dimension'
  },
  [keyNames.KEY_ITEM_WEIGHT]: {
    keyName: keyNames.KEY_ITEM_WEIGHT,
    languageKey: 'product_item_field_more_weight',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_ITEM_ASSOCIATED_ITEMS,
    title: 'product_item_field_more_weight'
  },

  [keyNames.KEY_ITEM_CREATED_BY]: {
    keyName: keyNames.KEY_ITEM_CREATED_BY,
    languageKey: 'product_item_field_basic_createdby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_ITEM_CREATED_BY,
    title: 'product_item_field_basic_createdby'
  },
  [keyNames.KEY_ITEM_CREATED_AT]: {
    keyName: keyNames.KEY_ITEM_CREATED_AT,
    languageKey: 'product_item_field_more_createdat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_ITEM_CREATED_AT,
    title: 'product_item_field_more_createdat'
  },
  [keyNames.KEY_ITEM_UPDATED_BY]: {
    keyName: keyNames.KEY_ITEM_UPDATED_BY,
    languageKey: 'product_item_field_more_updatedby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_ITEM_UPDATED_BY,
    title: 'product_item_field_more_updatedby'
  },
  [keyNames.KEY_ITEM_UPDATED_AT]: {
    keyName: keyNames.KEY_ITEM_UPDATED_AT,
    languageKey: 'product_item_field_more_updatedat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_ITEM_UPDATED_AT,
    title: 'product_item_field_more_updatedat'
  },
  [keyNames.KEY_ITEM_DELETED_BY]: {
    keyName: keyNames.KEY_ITEM_DELETED_BY,
    languageKey: 'ncrm_common_field_deletedby',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_DELETED_BY,
    title: 'ncrm_common_field_deletedby'
  },
  [keyNames.KEY_ITEM_DELETED_AT]: {
    keyName: keyNames.KEY_ITEM_DELETED_AT,
    languageKey: 'ncrm_common_field_deletedat',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_ITEM_DELETED_AT,
    title: 'ncrm_common_field_deletedat'
  }
};

const initColumns: string[] = [
  keyNames.KEY_ITEM_CREATED_BY,
  keyNames.KEY_ITEM_CREATED_AT,
  keyNames.KEY_ITEM_UPDATED_BY,
  keyNames.KEY_ITEM_UPDATED_AT
];

const initDeleteColumns: string[] = [keyNames.KEY_ITEM_DELETED_BY, keyNames.KEY_ITEM_DELETED_AT];

const allItemColumns: string[] = [
  keyNames.KEY_ITEM_IMAGES,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_CODE,
  keyNames.KEY_ITEM_PRODUCT,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_ATTR_VALUES,
  keyNames.KEY_ITEM_ACTIVE,
  keyNames.KEY_ITEM_UNIT_PRICE,
  keyNames.KEY_ITEM_WARRANTY_PERIOD,
  keyNames.KEY_ITEM_BRAND,
  keyNames.KEY_ITEM_DIMENSION,
  keyNames.KEY_ITEM_WEIGHT
];

const itemPerProdColumns: string[] = [
  keyNames.KEY_ITEM_PRODUCT,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_INVENTORY_TYPE,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_ATTR_VALUES,
  keyNames.KEY_ITEM_UNIT_PRICE,
  keyNames.KEY_ITEM_ACTIVE,

  keyNames.KEY_ITEM_WARRANTY_PERIOD,
  keyNames.KEY_ITEM_BRAND,
  keyNames.KEY_ITEM_DIMENSION,
  keyNames.KEY_ITEM_WEIGHT
];

const inventoryItemColumns: string[] = [
  keyNames.KEY_ITEM_IMAGES,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_INVENTORY_TYPE,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_ATTR_VALUES,
  keyNames.KEY_ITEM_UNIT_PRICE,
  keyNames.KEY_ITEM_SKU,
  keyNames.KEY_ITEM_STOCK_ON_HAND
];

const nonInventoryItemColumns: string[] = [
  keyNames.KEY_ITEM_IMAGES,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_INVENTORY_TYPE,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_ATTR_VALUES,
  keyNames.KEY_ITEM_UNIT_PRICE,
  keyNames.KEY_ITEM_WARRANTY_PERIOD,
  keyNames.KEY_ITEM_BRAND,
  keyNames.KEY_ITEM_DIMENSION,
  keyNames.KEY_ITEM_WEIGHT
];

const generalItemColumns: string[] = [
  keyNames.KEY_ITEM_IMAGES,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_INVENTORY_TYPE,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_ATTR_VALUES,
  keyNames.KEY_ITEM_UNIT_PRICE,
  keyNames.KEY_ITEM_WARRANTY_PERIOD,
  keyNames.KEY_ITEM_BRAND,
  keyNames.KEY_ITEM_DIMENSION,
  keyNames.KEY_ITEM_WEIGHT
];

const compositeItemColumns: string[] = [
  keyNames.KEY_ITEM_IMAGES,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_INVENTORY_TYPE,
  keyNames.KEY_ITEM_ASSOCIATED_ITEMS,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_UNIT_PRICE
];

const activeItemColumns: string[] = [
  keyNames.KEY_ITEM_IMAGES,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_INVENTORY_TYPE,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_ATTR_VALUES,
  keyNames.KEY_ITEM_UNIT_PRICE,
  keyNames.KEY_ITEM_ACTIVE
];

const inActiveItemColumns: string[] = [
  keyNames.KEY_ITEM_IMAGES,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_INVENTORY_TYPE,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_ATTR_VALUES,
  keyNames.KEY_ITEM_UNIT_PRICE,
  keyNames.KEY_ITEM_ACTIVE
];

const prepaidItemColumns: string[] = [keyNames.KEY_ITEM_IMAGES, keyNames.KEY_ITEM_NAME, keyNames.KEY_ITEM_REPLENISHMENT_POINT];

const deleteItemColumns: string[] = [keyNames.KEY_ITEM_NAME];

const defaultColumns = [
  keyNames.KEY_ITEM_IMAGES,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_INVENTORY_TYPE,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_ATTR_VALUES,
  keyNames.KEY_ITEM_UNIT_PRICE,
  keyNames.KEY_ITEM_ACTIVE
];

export const gridSplitColumns = [
  keyNames.KEY_ITEM_IMAGES,
  keyNames.KEY_ITEM_NAME,
  keyNames.KEY_ITEM_CODE,
  keyNames.KEY_ITEM_PRODUCT,
  keyNames.KEY_ITEM_TYPE,
  keyNames.KEY_ITEM_INVENTORY_TYPE,
  keyNames.KEY_ITEM_UNIT_PRICE,
  keyNames.KEY_ITEM_UNIT_VALUE,
  keyNames.KEY_ITEM_ATTR_VALUES,
  keyNames.KEY_ITEM_ACTIVE
];

function getItemColumns(type: string) {
  let columns: any[] = [];
  switch (type) {
    case 'ALL_ITEM':
      columns = allItemColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'ITEM_PER_PROD':
      columns = itemPerProdColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'INVENTORY_ITEM':
      columns = inventoryItemColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'NON_INVENTORY_ITEM':
      columns = nonInventoryItemColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'GENERAL_ITEM':
      columns = generalItemColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'COMPOSITE_ITEM':
      columns = compositeItemColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'PREPAID_ITEM':
      columns = prepaidItemColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'DELETED_ITEM':
      columns = deleteItemColumns
        .concat(initColumns)
        .concat(initDeleteColumns)
        .map((key: string) => allColumns[key]);
      break;
    case 'GRID_SPLIT_ITEM':
      columns = defaultColumns.concat(gridSplitColumns, initColumns).map((key: string) => allColumns[key]);
      break;
    case 'ACTIVE_ITEM_COLUMN':
      columns = defaultColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'INACTIVE_ITEM_COLUMN':
      columns = activeItemColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    default:
      columns = inActiveItemColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
  }
  return columns;
}

export const allItem = getItemColumns('ALL_ITEM');
export const itemPerProd = getItemColumns('ITEM_PER_PROD');
export const inventoryItem = getItemColumns('INVENTORY_ITEM');
export const nonInventoryItem = getItemColumns('NON_INVENTORY_ITEM');
export const generalItem = getItemColumns('GENERAL_ITEM');
export const compositeItem = getItemColumns('COMPOSITE_ITEM');
export const prepaidItem = getItemColumns('PREPAID_ITEM');
export const deletedItem = getItemColumns('DELETED_ITEM');
export const gridSplitItems = getItemColumns('GRID_SPLIT_ITEM');
export const activeItem = getItemColumns('activeItem');
export const inActiveItem = getItemColumns('inActiveItem');
