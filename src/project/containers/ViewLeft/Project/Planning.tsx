import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { Stack } from '@mui/system';
import { useTranslation } from 'react-i18next';

interface PlanningProps {}

function Planning({}: PlanningProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {t('ncrm_project_planning')}
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={1.5} sx={{ width: '100%', m: 0, p: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography color="textSecondary">{t('ncrm_project_project_start_date')}</Typography>
          <Typography>2022-12-21 15:00</Typography>
        </Stack>
        <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
          <Table size="small">
            <TableHead sx={{ border: 'none', borderBottom: `1px solid ${theme.palette.divider}` }}>
              <TableRow>
                <TableCell align="center" component="th" sx={{ width: '50%', p: 0.5 }}>
                  {t('ncrm_project_project_start_date')}
                </TableCell>
                <TableCell align="center" component="th" sx={{ p: 0.5 }}>
                  {t('ncrm_project_project_description')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Plan A</TableCell>
                <TableCell>Plan A Description</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Box>
  );
}

export default Planning;
