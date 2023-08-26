import * as keyNames from '@product/product/config/keyNames';

export const allBasicColumns: any = {
  [keyNames.KEY_PRODUCT_NAME]: {
    keyName: keyNames.KEY_PRODUCT_NAME,
    languageKey: 'product_product_field_basic_name',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_NAME,
    title: 'product_product_field_basic_name',
    isDisabled: true
  },
  [keyNames.KEY_PRODUCT_TYPE_BE_SOLD]: {
    keyName: keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
    languageKey: 'product_product_field_basic_canbesold',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
    title: 'product_product_field_basic_canbesold'
  },
  [keyNames.KEY_PRODUCT_CODE]: {
    keyName: keyNames.KEY_PRODUCT_CODE,
    languageKey: 'product_product_field_basic_code',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_PRODUCT_CODE,
    title: 'product_product_field_basic_code'
  },
  [keyNames.KEY_PRODUCT_GROUP]: {
    keyName: keyNames.KEY_PRODUCT_GROUP,
    languageKey: 'product_product_field_basic_group',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_GROUP,
    title: 'product_product_field_basic_group'
  },
  [keyNames.KEY_PRODUCT_TYPE]: {
    keyName: keyNames.KEY_PRODUCT_TYPE,
    languageKey: 'product_product_field_basic_type',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_TYPE,
    title: 'product_product_field_basic_type'
  },
  [keyNames.KEY_PRODUCT_START_DATE]: {
    keyName: keyNames.KEY_PRODUCT_START_DATE,
    languageKey: 'product_product_field_basic_startdate',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_START_DATE,
    title: 'product_product_field_basic_startdate'
  },
  [keyNames.KEY_PRODUCT_END_DATE]: {
    keyName: keyNames.KEY_PRODUCT_END_DATE,
    languageKey: 'product_product_field_basic_enddate',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_END_DATE,
    title: 'product_product_field_basic_enddate'
  },
  [keyNames.KEY_PRODUCT_VENDOR]: {
    keyName: keyNames.KEY_PRODUCT_VENDOR,
    languageKey: 'product_product_field_basic_vendor',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_VENDOR,
    title: 'product_product_field_basic_vendor'
  },
  [keyNames.KEY_PRODUCT_BASE_UNIT]: {
    keyName: keyNames.KEY_PRODUCT_BASE_UNIT,
    languageKey: 'product_product_field_basic_unit',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_BASE_UNIT,
    title: 'product_product_field_basic_unit'
  },
  [keyNames.KEY_PRODUCT_ATTRIBUTE]: {
    keyName: keyNames.KEY_PRODUCT_ATTRIBUTE,
    languageKey: 'product_product_field_basic_attributes',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_ATTRIBUTE,
    title: 'product_product_field_basic_attributes'
  },
  [keyNames.KEY_PRODUCT_ACTIVE]: {
    keyName: keyNames.KEY_PRODUCT_ACTIVE,
    languageKey: 'product_product_field_basic_active',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_ACTIVE,
    title: 'product_product_field_basic_active'
  },
  [keyNames.KEY_PRODUCT_ASSIGN_TO]: {
    keyName: keyNames.KEY_PRODUCT_ASSIGN_TO,
    languageKey: 'product_product_field_basic_assignto',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_ASSIGN_TO,
    title: 'product_product_field_basic_assignto'
  },
  [keyNames.KEY_PRODUCT_DELETED_AT]: {
    keyName: keyNames.KEY_PRODUCT_DELETED_AT,
    languageKey: 'ncrm_common_field_deletedat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_PRODUCT_DELETED_AT,
    title: 'ncrm_common_field_deletedat'
  }
};

const allMoreColumns: any = {
  [keyNames.KEY_PRODUCT_CREATED_BY]: {
    keyName: keyNames.KEY_PRODUCT_CREATED_BY,
    languageKey: 'product_product_field_more_createdby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_PRODUCT_CREATED_BY,
    title: 'product_product_field_more_createdby'
  },
  [keyNames.KEY_PRODUCT_CREATED_AT]: {
    keyName: keyNames.KEY_PRODUCT_CREATED_AT,
    languageKey: 'product_product_field_more_createdat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_PRODUCT_CREATED_AT,
    title: 'product_product_field_more_createdat'
  },
  [keyNames.KEY_PRODUCT_UPDATED_BY]: {
    keyName: keyNames.KEY_PRODUCT_UPDATED_BY,
    languageKey: 'product_product_field_more_updatedby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_PRODUCT_UPDATED_BY,
    title: 'product_product_field_more_updatedby'
  },
  [keyNames.KEY_PRODUCT_UPDATED_AT]: {
    keyName: keyNames.KEY_PRODUCT_UPDATED_AT,
    languageKey: 'product_product_field_more_updatedat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_PRODUCT_UPDATED_AT,
    title: 'product_product_field_more_updatedat'
  }
};

const allMoreDeletedColumns: any = {
  [keyNames.KEY_PRODUCT_DELETED_BY]: {
    keyName: keyNames.KEY_PRODUCT_DELETED_BY,
    languageKey: 'ncrm_common_field_deletedby',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_DELETED_BY,
    title: 'ncrm_common_field_deletedby'
  },
  [keyNames.KEY_PRODUCT_DELETED_AT]: {
    keyName: keyNames.KEY_PRODUCT_DELETED_AT,
    languageKey: 'ncrm_common_field_deletedat',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_PRODUCT_DELETED_AT,
    title: 'ncrm_common_field_deletedat'
  }
};

const allProductColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_CODE,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

const myProductColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE
];

const myGroupProductColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

const unassignedProductColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE
];

const productsPerGroupColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

const canBeSoldProductColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_CODE,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

const purchasedProductColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_CODE,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

const producedProductColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_CODE,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

const activeProductColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

const inActiveProductColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

const notCreatedItemColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_CODE,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_TYPE,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

const deletedProductColumns = [keyNames.KEY_PRODUCT_NAME];

const moreColumns = [
  keyNames.KEY_PRODUCT_CREATED_BY,
  keyNames.KEY_PRODUCT_CREATED_AT,
  keyNames.KEY_PRODUCT_UPDATED_BY,
  keyNames.KEY_PRODUCT_UPDATED_AT
];

const moreDeletedColumns = [keyNames.KEY_PRODUCT_DELETED_BY, keyNames.KEY_PRODUCT_DELETED_AT];

const defaultColumns = [
  keyNames.KEY_PRODUCT_NAME,
  keyNames.KEY_PRODUCT_CODE,
  keyNames.KEY_PRODUCT_GROUP,
  keyNames.KEY_PRODUCT_TYPE,
  // keyNames.KEY_PRODUCT_START_DATE,
  // keyNames.KEY_PRODUCT_END_DATE,
  // keyNames.KEY_PRODUCT_VENDOR,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ATTRIBUTE,
  keyNames.KEY_PRODUCT_ACTIVE,
  keyNames.KEY_PRODUCT_TYPE_BE_SOLD,
  keyNames.KEY_PRODUCT_BASE_UNIT,
  keyNames.KEY_PRODUCT_ASSIGN_TO
];

function getItemColumns(type: String) {
  let columns: any[] = [];
  const allColumns = { ...allBasicColumns, ...allMoreColumns, ...allMoreDeletedColumns };
  switch (type) {
    case 'allProductColumns':
      columns = allProductColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'myProductColumns':
      columns = myProductColumns.concat(moreColumns).map((keyName) => {
        if (keyName == keyNames.KEY_PRODUCT_ASSIGN_TO) {
          return {
            ...allColumns[keyName],
            defaultViewInList: false
          };
        } else {
          return allColumns[keyName];
        }
      });
      break;
    case 'myGroupProductColumns':
      columns = myGroupProductColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'myGroupProduct2Columns':
      columns = myGroupProductColumns.concat(moreColumns).map((keyName) => {
        if (keyName == keyNames.KEY_PRODUCT_ASSIGN_TO) {
          return {
            ...allColumns[keyName],
            defaultViewInList: false
          };
        } else {
          return allColumns[keyName];
        }
      });
      break;
    case 'unassignedProductColumns':
      columns = unassignedProductColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'productsPerGroup':
      columns = productsPerGroupColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'productsPerGroup2':
      columns = productsPerGroupColumns.concat(moreColumns).map((keyName) => {
        if (keyName == keyNames.KEY_PRODUCT_GROUP) {
          return {
            ...allColumns[keyName],
            defaultViewInList: false
          };
        } else {
          return allColumns[keyName];
        }
      });
      break;
    case 'canBeSoldProductColumns':
      columns = canBeSoldProductColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'purchasedProductColumns':
      columns = purchasedProductColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'producedProductColumns':
      columns = producedProductColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'activeProduct':
      columns = activeProductColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'inActiveProduct':
      columns = inActiveProductColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'notCreatedItemColumns':
      columns = notCreatedItemColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'deletedProductColumns':
      columns = deletedProductColumns.concat(moreColumns, moreDeletedColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
    case 'gridSplitProduct':
      columns = defaultColumns.concat(moreColumns).map((key: string) => allColumns[key]);
      break;
    default:
      columns = defaultColumns.concat(moreColumns).map((keyName) => {
        return allColumns[keyName];
      });
      break;
  }

  return columns;
}

export const all = getItemColumns('allProductColumns');
export const myProduct = getItemColumns('myProductColumns');
export const myGroupProduct = getItemColumns('myGroupProductColumns');
export const myGroupProduct2 = getItemColumns('myGroupProduct2Columns');
export const unassignedProduct = getItemColumns('unassignedProductColumns');
export const productsPerGroup = getItemColumns('productsPerGroup');
export const productsPerGroup2 = getItemColumns('productsPerGroup2');
export const canBeSoldProduct = getItemColumns('canBeSoldProductColumns');
export const purchasedProduct = getItemColumns('purchasedProductColumns');
export const producedProduct = getItemColumns('producedProductColumns');
export const inActiveProduct = getItemColumns('inActiveProduct');
export const activeProduct = getItemColumns('activeProduct');
export const notCreatedItem = getItemColumns('notCreatedItemColumns');
export const deletedProduct = getItemColumns('deletedProductColumns');
export const gridSplitProduct = getItemColumns('gridSplitProduct');
