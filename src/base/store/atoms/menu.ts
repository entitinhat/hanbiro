import { atom } from 'recoil';
import { MenuProps } from '@base/types/menu';

export const menuAtom = atom<MenuProps>({
  key: 'menuAtom',
  default: {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: false
  }
});
