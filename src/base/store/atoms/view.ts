import { atomFamily } from 'recoil';

// export const viewDataByMenuAtom = (menuSource: string) =>
//   atom<any | null>({
//     key: `viewData${menuSource}Atom`,
//     default: null,
//   });

export const viewDataByMenuAtom = atomFamily<any | null, string>({
  key: 'viewDataAtom',
  default: null,
});

export const listDataByMenuAtom = atomFamily<any[], string>({
  key: 'listDataAtom',
  default: [],
});
