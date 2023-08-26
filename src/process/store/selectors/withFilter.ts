import { selectorFamily } from 'recoil';

import statusAtom from '../atoms/status';

const statusWithFilter = selectorFamily({
  key: 'statusWithFilter',
  get:
    (type: 'normal' | 'cta' | 'all') =>
    ({ get }) => {
      return get(statusAtom).filter((status) =>
        type == 'cta' ? status.ctaId != '' : status.ctaId == '',
      );
    },
});

export default statusWithFilter;
