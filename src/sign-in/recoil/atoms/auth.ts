import { atom } from 'recoil';
import Storage from '@base/utils/storages/ls';
import { IToken } from 'sign-in/types/auth';

const Ls = new Storage();
const token = Ls.get('token');

export const authAtom = atom<IToken | null>({
  key: 'authAtom',
  default: token ? JSON.parse(token) : null,
});
