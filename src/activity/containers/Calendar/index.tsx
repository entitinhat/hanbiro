import { Allotment } from 'allotment';
import dayjs from 'dayjs';
import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import {
  ACTIVITY_DIRECTION_IN,
  ACTIVITY_MENU_KEYS,
  ACTIVITY_TYPE_CALL,
  ACTIVITY_TYPE_MAIL,
  ACTIVITY_TYPE_SMS,
  ACTIVITY_TYPE_TASK
} from '@activity/config/constants';
import {
  KEY_NAME_ACTIVITY_CREATED_AT,
  KEY_NAME_ACTIVITY_DUE_DATE,
  KEY_NAME_ACTIVITY_FROM,
  KEY_NAME_ACTIVITY_START_TIME,
  KEY_NAME_ACTIVITY_TO
} from '@activity/config/keyNames';
import { priorityConfigs } from '@activity/config/list-field/column';
import { useActivityList } from '@activity/hooks/useActivityList';
import { getQuery } from '@activity/pages/ListPage/Helper';
import { activityListQueryAtom } from '@activity/store/atoms/activity';
import { ActivityType } from '@activity/types/type';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { LIST_STALE_TIME } from '@base/config/constant';
import { MENU_ACTIVITY } from '@base/config/menus';
import BaseCalendar from '@base/containers/Calendar';
import { pageDataByMenuAtom } from '@base/store/atoms';
import { convertDateTimeServerToClient } from '@base/utils/helpers';
import { replaceItemAtIndex } from '@base/utils/helpers/arrayUtils';
import LocalStorages from '@base/utils/storages/ls';
import { EventInput } from '@fullcalendar/common';
import { CloseOutlined } from '@mui/icons-material';
import { Box, Button, Chip, ClickAwayListener, Divider, Grid, IconButton, Stack, Typography, useTheme } from '@mui/material';

import Category from './Category';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface CategoryItem {
  id: ActivityType;
  key: string;
  title: string;
  color: string;
  checked: boolean;
}

export type calendarProps = {
  category: string;
};

function Calendar(props: calendarProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { category } = props;
  const listQuerySchema = useRecoilValue(activityListQueryAtom);
  const [currentDate, setCurrentDate] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [schedules, setSchedules] = useState<EventInput[]>([]);
  const pageDataKey = `${MENU_ACTIVITY}_${category}`;
  const pageData = useRecoilValue(pageDataByMenuAtom(pageDataKey));
  let { filter } = pageData;

  const categories: CategoryItem[] = [
    {
      id: 'TYPE_CALL',
      key: 'call',
      title: 'ncrm_activity_scheduled_calls',
      color: theme.palette.purple?.[400] || '',
      checked: true
    },
    {
      id: 'TYPE_TASK',
      key: 'task',
      title: 'ncrm_activity_scheduled_tasks',
      color: theme.palette.primary?.[400] || '',
      checked: true
    },
    {
      id: 'TYPE_TICKET',
      key: 'ticket',
      title: theme.palette.success?.[400] || '',
      color: '#4caf50',
      checked: true
    }
  ];

  const Ls = new LocalStorages();
  const activityColor = JSON.parse(Ls.get('activity_color') as string) as Record<string, string>;
  const newItems = useMemo(() => {
    return categories.map((item) => {
      if (_.has(activityColor, item.key)) {
        item.color = activityColor[item.key];
      }
      return item;
    });
  }, []);
  const [categoryItems, setCategoryItems] = useState<CategoryItem[]>(newItems);

  filter = {
    ...filter,
    headerFilters: {
      ...filter?.headerFilters,
      [KEY_NAME_ACTIVITY_CREATED_AT]: [
        dayjs(currentDate).startOf('month').subtract(15, 'day').toISOString(),
        dayjs(currentDate).endOf('month').add(15, 'day').toISOString()
      ]
    }
  };

  const { results } = useActivityList(
    listQuerySchema,
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
        let newActivityColor = {} as Record<string, string>;
        if (activityColor) {
          newActivityColor = _.clone(activityColor);
        }
        newActivityColor[id] = c;
        Ls.set('activity_color', JSON.stringify(newActivityColor));
      }
      setCategoryItems(replaceItemAtIndex(categoryItems, findIndex, findData));
    },
    [activityColor, categoryItems]
  );

  useEffect(() => {
    if (results.data.length == 0) return;

    const calendar: EventInput[] = [];
    for (const event of results.data) {
      const category = categoryItems.find((v) => v.id == event.type)!!;
      if (!category?.checked) continue;

      const schedule = {
        title: event.subject,
        id: event.id,
        start: event.startTime,
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

  const handleEventChange = (event: EventInput) => {
    const type = ACTIVITY_MENU_KEYS[event.type];
    navigate(`/activity/${category}/${type}/${event.id}`);
  };

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
        <BaseCalendar onEventChange={handleEventChange} events={schedules} setCurrentDate={setCurrentDate} currentDate={currentDate} />
      </Grid>
    </Grid>
  );
}

export default Calendar;
