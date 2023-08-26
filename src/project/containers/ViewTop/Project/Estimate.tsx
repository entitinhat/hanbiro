import { AccessAlarm } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface EstimateProps {}

function Estimate({}: EstimateProps) {
  const { t } = useTranslation();
  return (
    <Stack spacing={1} sx={{ px: 2, py: 1, width: '50%' }} textAlign="right">
      <Typography>{t('ncrm_project_estimate_revenue')}</Typography>
      <Typography variant="h5" sx={{ color: 'warning.main' }}>
        $500,000
      </Typography>
      <Typography>{t('ncrm_project_estimate_closed_date')}</Typography>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="flex-end">
        <Typography variant="h5" color="error">
          2022-12-21
        </Typography>
        <AccessAlarm sx={{ color: 'error.main', fontSize: 16 }} />
      </Stack>
    </Stack>
  );
}

export default Estimate;
