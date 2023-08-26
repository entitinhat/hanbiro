import { TaskGroupTemplateOpen, TaskTemplate, TaskTemplateOpen } from '@project/types/template';
import { atom } from 'recoil';

export const taskTemplateOpenAtom = atom<TaskTemplateOpen>({
  key: 'taskTemplateOpenAtom',
  default: {
    open: false
  }
});

export const taskGroupTemplateOpenAtom = atom<TaskGroupTemplateOpen>({
  key: 'taskGroupTemplateOpenAtom',
  default: {
    open: false
  }
});

export const taskTemplateAtom = atom<TaskTemplate | null>({
  key: 'taskTemplateAtom',
  default: null
});
