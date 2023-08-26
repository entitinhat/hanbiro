import * as baseKeyNames from "@base/config/keyNames";
import * as keyNames from '@analytic/sus-log/config/keyNames';

const allColumns = [
  {
    keyName: keyNames.SUS_LOG_URL,
    languageKey: 'Url',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.SUS_LOG_URL,
    title: 'Url'
  },
  {
    keyName: keyNames.SUS_LOG_CAMPAIGN,
    languageKey: 'Campaign',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.SUS_LOG_CAMPAIGN,
    title: 'Campaign'
  },
  {
    keyName: keyNames.SUS_LOG_SOURCE,
    languageKey: 'Source',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.SUS_LOG_SOURCE,
    title: 'Source'
  },
  {
    keyName: keyNames.SUS_LOG_MEDIUM,
    languageKey: 'Medium',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.SUS_LOG_MEDIUM,
    title: 'Medium'
  },
  {
    keyName: keyNames.SUS_LOG_CUSTOMER,
    languageKey: 'Customer',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.SUS_LOG_CUSTOMER,
    title: 'Customer'
  },
  {
    keyName: baseKeyNames.KEY_NAME_CREATED_BY,
    languageKey: 'Created By',
    defaultViewInList: true,
    sortable: true,
    name: baseKeyNames.KEY_NAME_CREATED_BY,
    title: 'Created By'
  },
  {
    keyName: baseKeyNames.KEY_NAME_CREATED_AT,
    languageKey: 'Created At',
    defaultViewInList: true,
    sortable: true,
    name: baseKeyNames.KEY_NAME_CREATED_AT,
    title: 'Created At'
  },
  {
    keyName: keyNames.SUS_LOG_TOTAL_CLICK,
    languageKey: 'Total Click',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.SUS_LOG_TOTAL_CLICK,
    title: 'Total Click'
  }
];

export default allColumns;
