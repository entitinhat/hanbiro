import { atom } from 'recoil';
import { KanbanColumn } from './Interface';

export const kanbanColumnsAtom = atom<KanbanColumn[]>({
  key: 'kanbanColumnsAtom',
  default: []
});

export const kanbanColumnsOrderAtom = atom<string[]>({
  key: 'kanbanColumnsOrderAtom',
  default: []
});

export const kanbanItemsAtom = atom<any[]>({
  key: 'kanbanItemsAtom',
  default: []
});
