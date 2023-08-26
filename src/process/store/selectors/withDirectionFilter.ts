import { selectorFamily } from 'recoil';

import statusAtom from '../atoms/status';

const statusWithDirection = selectorFamily({
  key: 'statusWithCount',
  get:
    (direction: string) =>
    ({ get }) => {
      return get(statusAtom).filter((status) => {
        if (status.direction.keyName == direction) {
          return true;
        }
        return false;
      });
    },
});

export default statusWithDirection;
