import { useTranslation } from 'react-i18next';

import IconButton from '@base/components/@extended/IconButton';
import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material';
import {
    Box, Button, Divider, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter,
    TableHead, TableRow, Typography, useTheme
} from '@mui/material';
import { AssignRole } from '@project/types/project';
import { Task, TaskType } from '@project/types/task';
import dayjs from 'dayjs';

interface Event {
  date: Date;
  tasks: Task[];
}

interface TimeSheet {
  user: string;
  progress: number;
  duration: string;
  events: Event[];
}

interface timeSheetDashboardProps {
  data: Task[];
}

function TimeSheetDashboard(props: timeSheetDashboardProps) {
  const { data: items } = props;
  const theme = useTheme();
  const { t } = useTranslation();

  // make header
  console.log('monday', dayjs().day(1).toDate())
  console.log('friday', dayjs().day(5).toDate())
  

  // members in this project

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {t('ncrm_project_total_timesheet')}
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
                <TableCell align="center" component="th" sx={{ borderRight: `1px solid ${theme.palette.divider}`, width: '18%', p: 0.5 }}>
                  26 Mon
                </TableCell>
                <TableCell align="center" component="th" sx={{ borderRight: `1px solid ${theme.palette.divider}`, width: '18%', p: 0.5 }}>
                  27 Tue
                </TableCell>
                <TableCell align="center" component="th" sx={{ borderRight: `1px solid ${theme.palette.divider}`, width: '18%', p: 0.5 }}>
                  28 Wed
                </TableCell>
                <TableCell align="center" component="th" sx={{ borderRight: `1px solid ${theme.palette.divider}`, width: '18%', p: 0.5 }}>
                  29 Thu
                </TableCell>
                <TableCell align="center" component="th" sx={{ width: '18%', p: 0.5 }}>
                  30 Fri
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  height: 80,
                  '&:hover': { bgcolor: 'transparent !important' },
                  '> .MuiTableCell-root:first-of-type': { p: 1 },
                  '> .MuiTableCell-root:last-of-type': { p: 1 }
                }}
              >
                <TableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
                  <Typography color="secondary">Planning</Typography>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  height: 80,
                  '&:hover': { bgcolor: 'transparent !important' },
                  '> .MuiTableCell-root:first-of-type': { p: 1 },
                  '> .MuiTableCell-root:last-of-type': { p: 1 }
                }}
              >
                <TableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
                  <Typography color="secondary">Development</Typography>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
              </TableRow>
              <TableRow
                sx={{
                  height: 80,
                  '&:hover': { bgcolor: 'transparent !important' },
                  '> .MuiTableCell-root:first-of-type': { p: 1 },
                  '> .MuiTableCell-root:last-of-type': { p: 1 }
                }}
              >
                <TableCell sx={{ borderRight: `1px solid ${theme.palette.divider}` }}>
                  <Typography color="secondary">QA</Typography>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ borderRight: `1px solid ${theme.palette.divider}`, verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="center" sx={{ verticalAlign: 'top' }}>
                  <Stack spacing={0.5} sx={{ color: 'white' }}>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'success.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>A task</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                    <Stack
                      spacing={0.5}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      sx={{ bgcolor: 'primary.main', borderRadius: 1, p: 0.5 }}
                    >
                      <Typography noWrap>B task2</Typography>
                      <Typography>(3h)</Typography>
                    </Stack>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default TimeSheetDashboard;
