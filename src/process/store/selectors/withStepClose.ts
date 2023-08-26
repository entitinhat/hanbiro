import { selector } from 'recoil';

import statusAtom from '../atoms/status';
import stepTypeAtom, { stepOpenAtom } from '../atoms/step';

const stepWithClose = selector({
  key: 'stepWithClose',
  get: () => {},
  set: ({ reset }) => {
    reset(stepTypeAtom);
    reset(stepOpenAtom);
    reset(statusAtom);
  }
});

export default stepWithClose;
