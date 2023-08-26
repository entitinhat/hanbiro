import { atom } from 'recoil';

import { getSidebarSize } from '@process/pages/ListPage/Setting/Helper';
import { SettingOpen } from '@process/types/settings';

export const settingOpenAtom = atom<SettingOpen>({
  key: 'processSettingOpenAtom',
  default: {
    open: false,
    type: 'action',
    size: getSidebarSize('action')
  }
});
