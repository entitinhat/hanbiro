import * as keyNames from '@product/unit/config/keyNames';
import * as itemKeyNames from '@product/item/config/keyNames';

const allColumns: any = {
//   [keyNames.KEY_UNIT_IMAGES]: {
//     keyName: keyNames.KEY_UNIT_IMAGES,
//     languageKey: 'product_item_field_basic_images',
//     defaultViewInList: true,
//     sortable: true,
//     name: keyNames.KEY_UNIT_IMAGES,
//     title: 'product_item_field_basic_images'
//   },
  [keyNames.KEY_UNIT_NAME]: {
    keyName: keyNames.KEY_UNIT_NAME,
    languageKey: 'product_unit_field_basic_name',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_UNIT_NAME,
    title: 'product_unit_field_basic_name',
    isDisabled: true
  },
  [keyNames.KEY_UNIT_VALUES]: {
    keyName: keyNames.KEY_UNIT_VALUES,
    languageKey: 'product_unit_field_basic_unitvalues',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_UNIT_VALUES,
    title: 'product_unit_field_basic_unitvalues'
  },
  [keyNames.KEY_UNIT_ACTIVE]: {
    keyName: keyNames.KEY_UNIT_ACTIVE,
    languageKey: 'product_unit_field_basic_active',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_UNIT_ACTIVE,
    title: 'product_unit_field_basic_active'
  },
  [keyNames.KEY_UNIT_RELATED_PRODUCTS]: {
    keyName: keyNames.KEY_UNIT_RELATED_PRODUCTS,
    languageKey: 'product_unit_field_basic_relatedproducts',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_UNIT_RELATED_PRODUCTS,
    title: 'product_unit_field_basic_relatedproducts'
  },
  [keyNames.KEY_UNIT_BASE]: {
    keyName: keyNames.KEY_UNIT_BASE,
    languageKey: 'product_unit_field_basic_name',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_UNIT_BASE,
    title: 'product_unit_field_basic_name',
    isDisabled: true
  },
  [keyNames.KEY_UNIT_QTY]: {
    keyName: keyNames.KEY_UNIT_QTY,
    languageKey: 'product_unit_field_basic_unitqty',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_UNIT_QTY,
    title: 'product_unit_field_basic_unitqty'
  },

  [keyNames.KEY_UNIT_CREATED_BY]: {
    keyName: keyNames.KEY_UNIT_CREATED_BY,
    languageKey: 'product_unit_field_basic_createdby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_UNIT_CREATED_BY,
    title: 'product_unit_field_basic_createdby'
  },
  [keyNames.KEY_UNIT_CREATED_AT]: {
    keyName: keyNames.KEY_UNIT_CREATED_AT,
    languageKey: 'product_unit_field_basic_createdat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_UNIT_CREATED_AT,
    title: 'product_unit_field_basic_createdat'
  },
  [keyNames.KEY_UNIT_UPDATED_BY]: {
    keyName: keyNames.KEY_UNIT_UPDATED_BY,
    languageKey: 'product_unit_field_basic_updatedby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_UNIT_UPDATED_BY,
    title: 'product_unit_field_basic_updatedby'
  },
  [keyNames.KEY_UNIT_UPDATED_AT]: {
    keyName: keyNames.KEY_UNIT_UPDATED_AT,
    languageKey: 'product_unit_field_basic_updatedat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_UNIT_UPDATED_AT,
    title: 'product_unit_field_basic_updatedat'
  },
  [keyNames.KEY_UNIT_DELETED_BY]: {
    keyName: keyNames.KEY_UNIT_DELETED_BY,
    languageKey: 'ncrm_common_field_deletedby',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_UNIT_DELETED_BY,
    title: 'ncrm_common_field_deletedby'
  },
  [keyNames.KEY_UNIT_DELETED_AT]: {
    keyName: keyNames.KEY_UNIT_DELETED_AT,
    languageKey: 'ncrm_common_field_deletedat',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_UNIT_DELETED_AT,
    title: 'ncrm_common_field_deletedat'
  },
};

const allItemColumns : any = {
  //allColumns for case  'Product-Item list by Base Unit'
  [itemKeyNames.KEY_ITEM_NAME]: {
    keyName: itemKeyNames.KEY_ITEM_NAME,
    languageKey: 'product_item_field_basic_name',
    defaultViewInList: true,
    sortable: true,
    name: itemKeyNames.KEY_ITEM_NAME,
    title: 'product_item_field_basic_name'
  },
  [itemKeyNames.KEY_ITEM_IMAGES]: {
    keyName: itemKeyNames.KEY_ITEM_IMAGES,
    languageKey: 'product_item_field_basic_images',
    defaultViewInList: true,
    sortable: true,
    name: itemKeyNames.KEY_ITEM_IMAGES,
    title: 'product_item_field_basic_images'
  },
  [itemKeyNames.KEY_ITEM_ACTIVE]: {
    keyName: itemKeyNames.KEY_ITEM_ACTIVE,
    languageKey: 'product_item_field_basic_active',
    defaultViewInList: true,
    sortable: true,
    name: itemKeyNames.KEY_ITEM_ACTIVE,
    title: 'product_item_field_basic_active'
  },
  [itemKeyNames.KEY_ITEM_UNIT]: {
    keyName: itemKeyNames.KEY_ITEM_UNIT,
    languageKey: 'product_unit_field_basic_name',
    defaultViewInList: true,
    sortable: true,
    name: itemKeyNames.KEY_ITEM_UNIT,
    title: 'product_unit_field_basic_name',
    isDisabled: true
  },
  [itemKeyNames.KEY_ITEM_PRODUCT]: {
    keyName: itemKeyNames.KEY_ITEM_PRODUCT,
    languageKey: 'product_item_field_basic_prod',
    defaultViewInList: true,
    sortable: true,
    name: itemKeyNames.KEY_ITEM_PRODUCT,
    title: 'product_item_field_basic_prod'
  },
  [itemKeyNames.KEY_ITEM_UNIT_VALUE]: {
    keyName: itemKeyNames.KEY_ITEM_UNIT_VALUE,
    languageKey: 'product_item_field_basic_unitval',
    defaultViewInList: true,
    sortable: true,
    name: itemKeyNames.KEY_ITEM_UNIT_VALUE,
    title: 'product_item_field_basic_unitval'
  },
  [itemKeyNames.KEY_ITEM_UNIT_VALUE_QTY]: {
    keyName: itemKeyNames.KEY_ITEM_UNIT_VALUE_QTY,
    languageKey: 'product_item_field_basic_unitvalqty',
    defaultViewInList: true,
    sortable: true,
    name: itemKeyNames.KEY_ITEM_UNIT_VALUE_QTY,
    title: 'product_item_field_basic_unitvalqty'
  },

  [keyNames.KEY_UNIT_CREATED_BY]: {
    keyName: keyNames.KEY_UNIT_CREATED_BY,
    languageKey: 'product_item_field_basic_createdby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_UNIT_CREATED_BY,
    title: 'product_item_field_basic_createdby'
  },
  [keyNames.KEY_UNIT_CREATED_AT]: {
    keyName: keyNames.KEY_UNIT_CREATED_AT,
    languageKey: 'product_item_field_more_createdat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_UNIT_CREATED_AT,
    title: 'product_item_field_more_createdat'
  },
  [keyNames.KEY_UNIT_UPDATED_BY]: {
    keyName: keyNames.KEY_UNIT_UPDATED_BY,
    languageKey: 'product_item_field_more_updatedby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_UNIT_UPDATED_BY,
    title: 'product_item_field_more_updatedby'
  },
  [keyNames.KEY_UNIT_UPDATED_AT]: {
    keyName: keyNames.KEY_UNIT_UPDATED_AT,
    languageKey: 'product_item_field_more_updatedat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_UNIT_UPDATED_AT,
    title: 'product_item_field_more_updatedat'
  },
  [keyNames.KEY_UNIT_DELETED_BY]: {
    keyName: keyNames.KEY_UNIT_DELETED_BY,
    languageKey: 'product_item_field_more_deleteby',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_UNIT_DELETED_BY,
    title: 'product_item_field_more_deleteby'
  },
  [keyNames.KEY_UNIT_DELETED_AT]: {
    keyName: keyNames.KEY_UNIT_DELETED_AT,
    languageKey: 'product_item_field_more_deleteat',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_UNIT_DELETED_AT,
    title: 'product_item_field_more_deleteat'
  },
}

const initColumns: string[] = [
  keyNames.KEY_UNIT_CREATED_BY,
  keyNames.KEY_UNIT_CREATED_AT,
  keyNames.KEY_UNIT_UPDATED_AT,
  keyNames.KEY_UNIT_UPDATED_BY,
];

const initDeleteColumns: string[] = [
  keyNames.KEY_UNIT_DELETED_AT,
  keyNames.KEY_UNIT_DELETED_BY, 
];

const allUnitColumns: string[] = [
  keyNames.KEY_UNIT_NAME,
  keyNames.KEY_UNIT_VALUES,
  keyNames.KEY_UNIT_RELATED_PRODUCTS,
  keyNames.KEY_UNIT_ACTIVE,
];

const unitPerProdColumns: string[] = [
  itemKeyNames.KEY_ITEM_UNIT,
  itemKeyNames.KEY_ITEM_PRODUCT,
  itemKeyNames.KEY_ITEM_IMAGES,
  itemKeyNames.KEY_ITEM_NAME,
  itemKeyNames.KEY_ITEM_UNIT_VALUE,
  itemKeyNames.KEY_ITEM_UNIT_VALUE_QTY,
  itemKeyNames.KEY_ITEM_ACTIVE,
];

const deleteUnitColumns: string[] = [
  keyNames.KEY_UNIT_NAME
];

const defaultColumns = [
  keyNames.KEY_UNIT_NAME,
  keyNames.KEY_UNIT_ACTIVE,
  keyNames.KEY_UNIT_RELATED_PRODUCTS,
  keyNames.KEY_UNIT_BASE,
  keyNames.KEY_UNIT_CREATED_BY,
  keyNames.KEY_UNIT_CREATED_AT,
  keyNames.KEY_UNIT_UPDATED_AT,
  keyNames.KEY_UNIT_UPDATED_BY,
  keyNames.KEY_UNIT_DELETED_BY,
  keyNames.KEY_UNIT_DELETED_AT
];

function getUnitColumns(type: string) {
  let columns: any[] = [];
  switch (type) {
    case 'ALL_UNIT':
      columns = allUnitColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'PROD_PER_UNIT':
      // columns = unitPerProdColumns.concat(initColumns).map((key: string) => allItemColumns[key]); //
      columns = unitPerProdColumns.map((key: string) => allItemColumns[key]); // 
      break;
    case 'DELETED_UNIT':
      columns = deleteUnitColumns
        .concat(initColumns)
        .concat(initDeleteColumns)
        .map((key: string) => allColumns[key]);
      break;
    default:
      columns = defaultColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
  }
  return columns;
}

export const allUnit = getUnitColumns('ALL_UNIT');
export const prodPerUnit = getUnitColumns('PROD_PER_UNIT');
export const deletedUnit = getUnitColumns('DELETED_UNIT');
