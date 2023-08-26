import { Chip, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import Chart from '@project/containers/Chart';
import { useTranslation } from 'react-i18next';

interface TaskListProps {}

function TaskList({}: TaskListProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Stack spacing={1.5} sx={{ p: 1 }}>
      <Chart />
      <Stack spacing={0} direction="row" alignItems="center" sx={{ mt: '16px !important' }}>
        <Chip size="small" variant="outlined" color="warning" label={t('options_items__status_todo') as string} />
      </Stack>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '30%', p: 0.5 }}>
                {t('ncrm_project_assigned_rep')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '40%', p: 0.5 }}>
                {t('ncrm_project_task_name')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '30%', p: 0.5 }}>
                {t('ncrm_project_date')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>SGPark (Manager)</TableCell>
              <TableCell>
                <Typography color="primary">Improve API</Typography>
              </TableCell>
              <TableCell>2022-12-20 13:21</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Thien (Staff)</TableCell>
              <TableCell>
                <Typography color="primary">Improve API</Typography>
              </TableCell>
              <TableCell>2022-12-20 13:21</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={0} direction="row" alignItems="center" sx={{ mt: '16px !important' }}>
        <Chip size="small" variant="outlined" color="info" label={t('options_items__status_doing') as string} />
      </Stack>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '30%', p: 0.5 }}>
                {t('ncrm_project_assigned_rep')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '40%', p: 0.5 }}>
                {t('ncrm_project_task_name')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '30%', p: 0.5 }}>
                {t('ncrm_project_date')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>SGPark (Manager)</TableCell>
              <TableCell>
                <Typography color="primary">Improve API</Typography>
              </TableCell>
              <TableCell>2022-12-20 13:21</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Thien (Staff)</TableCell>
              <TableCell>
                <Typography color="primary">Improve API</Typography>
              </TableCell>
              <TableCell>2022-12-20 13:21</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={0} direction="row" alignItems="center" sx={{ mt: '16px !important' }}>
        <Chip size="small" variant="outlined" color="success" label={t('options_items__status_done' as string)} />
      </Stack>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
        <Table size="small">
          <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
            <TableRow>
              <TableCell align="center" component="th" sx={{ width: '30%', p: 0.5 }}>
                {t('ncrm_project_assigned_rep')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '40%', p: 0.5 }}>
                {t('ncrm_project_task_name')}
              </TableCell>
              <TableCell align="center" component="th" sx={{ width: '30%', p: 0.5 }}>
                {t('ncrm_project_date')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>SGPark (Manager)</TableCell>
              <TableCell>
                <Typography color="primary">Improve API</Typography>
              </TableCell>
              <TableCell>2022-12-20 13:21</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Thien (Staff)</TableCell>
              <TableCell>
                <Typography color="primary">Improve API</Typography>
              </TableCell>
              <TableCell>2022-12-20 13:21</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}

export default TaskList;
