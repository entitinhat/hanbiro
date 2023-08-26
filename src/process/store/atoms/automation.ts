import { atom } from 'recoil';
import { AutomationOpen } from '@process/types/automation';

export const automationOpenAtom = atom<AutomationOpen>({
  key: 'automationOpenAtom',
  default: {
    open: false
  }
});
