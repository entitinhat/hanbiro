import { LabelValue } from '@base/types/app';
import * as keyNames from '@settings/users-groups/groups/config/keyNames';
import { MemberType } from '../types/group';

export const GROUPS_COLUMNS = [
  {
    id: keyNames.KEY_GROUPS_NAME,
    keyName: keyNames.KEY_GROUPS_NAME,
    languageKey: 'Group',
    title: 'Group',
    order: 1,
    isDefault: true,
    width: '50%'
  },
  // {
  //   id: keyNames.KEY_GROUPS_DESCRIPTION,
  //   keyName: keyNames.KEY_GROUPS_DESCRIPTION,
  //   languageKey: 'Description',
  //   title: 'Description',
  //   order: 1,
  //   isDefault: true,
  // },
  {
    id: keyNames.KEY_GROUPS_NUM_DIRECTMEMBERS,
    keyName: keyNames.KEY_GROUPS_NUM_DIRECTMEMBERS,
    languageKey: 'Members',
    title: 'Members',
    order: 1,
    isDefault: false,
    defaultViewInList: false,
    isViewing: false,
    align: 'right',
    width: '15%'
  },
  // {
  //   id: keyNames.KEY_GROUPS_URL,
  //   keyName: keyNames.KEY_GROUPS_URL,
  //   languageKey: 'Url Name',
  //   title: 'Url Name',
  //   order: 1,
  //   isDefault: true
  // },
  {
    id: keyNames.KEY_GROUPS_ACCESS_TO,
    keyName: keyNames.KEY_GROUPS_ACCESS_TO,
    languageKey: 'Access To',
    title: 'Access To',
    order: 1,
    isDefault: true,
    width: '15%'
  }
  // {
  //   id: keyNames.KEY_GROUPS_CREATEDAT,
  //   keyName: keyNames.KEY_GROUPS_CREATEDAT,
  //   languageKey: 'Created At',
  //   title: 'Created At',
  //   order: 1,
  //   isDefault: false,
  //   defaultViewInList: false,
  //   isViewing: false
  // }
];

export const MEMBER_TYPES_OPTIONS = [
  {
    label: 'Group',
    value: MemberType.GROUP
  },
  {
    label: 'User',
    value: MemberType.USER
  }
];

//Change content below to change language key

export const GROUP_WRITE_TITLE_FORM = 'Create Group';

export const GROUP_WRITE_PLACEHOLDER_DESCRIPTION = 'Add a description that will appear in the group list and add group details page';
export const GROUP_WRITE_LANGUAGE_KEY_DESCRIPTION = 'Description';

export const GROUP_WRITE_LANGUAGE_KEY_URL = 'URL Name';
export const GROUP_WRITE_PLACEHOLDER_URL = 'Type your URL Name';

export const GROUP_WRITE_PLACEHOLDER_NAME = 'Type your Group name';
export const GROUP_WRITE_LANGUAGE_KEY_NAME = 'Group name';

export const MEMBERSHIP_DESCRIPTION = 'All Members assigned to this Group.';
export const MEMBERSHIP_NO_DATA = 'No members in this group';
export const MEMBERSHIP_ADD_BUTTON_LABEL = ' Add group members';
export const MEMBERSHIP_ERROR = 'MemberId Already Exist, Please add order member ';

export const GROUP_VIEW_MEMBERSHIPS = 'Memberships';
export const GROUP_VIEW_GROUPS = 'Groups';
