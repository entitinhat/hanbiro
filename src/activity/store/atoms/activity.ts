import { atom } from 'recoil';

import { ACTIVITY_MENU_TASK } from '@activity/config/constants';
import { KanbanColumn } from '@base/types/kanban';
import { LabelValue } from '@base/types/app';

export const activityWriteOptionAtom = atom({
  key: 'activityWriteOptionAtom',
  default: {
    writePage: 'list', //or 'write'
    writeType: ACTIVITY_MENU_TASK,
    isOpenWrite: false,
    reloadList: () => null,
    process: 'new' //creating,success,error
  }
});

export const activityListQueryAtom = atom({
  key: 'activityListQueryAtom',
  default: ''
});

export const activityListGroupByAtom = atom({
  key: 'activityListGroupByAtom',
  default: 'all'
});

export const activityListDateByAtom = atom({
  key: 'activityListDateByAtom',
  default: {} as LabelValue
});

export const activityListFilterByAtom = atom({
  key: 'activityListFilterByAtom',
  default: [] as LabelValue[]
});

export const activityComparisonFilterState = atom({
  key: 'activityComparisonFilterState',
  default: {
    settingColumns: [],
    filter: {
      query: {} as any
    } as any
  }
});

export const kanbanColumnsAtom = atom<KanbanColumn[]>({
  key: 'kanbanColumnsAtom',
  default: [
    {
      id: 'overdue',
      title: 'ncrm_activity_overdue',
      itemIds: []
    },
    {
      id: 'today',
      title: 'ncrm_activity_today',
      itemIds: []
    },
    {
      id: 'thisweek',
      title: 'ncrm_activity_this_week',
      itemIds: []
    },
    {
      id: 'others',
      title: 'ncrm_activity_others',
      itemIds: []
    }
  ]
});

export const kanbanColumnsOrderAtom = atom<string[]>({
  key: 'kanbanColumnsOrderAtom',
  default: ['overdue', 'today', 'thisweek', 'others']
});
