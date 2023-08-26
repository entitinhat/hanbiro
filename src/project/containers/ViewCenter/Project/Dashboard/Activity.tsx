import { Box, Chip, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ActivityProps {}

function Activity({}: ActivityProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ px: 1, py: 0.5, mb: 1, borderRadius: 1, border: '1px solid', borderColor: theme.palette.divider }}>
      <Stack spacing={1} direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
        <Typography variant="subtitle1" color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {t('ncrm_project_activities')}
        </Typography>
      </Stack>
      <Divider />
      <Stack spacing={1.5} sx={{ p: 1 }}>
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="primary">{t('ncrm_project_send_quote_to_customer')}</Typography>
            <Chip size="small" variant="combined" color="info" label={t('options_items__status_todo')} />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Phoung Dofu</Typography>
            <Typography color="textSecondary">2022-12-20 12:30</Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="primary">{t('ncrm_project_discuss_about_service')}</Typography>
            <Chip size="small" variant="combined" color="error" label={t('ncrm_project_activities')} />
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Phoung Dofu</Typography>
            <Typography color="textSecondary">2022-12-20 12:30</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Activity;
