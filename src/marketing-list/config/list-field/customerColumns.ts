import * as keyNames from '@marketing-list/config/keyNames';

const allColumns: any = {
  [keyNames.KEY_NAME_CUSTOMER_DELETED_BY]: {
    keyName: keyNames.KEY_NAME_CUSTOMER_DELETED_BY,
    languageKey: 'ncrm_common_field_deletedby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_CUSTOMER_DELETED_BY,
    title: 'ncrm_common_field_deletedby'
  },
  [keyNames.KEY_NAME_CUSTOMER_DELETED_AT]: {
    keyName: keyNames.KEY_NAME_CUSTOMER_DELETED_AT,
    languageKey: 'ncrm_common_field_deletedat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_CUSTOMER_DELETED_AT,
    title: 'ncrm_common_field_deletedat'
  }
};

const initColumns: string[] = [];

const initDeleteColumns: string[] = [keyNames.KEY_NAME_CUSTOMER_DELETED_BY, keyNames.KEY_NAME_CUSTOMER_DELETED_AT];

const deletedMarketingListColumns: string[] = [];

function getItemColumns(type: string) {
  let columns: any[] = [];
  switch (type) {
    case 'DELETED_MARKETING_LIST':
      columns = deletedMarketingListColumns
        .concat(initColumns)
        .concat(initDeleteColumns)
        .map((key: string) => allColumns[key]);
      break;
    default:
      columns = initColumns.map((key: string) => allColumns[key]);
      break;
  }
  return columns;
}

export const deletedMarketingList = getItemColumns('DELETED_MARKETING_LIST');
