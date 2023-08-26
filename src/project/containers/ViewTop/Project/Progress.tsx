import LinearWithLabel from '@base/components/@extended/Progress/LinearWithLabel';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ProgressProps {}

function Progress({}: ProgressProps) {
  const { t } = useTranslation();
  return (
    <Stack spacing={1} sx={{ px: 2, py: 1, width: '50%' }} textAlign="right">
      <Stack>
        <Typography>{t('ncrm_project_estimated')}</Typography>
        <LinearWithLabel value={80} color="secondary" />
      </Stack>
      <Stack>
        <Typography>{t('ncrm_project_progress')}</Typography>
        <LinearWithLabel value={80} color="success" />
      </Stack>
    </Stack>
  );
}

export default Progress;
