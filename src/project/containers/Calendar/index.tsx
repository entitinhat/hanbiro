import { Allotment } from 'allotment';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { MENU_PROJECT } from '@base/config/menus';
import BaseCalendar from '@base/containers/Calendar';
import { pageDataByMenuAtom } from '@base/store/atoms';
import { replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import LocalStorages from '@base/utils/storages/ls';
import { EventInput } from '@fullcalendar/common';
import { Grid, useTheme } from '@mui/material';

import Category from './Category';
import { useTaskList } from '../../hooks/useTask';
import { KEY_NAME_TASK_CREATED_AT } from '../../config/keyNames';
import { getQuery } from '../../pages/ListPage/Task/Helper';

export interface CategoryItem {
  id: string;
  key: string;
  title: string;
  color: string;
  checked: boolean;
}

const categories: CategoryItem[] = [
  {
    id: 'TYPE_TASK',
    key: 'task',
    title: 'Scheduled Tasks',
    color: '#42a5f5',
    checked: true
  },
  {
    id: 'TYPE_CALL',
    key: 'call',
    title: 'Scheduled Calls',
    color: '#ba68c8',
    checked: true
  },
  {
    id: 'TYPE_MAIL',
    key: 'mail',
    title: 'Scheduled Emails',
    color: '#ef5350',
    checked: true
  },
  {
    id: 'TYPE_SMS',
    key: 'sms',
    title: 'Scheduled SMS',
    color: '#4caf50',
    checked: true
  }
];

export type calendarProps = {
  category: string;
};

function Calendar(props: calendarProps) {
  const theme = useTheme();
  const { category } = props;
  const [currentDate, setCurrentDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [schedules, setSchedules] = useState<EventInput[]>([]);
  const pageDataKey = `${MENU_PROJECT}_${category}`;
  const pageData = useRecoilValue(pageDataByMenuAtom(pageDataKey));
  let { filter } = pageData;

  const Ls = new LocalStorages();
  const taskColor = JSON.parse(Ls.get('devtask_color') as string) as Record<string, string>;
  const newItems = useMemo(() => {
    return categories.map((item) => {
      if (_.has(taskColor, item.key)) {
        item.color = taskColor[item.key];
      }
      return item;
    });
  }, []);
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>(newItems);

  filter = {
    ...filter,
    headerFilters: {
      ...filter?.headerFilters,
      [KEY_NAME_TASK_CREATED_AT]: [
        dayjs(currentDate).startOf('month').subtract(15, 'day').toISOString(),
        dayjs(currentDate).endOf('month').add(15, 'day').toISOString()
      ]
    }
  };

  const { results } = useTaskList(
    '',
    {
      filter: {
        keyword: filter?.keyword ?? '',
        sort: filter?.sort,
        paging: {
          page: 1,
          size: 2000
        },
        query: getQuery(filter)
      }
    },
    {
      keepPreviousData: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchInterval: 60000 // 60 seconds
      // staleTime: LIST_STALE_TIME
    }
  );

  const onChangeCategory = useCallback(
    (id: string, c: string | boolean) => {
      const findIndex = categoryItems.findIndex((_v) => _v.id == id);
      let findData = categoryItems[findIndex];
      if (typeof c == 'boolean') {
        findData = { ...findData, checked: c };
      } else {
        findData = { ...findData, color: c };
        let newTaskColor = {} as Record<string, string>;
        if (taskColor) {
          newTaskColor = _.clone(taskColor);
        }
        newTaskColor[id] = c;
        Ls.set('devtask_color', JSON.stringify(newTaskColor));
      }
      setCategoryItems(replaceItemAtIndex(categoryItems, findIndex, findData));
    },
    [taskColor, categoryItems]
  );

  useEffect(() => {
    if (results.data.length == 0) return;

    const calendar: EventInput[] = [];
    for (const event of results.data) {
      const category = categoryItems.find((v) => v.id == event.status)!!;
      if (!category.checked) continue;

      const schedule = {
        title: event.name,
        id: event.id,
        start: event.startDate,
        end: event.dueDate,
        editable: false,
        color: category.color,
        textColor: theme.palette.common.white,
        extendedProps: event
      };
      calendar.push(schedule);
    }
    setSchedules(calendar);
  }, [results, categoryItems]);

  return (
    <Grid container>
      <Grid item xs="auto">
        <Category
          setCurrentDate={setCurrentDate}
          currentDate={currentDate}
          categoryItems={categoryItems}
          onChangeCategory={onChangeCategory}
        />
      </Grid>
      <Grid item xs>
        <BaseCalendar events={schedules} setCurrentDate={setCurrentDate} currentDate={currentDate} />
      </Grid>
    </Grid>
  );
}

export default Calendar;
