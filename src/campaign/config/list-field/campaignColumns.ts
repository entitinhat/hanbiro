import * as keyNames from '@campaign/config/keyNames';

const allColumns: any = {
  [keyNames.KEY_CAMPAIGN_DELETED_BY]: {
    keyName: keyNames.KEY_CAMPAIGN_DELETED_BY,
    languageKey: 'ncrm_common_field_deletedby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_CAMPAIGN_DELETED_BY,
    title: 'ncrm_common_field_deletedby'
  },
  [keyNames.KEY_CAMPAIGN_DELETED_AT]: {
    keyName: keyNames.KEY_CAMPAIGN_DELETED_AT,
    languageKey: 'ncrm_common_field_deletedat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_CAMPAIGN_DELETED_AT,
    title: 'ncrm_common_field_deletedat'
  }
};

const initColumns: string[] = [];

const initDeletedColumns: string[] = [keyNames.KEY_CAMPAIGN_DELETED_BY, keyNames.KEY_CAMPAIGN_DELETED_AT];

const deletedCustomColumns: string[] = [];

function getItemColumns(type: string) {
  let columns: any[] = [];
  switch (type) {
    case 'DELETED_CAMPAIGN':
      columns = deletedCustomColumns
        .concat(initColumns)
        .concat(initDeletedColumns)
        .map((key: string) => allColumns[key]);
      break;
    default:
      columns = initColumns.map((key: string) => allColumns[key]);
      break;
  }
  return columns;
}

export const deletedCampaign = getItemColumns('DELETED_CAMPAIGN');
