import * as keyNames from '@lead/config/keyNames';

const allColumns: any = {
  [keyNames.KEY_LEAD_TITLE]: {
    keyName: keyNames.KEY_LEAD_TITLE,
    languageKey: 'sales_lead_field_basic_title',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_TITLE,
    title: 'sales_lead_field_basic_title'
  },
  [keyNames.KEY_LEAD_CONTACT_NAME]: {
    keyName: keyNames.KEY_LEAD_CONTACT_NAME,
    languageKey: 'sales_lead_field_basic_contactname',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_CONTACT_NAME,
    title: 'sales_lead_field_basic_contactname'
  },
  [keyNames.KEY_LEAD_PRIORITIZE]: {
    keyName: keyNames.KEY_LEAD_PRIORITIZE,
    languageKey: 'sales_lead_field_basic_is_prioritize',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_PRIORITIZE,
    title: 'sales_lead_field_basic_is_prioritize'
  },
  [keyNames.KEY_LEAD_SOURCE]: {
    keyName: keyNames.KEY_LEAD_SOURCE,
    languageKey: 'sales_lead_field_basic_source',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_SOURCE,
    title: 'sales_lead_field_basic_source'
  },
  [keyNames.KEY_LEAD_PRODUCT]: {
    keyName: keyNames.KEY_LEAD_PRODUCT,
    languageKey: 'sales_lead_field_basic_products',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_PRODUCT,
    title: 'sales_lead_field_basic_products'
  },
  [keyNames.KEY_LEAD_COLLECTION_METHOD]: {
    keyName: keyNames.KEY_LEAD_COLLECTION_METHOD,
    languageKey: 'sales_lead_field_basic_collectionmethod',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_COLLECTION_METHOD,
    title: 'sales_lead_field_basic_collectionmethod'
  },
  [keyNames.KEY_LEAD_CONTACT_EMAIL]: {
    keyName: keyNames.KEY_LEAD_CONTACT_EMAIL,
    languageKey: 'sales_lead_field_basic_email',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_CONTACT_EMAIL,
    title: 'sales_lead_field_basic_email'
  },
  [keyNames.KEY_LEAD_ASSIGN_TO]: {
    keyName: keyNames.KEY_LEAD_ASSIGN_TO,
    languageKey: 'sales_lead_field_basic_assignto',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_ASSIGN_TO,
    title: 'sales_lead_field_basic_assignto'
  },
  [keyNames.KEY_LEAD_TYPE]: {
    keyName: keyNames.KEY_LEAD_TYPE,
    languageKey: 'sales_lead_field_basic_type',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_TYPE,
    title: 'sales_lead_field_basic_type'
  },
  [keyNames.KEY_LEAD_DISQUALIFIED_DATE]: {
    keyName: keyNames.KEY_LEAD_DISQUALIFIED_DATE,
    languageKey: 'sales_lead_field_basic_disqualifiedate',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_DISQUALIFIED_DATE,
    title: 'sales_lead_field_basic_disqualifiedate'
  },
  [keyNames.KEY_LEAD_UN_DISQUALIFIED_DATE]: {
    keyName: keyNames.KEY_LEAD_UN_DISQUALIFIED_DATE,
    languageKey: 'sales_lead_field_basic_undisqualifiedate',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_LEAD_UN_DISQUALIFIED_DATE,
    title: 'sales_lead_field_basic_undisqualifiedate'
  },

  [keyNames.KEY_LEAD_CREATED_BY]: {
    keyName: keyNames.KEY_LEAD_CREATED_BY,
    languageKey: 'sales_lead_field_basic_createdby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_LEAD_CREATED_BY,
    title: 'sales_lead_field_basic_createdby'
  },
  [keyNames.KEY_LEAD_CREATED_AT]: {
    keyName: keyNames.KEY_LEAD_CREATED_AT,
    languageKey: 'sales_lead_field_more_createdat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_LEAD_CREATED_AT,
    title: 'sales_lead_field_more_createdat'
  },
  [keyNames.KEY_LEAD_UPDATED_BY]: {
    keyName: keyNames.KEY_LEAD_UPDATED_BY,
    languageKey: 'sales_lead_field_basic_updatedby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_LEAD_UPDATED_BY,
    title: 'sales_lead_field_basic_updatedby'
  },
  [keyNames.KEY_LEAD_UPDATED_AT]: {
    keyName: keyNames.KEY_LEAD_UPDATED_AT,
    languageKey: 'sales_lead_field_more_updatedat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_LEAD_UPDATED_AT,
    title: 'sales_lead_field_more_updatedat'
  },
  [keyNames.KEY_LEAD_DELETED_BY]: {
    keyName: keyNames.KEY_LEAD_DELETED_BY,
    languageKey: 'ncrm_common_field_deletedby',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_LEAD_DELETED_BY,
    title: 'ncrm_common_field_deletedby'
  },
  [keyNames.KEY_LEAD_DELETED_AT]: {
    keyName: keyNames.KEY_LEAD_DELETED_AT,
    languageKey: 'ncrm_common_field_deletedat',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_LEAD_DELETED_AT,
    title: 'ncrm_common_field_deletedat'
  }
};

const initColumns: string[] = [
  //keyNames.KEY_LEAD_CREATED_BY,
  keyNames.KEY_LEAD_CREATED_AT
  //keyNames.KEY_LEAD_UPDATED_BY,
  //keyNames.KEY_LEAD_UPDATED_AT
];

const initDeleteColumns: string[] = [keyNames.KEY_LEAD_DELETED_BY, keyNames.KEY_LEAD_DELETED_AT];

const allcol: string[] = [
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_SOURCE,
  keyNames.KEY_LEAD_PRODUCT,
  keyNames.KEY_LEAD_COLLECTION_METHOD,
  keyNames.KEY_LEAD_CONTACT_EMAIL,
  // keyNames.KEY_LEAD_TYPE,
  keyNames.KEY_LEAD_ASSIGN_TO
];

const myLeadColumns: string[] = [
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_SOURCE,
  keyNames.KEY_LEAD_PRODUCT,
  keyNames.KEY_LEAD_COLLECTION_METHOD,
  keyNames.KEY_LEAD_CONTACT_EMAIL,
  keyNames.KEY_LEAD_ASSIGN_TO
];

const myGroupLead1Columns: string[] = [
  keyNames.KEY_LEAD_ASSIGN_TO,
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_SOURCE,
  keyNames.KEY_LEAD_PRODUCT,
  keyNames.KEY_LEAD_COLLECTION_METHOD,
  keyNames.KEY_LEAD_CONTACT_EMAIL
];

const myGroupLead2Columns: string[] = [
  keyNames.KEY_LEAD_ASSIGN_TO,
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_SOURCE,
  keyNames.KEY_LEAD_PRODUCT,
  keyNames.KEY_LEAD_COLLECTION_METHOD,
  keyNames.KEY_LEAD_CONTACT_EMAIL
];

const allDisqualifiedolumns: string[] = [
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_SOURCE,
  keyNames.KEY_LEAD_PRODUCT,
  keyNames.KEY_LEAD_COLLECTION_METHOD,
  keyNames.KEY_LEAD_CONTACT_EMAIL,
  keyNames.KEY_LEAD_ASSIGN_TO,
  keyNames.KEY_LEAD_DISQUALIFIED_DATE
];

const allUndisqualifiedColumns: string[] = [
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_SOURCE,
  keyNames.KEY_LEAD_PRODUCT,
  keyNames.KEY_LEAD_COLLECTION_METHOD,
  keyNames.KEY_LEAD_CONTACT_EMAIL,
  keyNames.KEY_LEAD_ASSIGN_TO,
  keyNames.KEY_LEAD_UN_DISQUALIFIED_DATE
];

const allDeleted1Columns: string[] = [
  keyNames.KEY_LEAD_TYPE,
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  // keyNames.KEY_LEAD_SOURCE,
  // keyNames.KEY_LEAD_PRODUCT,
  // keyNames.KEY_LEAD_COLLECTION_METHOD,
  // keyNames.KEY_LEAD_CONTACT_EMAIL,
  // keyNames.KEY_LEAD_ASSIGN_TO,
  keyNames.KEY_LEAD_DELETED_BY,
  keyNames.KEY_LEAD_DELETED_AT
];

const allDeleted2Columns: string[] = [
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_TYPE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  // keyNames.KEY_LEAD_SOURCE,
  // keyNames.KEY_LEAD_PRODUCT,
  // keyNames.KEY_LEAD_COLLECTION_METHOD,
  // keyNames.KEY_LEAD_CONTACT_EMAIL,
  // keyNames.KEY_LEAD_ASSIGN_TO,
  keyNames.KEY_LEAD_DELETED_BY,
  keyNames.KEY_LEAD_DELETED_AT
];

const gridSplitColumns: string[] = [
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_SOURCE,
  keyNames.KEY_LEAD_PRODUCT,
  keyNames.KEY_LEAD_COLLECTION_METHOD,
  keyNames.KEY_LEAD_CONTACT_EMAIL,
  keyNames.KEY_LEAD_ASSIGN_TO,
  keyNames.KEY_LEAD_CREATED_AT
]

const defaultColumns = [
  keyNames.KEY_LEAD_TITLE,
  keyNames.KEY_LEAD_PRIORITIZE,
  keyNames.KEY_LEAD_CONTACT_NAME,
  keyNames.KEY_LEAD_SOURCE,
  keyNames.KEY_LEAD_PRODUCT,
  keyNames.KEY_LEAD_COLLECTION_METHOD,
  keyNames.KEY_LEAD_CONTACT_EMAIL,
  keyNames.KEY_LEAD_ASSIGN_TO,
  keyNames.KEY_LEAD_CREATED_BY,
  keyNames.KEY_LEAD_CREATED_AT,
  keyNames.KEY_LEAD_UPDATED_BY,
  keyNames.KEY_LEAD_UPDATED_AT,
  keyNames.KEY_LEAD_DELETED_BY,
  keyNames.KEY_LEAD_DELETED_AT
];

function getItemColumns(type: string) {
  let columns: any[] = [];
  switch (type) {
    case 'ALL_LEAD':
      columns = allcol.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'MY_LEAD':
      columns = myLeadColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'MY_GROUP_LEAD1':
      columns = myGroupLead1Columns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
    case 'MY_GROUP_LEAD2':
      columns = myGroupLead2Columns.concat(initColumns).map((key: string) => {
        if (key == keyNames.KEY_LEAD_ASSIGN_TO) {
          return {
            ...allColumns[key],
            defaultViewInList: false
          };
        } else {
          return allColumns[key];
        }
      });
      break;
    case 'ALL_DISQUALIFIED':
      columns = allDisqualifiedolumns.concat([]).map((key: string) => allColumns[key]);
      break;
    case 'ALL_UNDISQUALIFIED':
      columns = allUndisqualifiedColumns.concat([]).map((key: string) => allColumns[key]);
      break;
    case 'ALL_DELETED1':
      columns = allDeleted1Columns.concat([]).map((key: string) => allColumns[key]);
      break;
    case 'ALL_DELETED2':
      columns = allDeleted2Columns.concat([]).map((key: string) => {
        return key == keyNames.KEY_LEAD_TYPE ? {...allColumns[key], defaultViewInList: false } : allColumns[key]
      });
      break;
    case 'GRID_SPLIT':
      columns = gridSplitColumns.concat([]).map((key: string) => allColumns[key]);
      break;
    default:
      columns = defaultColumns.concat(initColumns).map((key: string) => allColumns[key]);
      break;
  }
  return columns;
}

export const all = getItemColumns('ALL_LEAD');
export const myLead = getItemColumns('MY_LEAD');
export const myGroupLead1 = getItemColumns('MY_GROUP_LEAD1');
export const myGroupLead2 = getItemColumns('MY_GROUP_LEAD2');
export const allDisqualified = getItemColumns('ALL_DISQUALIFIED');
export const allUndisqualified = getItemColumns('ALL_UNDISQUALIFIED');
export const allDeleted1 = getItemColumns('ALL_DELETED1');
export const allDeleted2 = getItemColumns('ALL_DELETED2');
export const gridSplit = getItemColumns('GRID_SPLIT');