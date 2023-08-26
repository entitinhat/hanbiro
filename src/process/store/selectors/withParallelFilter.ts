import { selectorFamily } from 'recoil';

import statusAtom from '../atoms/status';

const statusWithParallel = selectorFamily({
  key: 'statusWithCount',
  get:
    (type: 'normal' | 'cta' | 'all') =>
    ({ get }) => {
      return get(statusAtom).filter((status) => {
        if (
          type == 'cta'
            ? status.ctaId != ''
            : status.ctaId == '' && status.direction.keyName == 'DIRECTION_FORWARD_OUTGOING_RIGHT' && status.multiple == 'MULTIPLE_PARALLEL'
        ) {
          return true;
        }
        return false;
      });
    }
});

export default statusWithParallel;
