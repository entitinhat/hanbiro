import { atom } from 'recoil';

export const skuSettingsAtom = atom<any | null>({
  key: 'skuSettingsAtom',
  default: null
});
