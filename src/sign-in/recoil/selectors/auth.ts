import { selector } from 'recoil';
import { authAtom } from '@sign-in/recoil/atoms/auth';

export const tokenExpiryDateSelector = selector({
  key: 'tokenExpiryDateSelector',
  get: ({ get }) => {
    const date = new Date();
    const token = get(authAtom);
    return {
      dateString: date.toISOString(),
      dateNumber: token?.expiredIn,
    };
  },
});
