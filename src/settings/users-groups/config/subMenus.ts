import { SideMenuItem } from '@base/types/app';
import ListPage from '@settings/users-groups/users/pages/ListPage';
import ViewPage from '@settings/users-groups/users/pages/ViewPage';

export const SUB_MENUS: SideMenuItem[] = [
  {
    id: 'users',
    default: true,
    keyName: 'users',
    languageKey: 'Users',
    icon: {
      icon: 'Person',
      iconType: 'material'
    },
    layouts: [],
    component: ListPage,
    componentView: ViewPage
  },
  {
    id: 'groups',
    default: true,
    keyName: 'groups',
    languageKey: 'Groups',
    icon: {
      icon: 'Group',
      iconType: 'material'
    },
    layouts: [],
    component: ListPage,
    componentView: ViewPage
  }
];

import { NavItemType } from '@base/types/menu';

export const USERS_GROUPS_MENU: NavItemType[] = [
  {
    id: 'manage-users-groups',
    title: 'Manage Users and Groups',
    type: 'group',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/settings/manage-users-groups/users',
        license: 'admin_settings_users',
        icon: {
          icon: 'Person',
          iconType: 'material',
          color: '#673ab7'
        }
      },
      {
        id: 'groups',
        title: 'Groups',
        type: 'item',
        url: '/settings/manage-users-groups/groups',
        license: 'admin_settings_groups',
        icon: {
          icon: 'Group',
          iconType: 'material',
          color: '#673ab7'
        }
      }
    ]
  }
];
