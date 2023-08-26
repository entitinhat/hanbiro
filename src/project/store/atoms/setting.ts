import { atom } from 'recoil';
import { Setting } from '@project/types/setting';

export const projectSettingsAtom = atom<Setting[]>({
  key: 'projectSettingsAtom',
  default: []
});
