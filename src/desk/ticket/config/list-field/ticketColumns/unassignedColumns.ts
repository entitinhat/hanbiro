import * as keyNames from '@desk/ticket/config/keyNames';

const unassignedColumns = [
  {
    keyName: keyNames.KEY_TICKET_SUBJECT,
    languageKey: 'Subject',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_TICKET_SUBJECT,
    title: 'Subject'
  },
  {
    keyName: keyNames.KEY_TICKET_PRIORITY,
    languageKey: 'Priority',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_TICKET_PRIORITY,
    title: 'Priority'
  },
  {
    keyName: keyNames.KEY_TICKET_CUSTOMER,
    languageKey: 'Customer',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_TICKET_CUSTOMER,
    title: 'Customer'
  },
  {
    keyName: keyNames.KEY_TICKET_STAGE,
    languageKey: 'Stage',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_TICKET_STAGE,
    title: 'Stage'
  },
  {
    keyName: keyNames.KEY_TICKET_STATUS,
    languageKey: 'Status',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_TICKET_STATUS,
    title: 'Status'
  },

  //STAGE???

  {
    keyName: keyNames.KEY_TICKET_ASSIGN_USER,
    languageKey: 'Assigned User',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_TICKET_ASSIGN_USER,
    title: 'Assigned User'
  },
  {
    keyName: keyNames.KEY_TICKET_RESOLUTION_DUE,
    languageKey: 'Resolution Due',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_TICKET_RESOLUTION_DUE,
    title: 'Resolution Due'
  }
];

export default unassignedColumns;
