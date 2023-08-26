import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import _ from 'lodash';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from '@base/components/@extended/IconButton';
import { User } from '@base/types/user';
import { etDatesFromDateRange } from '@base/utils/helpers/dateUtils';
import { parseTimestring } from '@base/utils/timeString';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import {
  Box,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { AssignRole } from '@project/types/project';
import { Task } from '@project/types/task';

dayjs.extend(isBetween);

interface TimeSheet {
  user: User;
  progress: number;
  duration: string;
  events: Record<string, Task[]>;
}

interface timeSheetUserProps {
  data: Task[];
  members: AssignRole[];
}

function TimeSheetUser(props: timeSheetUserProps) {
  const { data: items, members } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  const currentDate = new Date();
  const from = dayjs(currentDate).day(1).toDate();
  const to = dayjs(currentDate).day(5).toDate();

  // make header
  const dateHeader = etDatesFromDateRange(from, to);

  // members in this project
  const userTasks = useMemo(() => {
    const users = {} as Record<string, TimeSheet>;
    _.forEach(members, function (v) {
      _.forEach(v.fields, function (_v) {
        _.forEach(_v.assignTo, function (user) {
          if (!_.has(users, user.id)) {
            let events = {} as Record<string, Task[]>;
            for (let date = _.clone(from); date <= to; date.setDate(date.getDate() + 1)) {
              const cloned = dayjs(date);
              const keyDate = cloned.format('YYYY-MM-DD');
              events[keyDate] = [];
            }
            users[user.id] = {
              user: user,
              progress: 0,
              duration: '',
              events: events
            };
          }
        });
      });
    });

    _.forEach(items, function (v) {
      if (v.assignTo) {
        _.forEach(v.assignTo, function (_v) {
          for (let date = _.clone(from); date <= to; date.setDate(date.getDate() + 1)) {
            const cloned = dayjs(date);
            const keyDate = cloned.format('YYYY-MM-DD');
            if (cloned.isBetween(dayjs(v.startDate).subtract(1, 'day'), dayjs(v.dueDate).add(1, 'day'), 'day')) {
              users[_v.id].events[keyDate].push(v);
            }
          }
        });
      }
    });

    return users;
  }, [members, items, from, to]);

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {t('ncrm_project_dev_timesheet')}
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={1.5} sx={{ mt: 2, mb: 1 }}>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
          <IconButton size="small" color="secondary">
            <ArrowBackIosRounded sx={{ fontSize: 18 }} />
          </IconButton>
          <Typography variant="h5">02/01/2023 ~ 02/08/2023</Typography>
          <IconButton size="small" color="secondary">
            <ArrowForwardIosRounded sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
        <TableContainer component={Paper} sx={{ border: `1px solid ${theme.palette.divider}`, boxShadow: 'none' }}>
          <Table size="small">
            <TableHead sx={{ bgcolor: 'secondary', border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
              <TableRow>
                <TableCell
                  align="center"
                  component="th"
                  sx={{ borderRight: `1px solid ${theme.palette.divider}`, width: '10%', p: 0.5 }}
                ></TableCell>
                {dateHeader.map((v) => {
                  const date = dayjs(v);
                  return (
                    <TableCell
                      key={date.format('YYYY-MM-DD')}
                      align="center"
                      component="th"
                      sx={{ borderRight: `1px solid ${theme.palette.divider}`, width: '18%', p: 0.5 }}
                    >
                      {date.format('D')} {date.format('ddd')}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {_.map(userTasks, function (v, k) {
                return (
                  <TableRow
                    key={k}
                    sx={{
                      height: 80,
                      '&:hover': { bgcolor: 'transparent !important' },
                      '> .MuiTableCell-root:first-of-type': { p: 1 },
                      '> .MuiTableCell-root:last-of-type': { p: 1 }
                    }}
                  >
                    <TableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
                      <Typography color="secondary">{v.user.name}</Typography>
                    </TableCell>
                    {_.map(v.events, function (_v, _k) {
                      return (
                        <TableCell key={_k} align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                          <Stack spacing={0.5} sx={{ color: 'white' }}>
                            {_v.map((task) => {
                              return (
                                <Stack
                                  key={task.id}
                                  spacing={0.5}
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="space-between"
                                  sx={{ bgcolor: 'success.main', borderRadius: 1, px: 1, py: 0.5 }}
                                >
                                  <Typography noWrap>{task.name}</Typography>
                                  <Typography>
                                    {/* 
                                      TODO: 
                                      sum(done) time in time entries by user in each date
                                    */}
                                    {_.ceil(
                                      parseTimestring(task.estimatedTime, 'h', {
                                        hoursPerDay: 8,
                                        daysPerWeek: 5,
                                        weeksPerMonth: 4
                                      })
                                    )}
                                    h
                                  </Typography>
                                </Stack>
                              );
                            })}
                          </Stack>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default TimeSheetUser;
