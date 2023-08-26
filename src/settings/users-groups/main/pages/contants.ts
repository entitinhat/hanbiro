import { NavItemType } from '@base/types/menu';

export const SITE_MENU: NavItemType[] = [
  {
    id: 'site',
    title: 'Site',
    type: 'group',
    children: [
      {
        id: 'desk',
        title: 'ncrm_generalsetting_site_menu_desk',
        type: 'item',
        url: '/settings/sites/desk',
        icon: {
          icon: 'desk',
          iconType: 'main',
          color: '#673ab7'
        }
      }
    ]
  }
];
