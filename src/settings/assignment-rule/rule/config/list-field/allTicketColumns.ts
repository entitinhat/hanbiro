import * as keyNames from '@desk/ticket/config/keyNames';

const allTicketColumns = [
  {
    keyName: keyNames.KEY_TICKET_SUBJECT,
    languageKey: 'Subject',
    defaultViewInList: true,
    sortable: false,
    name: keyNames.KEY_TICKET_SUBJECT,
    title: 'Subject'
  }
];

export default allTicketColumns;
