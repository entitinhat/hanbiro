import { atom } from 'recoil';

export const siteWriteOptionAtom = atom({
  key: 'siteWriteOptionAtom',
  default: {
    writeType: '', //'menu', 'email',
    isOpenWrite: false,
  },
});
