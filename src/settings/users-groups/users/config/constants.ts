import * as keyNames from '@settings/users-groups/users/config/keyNames';

// {
//   keyName: keyNames.KEY_TICKET_PRIORITY,
//   languageKey: 'Priority',
//   defaultViewInList: true,
//   sortable: true,
//   name: keyNames.KEY_TICKET_PRIORITY,
//   title: 'Priority'
// },

export const USER_COLUMNS = [
  {
    id: keyNames.KEY_USER_DISPLAY_NAME,
    keyName: keyNames.KEY_USER_DISPLAY_NAME,
    languageKey: 'Name',
    title: 'Name',
    order: 1,
    isDefault: true
  },
  {
    id: keyNames.KEY_USER_URL_NAME,
    keyName: keyNames.KEY_USER_URL_NAME,
    languageKey: 'Url Name',
    title: 'Url Name',
    order: 2,
    isDefault: true
  },
  {
    id: keyNames.KEY_USER_EMAIL,
    keyName: keyNames.KEY_USER_EMAIL,
    languageKey: 'Email',
    title: 'Email',
    order: 3,
    isDefault: true
  },
  {
    id: keyNames.KEY_USER_PHONE,
    keyName: keyNames.KEY_USER_PHONE,
    languageKey: 'Phone',
    title: 'Phone',
    order: 4,
    isDefault: true
  },
  {
    id: keyNames.KEY_USER_UPDATEDAT,
    keyName: keyNames.KEY_USER_UPDATEDAT,
    languageKey: 'Updated on',
    title: 'Updated on',
    order: 5,
    isDefault: true
  }
];

//Change content below to change language key

export const GROUP_ADD_BUTTON_LABEL = 'Assign Group';
export const GROUP_DESCRIPTION = 'All Group assigned to this User.';
export const GROUP_NODATA = 'User is not in any group';
export const GROUP_ASSIGN_USER_MODAL_TITLE = 'Add User to Group';
export const GROUP_ASSIGN_USER_MODAL_SAVE = 'Add User';
export const GROUP_AUTOCOMPLETE_PLACEHOLDER = 'Select Group';

export const ROLE_ADD_BUTTON_LABEL = 'Assign Role';
export const ROLE_DESCRIPTION = 'All Role assigned to this User';
export const ROLE_NODATA = 'User is not assigned to any role';

export const USER_PHONE = 'Phone';
export const USER_PRIMARY_PHONE = 'Primary Phone';
export const USER_ADD_PRIMARY_PHONE = 'Add Primary Phone';
export const USER_OTHERS_PHONE = 'Others Phone';
export const USER_ADD_PHONE = 'Add Phone';
export const USER_PHONE_ERROR_EXISTED = 'Phone number already existed !!';
export const USER_PHONE_SUCCESS = 'Save Phone successfully!!';

export const USER_EMAIL = 'Email';
export const USER_PRIMARY_EMAIL = 'Primary Email';
export const USER_ADD_PRIMARY_EMAIL = 'Add Primary Email';
export const USER_OTHERS_EMAIL = 'Others Email';
export const USER_ADD_EMAIL = 'Add Email';
export const USER_EMAIL_ERROR_FORMAT = 'Email format is not correct !!';
export const USER_EMAIL_ERROR_EXISTED = 'Email already existed !!';
export const USER_EMAIL_SUCCESS = 'Save Email successfully!!';

export const USER_WRITE_TITLE_FORM = 'Create user';

export const USER_WRITE_PLACEHOLDER_DISPLAY_NAME = 'Type your display name';
export const USER_WRITE_LANGUAGE_KEY_DISPLAY_NAME = 'Display Name';

export const USER_WRITE_PLACEHOLDER_FULL_NAME = 'Type your full name';
export const USER_WRITE_LANGUAGE_KEY_FULL_NAME = 'Full Name';

export const USER_WRITE_PLACEHOLDER_URL = 'Type your URL Name';
export const USER_WRITE_LANGUAGE_KEY_URL = 'URL Name';

export const USER_VIEW_ROLE = 'Roles';
export const USER_VIEW_GROUP = 'Groups';
export const USER_VIEW_USERS = 'Users';
