import * as keyNames from '@activity/config/keyNames';
export const allBasicColumns: any = {
  [keyNames.KEY_NAME_COMPARISON_USERNAME]: {
    keyName: keyNames.KEY_NAME_COMPARISON_USERNAME,
    languageKey: 'activity_comparison_field_basic_user',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_COMPARISON_USERNAME,
    title: 'activity_comparison_field_basic_user',
    isDisabled: false
  },
  [keyNames.KEY_NAME_COMPARISON_OUTGOING_CALL]: {
    keyName: keyNames.KEY_NAME_COMPARISON_OUTGOING_CALL,
    languageKey: 'activity_comparison_field_basic_outgoingcall',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_COMPARISON_OUTGOING_CALL,
    title: 'activity_comparison_field_basic_outgoingcall',
    isDisabled: false
  },
  [keyNames.KEY_NAME_COMPARISON_INCOMING_CALL]: {
    keyName: keyNames.KEY_NAME_COMPARISON_INCOMING_CALL,
    languageKey: 'activity_comparison_field_basic_incomingcall',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_COMPARISON_INCOMING_CALL,
    title: 'activity_comparison_field_basic_incomingcall',
    isDisabled: false
  },
  [keyNames.KEY_NAME_COMPARISON_ALL_CALL_DURATION]: {
    keyName: keyNames.KEY_NAME_COMPARISON_ALL_CALL_DURATION,
    languageKey: 'activity_comparison_field_basic_allcallduration',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_COMPARISON_ALL_CALL_DURATION,
    title: 'activity_comparison_field_basic_allcallduration',
    isDisabled: false
  },
  [keyNames.KEY_NAME_COMPARISON_SENT_EMAIL]: {
    keyName: keyNames.KEY_NAME_COMPARISON_SENT_EMAIL,
    languageKey: 'activity_comparison_field_basic_sentemail',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_COMPARISON_SENT_EMAIL,
    title: 'activity_comparison_field_basic_sentemail',
    isDisabled: false
  },
  [keyNames.KEY_NAME_COMPARISON_RECEIVED_EMAIL]: {
    keyName: keyNames.KEY_NAME_COMPARISON_RECEIVED_EMAIL,
    languageKey: 'activity_comparison_field_basic_receivedemail',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_COMPARISON_RECEIVED_EMAIL,
    title: 'activity_comparison_field_basic_receivedemail',
    isDisabled: false
  },
  [keyNames.KEY_NAME_COMPARISON_SENT_SMS]: {
    keyName: keyNames.KEY_NAME_COMPARISON_SENT_SMS,
    languageKey: 'activity_comparison_field_basic_sentsms',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_COMPARISON_SENT_SMS,
    title: 'activity_comparison_field_basic_sentsms',
    isDisabled: false
  },
  [keyNames.KEY_NAME_COMPARISON_TASK]: {
    keyName: keyNames.KEY_NAME_COMPARISON_TASK,
    languageKey: 'activity_comparison_field_basic_task',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_COMPARISON_TASK,
    title: 'activity_comparison_field_basic_task',
    isDisabled: false
  },
  [keyNames.KEY_NAME_COMPARISON_GROUPNAME]: {
    keyName: keyNames.KEY_NAME_COMPARISON_GROUPNAME,
    languageKey: 'activity_comparison_field_basic_group',
    defaultViewInList: true,
    sortable: true,
    name: keyNames.KEY_NAME_COMPARISON_GROUPNAME,
    title: 'activity_comparison_field_basic_group',
    isDisabled: false
  }
};

const myUserColumns = [
  keyNames.KEY_NAME_COMPARISON_USERNAME,
  keyNames.KEY_NAME_COMPARISON_OUTGOING_CALL,
  keyNames.KEY_NAME_COMPARISON_INCOMING_CALL,
  keyNames.KEY_NAME_COMPARISON_ALL_CALL_DURATION,
  keyNames.KEY_NAME_COMPARISON_SENT_EMAIL,
  keyNames.KEY_NAME_COMPARISON_RECEIVED_EMAIL,
  keyNames.KEY_NAME_COMPARISON_SENT_SMS,
  keyNames.KEY_NAME_COMPARISON_TASK
];

const myGroupColumns = [
  keyNames.KEY_NAME_COMPARISON_GROUPNAME,
  keyNames.KEY_NAME_COMPARISON_OUTGOING_CALL,
  keyNames.KEY_NAME_COMPARISON_INCOMING_CALL,
  keyNames.KEY_NAME_COMPARISON_ALL_CALL_DURATION,
  keyNames.KEY_NAME_COMPARISON_SENT_EMAIL,
  keyNames.KEY_NAME_COMPARISON_RECEIVED_EMAIL,
  keyNames.KEY_NAME_COMPARISON_SENT_SMS,
  keyNames.KEY_NAME_COMPARISON_TASK
];

function getItemColumns(type: String) {
  let columns: any[] = [];
  const allColumns = { ...allBasicColumns };
  switch (type) {
    case 'user':
      columns = myUserColumns.map((keyName) => {
        return allColumns[keyName];
      });
      break;
    default:
      columns = myGroupColumns.map((keyName) => {
        return allColumns[keyName];
      });
      break;
  }

  return columns;
}
export const comparisonUser = getItemColumns('user');
export const comparisonGroup = getItemColumns('group');
