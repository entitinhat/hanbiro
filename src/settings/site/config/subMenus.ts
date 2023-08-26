import { SideMenuItem } from '@base/types/app';
import { ListPage, ViewPage } from './pages/mainPage';

export const SUB_MENUS: SideMenuItem[] = [
  {
    id: 'desk_site',
    default: true,
    keyName: 'desk',
    languageKey: 'Desk Site', //'crm_new_setting_format_setting',
    icon: {
      icon: 'Globe',
      iconType: 'feather',
    },
    layouts: [],
    component: ListPage,
    componentView: ViewPage,
  },
];
