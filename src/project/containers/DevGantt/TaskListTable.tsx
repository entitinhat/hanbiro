import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { User } from '@base/types/user';
import { Task } from '@third-party/gantt-task-react';

import styles from './task-list-table.module.css';
import { AvatarGroup, Box } from '@mui/material';

const localeDateStringCache: any = {};
const toLocaleDateStringFactory = (locale: string) => (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
  const key = date.toString();
  let lds = localeDateStringCache[key];
  if (!lds) {
    // lds = date.toLocaleDateString(locale, dateTimeOptions);
    lds = dayjs(date).format('YYYY-MM-DD');
    localeDateStringCache[key] = lds;
  }
  return lds;
};
const dateTimeOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

export interface NewTask extends Task {
  assignTo?: User[];
}

export const TaskListTable: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: NewTask[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: NewTask) => void;
}> = ({ rowHeight, rowWidth, tasks, fontFamily, fontSize, locale, onExpanderClick }) => {
  const toLocaleDateString = useMemo(() => toLocaleDateStringFactory(locale), [locale]);

  return (
    <Box
      className={styles.taskListWrapper}
      sx={{
        // fontFamily: fontFamily,
        fontSize: fontSize
      }}
    >
      {tasks.map((t) => {
        let expanderSymbol = '';
        if (t.hideChildren === false) {
          expanderSymbol = '▼';
        } else if (t.hideChildren === true) {
          expanderSymbol = '▶';
        }

        return (
          <Box className={styles.taskListTableRow} sx={{ height: rowHeight }} key={`${t.id}row`}>
            <Box
              className={styles.taskListCell}
              sx={{
                minWidth: 155,
                maxWidth: 200
              }}
              title={t.name}
            >
              <Box className={styles.taskListNameWrapper}>
                <Box className={expanderSymbol ? styles.taskListExpander : styles.taskListEmptyExpander} onClick={() => onExpanderClick(t)}>
                  {expanderSymbol}
                </Box>
                <Box>{t.name}</Box>
              </Box>
            </Box>
            <Box
              className={styles.taskListCell}
              sx={{
                px: 1,
                minWidth: 100,
                maxWidth: 100
              }}
            >
              <AvatarGroup max={3}>
                {t.assignTo?.map((v) => {
                  return <HanAvatar key={v.id} size="xs" name={v.name} />;
                })}
              </AvatarGroup>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
