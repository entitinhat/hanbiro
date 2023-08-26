import * as keyNames from '@quote/config/keyNames';

export const configFields = {
  [keyNames.KEY_NAME_QUOTE_CODE]: {
    schema: `
      code
    `
  },
  [keyNames.KEY_NAME_QUOTE_SUBJECT]: {
    schema: `
      subject
    `
  },
  [keyNames.KEY_NAME_QUOTE_PROCESS]: {
    schema: `process {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_QUOTE_DATE]: {
    schema: `
      quoteDate
    `
  },
  [keyNames.KEY_NAME_QUOTE_EXPIRY_DATE]: {
    schema: `
      expiryDate
    `
  },
  [keyNames.KEY_NAME_QUOTE_ACCOUNT]: {
    schema: `account {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_QUOTE_CONTACT]: {
    schema: `account {
      id
      name
    }
    contact {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_QUOTE_SALES_REP]: {
    schema: `salesRep {
      id
      name
    }`
  },
  [keyNames.KEY_NAME_QUOTE_CREATED_BY]: {
    schema: `
      createdBy {
        id
        name
      }
    `
  },
  [keyNames.KEY_NAME_QUOTE_UPDATED_BY]: {
    schema: `
      updatedBy {
        id
        name
      }
    `
  }
};

export const listLayoutColumns = [
  {
    keyName: keyNames.KEY_NAME_QUOTE_CODE,
    languageKey: 'Code',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_NAME_QUOTE_CODE,
    title: 'Code'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_SUBJECT,
    languageKey: 'Subject',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_SUBJECT,
    title: 'Subject'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_PROCESS,
    languageKey: 'Process',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_NAME_QUOTE_PROCESS,
    title: 'Process'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_STATUS,
    languageKey: 'Status',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_NAME_QUOTE_STATUS,
    title: 'Status'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_DATE,
    languageKey: 'Quote Date',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_DATE,
    title: 'Quote Date'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_EXPIRY_DATE,
    languageKey: 'Expiry Date',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_EXPIRY_DATE,
    title: 'Expiry Date'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_SALES_REP,
    languageKey: 'Sales Rep',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_SALES_REP,
    title: 'Sales Rep'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_CONTACT,
    languageKey: 'Customer',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_CONTACT,
    title: 'Customer'
  },
  /*{
    keyName: keyNames.KEY_NAME_QUOTE_BILL_TO,
    languageKey: 'Bill To',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_BILL_TO,
    title: 'Bill To'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_SHIP_TO,
    languageKey: 'Ship To',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_SHIP_TO,
    title: 'Ship To'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_CREATED_AT,
    languageKey: 'Created At',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_CREATED_AT,
    title: 'Created At'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_CREATED_BY,
    languageKey: 'Created By',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_CREATED_BY,
    title: 'Created By'
  },*/
  {
    keyName: keyNames.KEY_NAME_QUOTE_UPDATED_AT,
    languageKey: 'Updated At',
    defaultViewInList: false,
    sortable: true,
    name: keyNames.KEY_NAME_QUOTE_UPDATED_AT,
    title: 'Updated At'
  },
  {
    keyName: keyNames.KEY_NAME_QUOTE_UPDATED_BY,
    languageKey: 'Updated By',
    defaultViewInList: false,
    sortable: false,
    name: keyNames.KEY_NAME_QUOTE_UPDATED_BY,
    title: 'Updated By'
  }
];
