import { atom } from 'recoil';

export const publicPageLayoutsAtom = atom<any>({
  key: 'PublicPageLayoutsAtom',
  default: [] //[{menu, data}]
});
