import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useMemo } from 'react';

import { etDatesFromDateRange } from '@base/utils/helpers/dateUtils';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { Task } from '@project/types/task';
import _ from 'lodash';

dayjs.extend(isBetween);

interface TimeSheet {
  progress: number;
  duration: string;
  task: Task;
  events: Record<string, number>;
}

interface devTaskTimesheetProps {
  data: Task[];
}

function DevTaskTimesheet(props: devTaskTimesheetProps) {
  const theme = useTheme();
  const { data: items } = props;

  const currentDate = new Date();
  const from = dayjs(currentDate).day(1).toDate();
  const to = dayjs(currentDate).day(5).toDate();

  // make header
  const dateHeader = etDatesFromDateRange(from, to);

  const tasks = useMemo(() => {
    const tasks = {} as Record<string, TimeSheet>;
    _.forEach(items, function (v) {
      if (!_.has(tasks, v.id)) {
        tasks[v.id] = {
          progress: 0,
          duration: '',
          task: v,
          events: {} as Record<string, number>
        };
      }
      for (let date = _.clone(from); date <= to; date.setDate(date.getDate() + 1)) {
        const cloned = dayjs(date);
        const keyDate = cloned.format('YYYY-MM-DD');
        tasks[v.id].events[keyDate] = 0;
        if (cloned.isBetween(dayjs(v.startDate).subtract(1, 'day'), dayjs(v.dueDate).add(1, 'day'), 'day')) {
          /* 
            TODO: 
            sum(done) time in time entries by user in each date
            */
          tasks[v.id].events[keyDate] = 5; // sum timeentries
        }
      }
    });

    return tasks;
  }, [items, from, to]);

  return (
    <Stack spacing={1.5} sx={{ p: 1 }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">December 22 Week 52</Typography>
        <Stack spacing={2} direction="row" alignItems="center" justifyContent="space-between">
          <Button size="small" color="secondary" startIcon={<ArrowBackIosRounded />}>
            Prev
          </Button>
          <Typography>Today</Typography>
          <Button size="small" color="secondary" endIcon={<ArrowForwardIosRounded />}>
            Next
          </Button>
        </Stack>
        <Box></Box>
      </Stack>
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: 'transparent', border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ borderRight: `1px solid ${theme.palette.divider}`, width: '35%', p: 0.5 }}>
                Task Name
              </TableCell>
              {dateHeader.map((v) => {
                const date = dayjs(v);
                return (
                  <TableCell
                    key={date.format('YYYY-MM-DD')}
                    align="center"
                    component="th"
                    sx={{ borderRight: `1px solid ${theme.palette.divider}`, width: '10%', p: 0.5 }}
                  >
                    {date.format('D')} {date.format('ddd')}
                  </TableCell>
                );
              })}
              <TableCell align="center" component="th" sx={{ width: '10%', p: 0.5 }}>
                Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.map(tasks, function (v, k) {
              return (
                <TableRow
                  key={k}
                  sx={{
                    '&:hover': { bgcolor: 'transparent !important' },
                    '> .MuiTableCell-root:first-of-type': { p: 1 },
                    '> .MuiTableCell-root:last-of-type': { p: 1 }
                  }}
                >
                  <TableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
                    <Typography color="secondary">{v.task.name}</Typography>
                  </TableCell>
                  {_.map(v.events, function (_v, _k) {
                    return (
                      <TableCell key={_k} align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
                        {_v}h
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">0h</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter sx={{ border: 'none', borderTop: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell>
                <Typography color="primary">Total</Typography>
              </TableCell>
              <TableCell align="center">2h</TableCell>
              <TableCell align="center">0h</TableCell>
              <TableCell align="center">2h</TableCell>
              <TableCell align="center">0h</TableCell>
              <TableCell align="center">2h</TableCell>
              <TableCell align="center">0h</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default DevTaskTimesheet;
