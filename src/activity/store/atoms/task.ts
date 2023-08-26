import { atom } from 'recoil';
import { TaskChecklist, TaskSequence } from '@activity/types/task';

export const checklistAtom = atom<TaskChecklist[]>({
  key: 'checklistAtom',
  default: []
});

export const sequenceAtom = atom<TaskSequence[]>({
  key: 'sequenceAtom',
  default: []
});
