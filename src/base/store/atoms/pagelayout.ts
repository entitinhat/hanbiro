import { atom } from 'recoil';

export const pageLayoutsAtom = atom<any>({
  key: 'pageLayoutsAtom',
  default: [], //[{menu, data}]
});
