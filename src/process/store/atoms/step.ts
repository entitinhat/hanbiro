import { atom } from 'recoil';
import { StepAddValue } from '@process/types/diagram';
import { STEP_TYPES } from '@process/config/constants';
import { StepType } from '@process/types/process';

export const stepOpenAtom = atom<StepAddValue>({
  key: 'stepOpenAtom',
  default: {
    edit: false,
    open: false,
    type: 'step',
    data: null,
    sourceId: '',
    directionId: '',
    direction: 'DIRECTION_NONE',
    sourceType: 'TYPE_ACTION',
    shape: 'SHAPE_NONE',
    position: {
      x: 0,
      y: 0
    }
  }
});

const stepTypeAtom = atom<StepType>({
  key: 'stepTypeAtom',
  default: STEP_TYPES[0]
});

export default stepTypeAtom;
