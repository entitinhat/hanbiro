import { atom } from 'recoil';
import { StatusForm } from '@process/types/process';

const statusAtom = atom<StatusForm[]>({
  key: 'statusAtom',
  default: []
});

export const selectedStatusAtom = atom({
  key: 'selectedStatusAtom',
  default: ''
});

export const showStatusMultipleAtom = atom({
  key: 'showMultipleAtom',
  default: false
});

export default statusAtom;
