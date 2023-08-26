import {
  Box,
  Stack,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TimesheetProps {}

function Timesheet({}: TimesheetProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ px: 1, py: 0.5, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {t('ncrm_project_timesheet')}
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={1.5} sx={{ width: '100%', m: 0, p: 1 }}>
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle1">{t('ncrm_project_dev_task')}</Typography>
        </Box>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="textSecondary">{t('ncrm_project_dev_task_date')}</Typography>
          <Typography>2022-12-21 15:00</Typography>
        </Stack>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
          <Table size="small">
            <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
              <TableRow>
                <TableCell align="center" component="th" sx={{ width: '50%', p: 0.5 }}></TableCell>
                <TableCell align="center" component="th" sx={{ width: '15%', p: 0.5 }}>
                  {t('ncrm_project_no')}
                </TableCell>
                <TableCell align="center" component="th" sx={{ width: '35%', p: 0.5 }}>
                  {t('ncrm_project_time')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{t('ncrm_project_total')}</TableCell>
                <TableCell align="center">1</TableCell>
                <TableCell>1m 1w 1d 1h</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('ncrm_project_done')}</TableCell>
                <TableCell align="center">2</TableCell>
                <TableCell align="center">1m 1w 1d 1h</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>{t('ncrm_project_remaining')}</TableCell>
                <TableCell align="center">3</TableCell>
                <TableCell align="center">1m 1w 1d 1h</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle1">{t('ncrm_project_cost')}</Typography>
        </Box>
        <Divider />
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
          <Table size="small">
            <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
              <TableRow>
                <TableCell align="center" component="th" sx={{ width: '50%', p: 0.5 }}>
                  {t('ncrm_project_total_time')}
                </TableCell>
                <TableCell align="center" component="th" sx={{ p: 0.5 }}>
                  {t('ncrm_project_total_cost')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">1m 1w 1d 1h</TableCell>
                <TableCell align="center">$100,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default Timesheet;
