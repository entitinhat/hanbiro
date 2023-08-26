import { atom } from 'recoil';
import { User } from '@base/types/user';

export const userAtom = atom<User>({
  key: 'userAtom',
  default: {} as User
});
