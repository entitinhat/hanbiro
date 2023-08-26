import { atomFamily } from 'recoil';

export const publicViewDataByMenuAtom = atomFamily<any | null, string>({
  key: 'PublicViewDataAtom',
  default: null,
});

export const publicListDataByMenuAtom = atomFamily<any[], string>({
  key: 'PublicListDataAtom',
  default: [],
});
