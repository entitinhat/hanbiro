import { Button, Divider, Stack, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface SidebarFooterProps {
  onSubmit: () => void;
  onClose?: () => void;
  isLoading: boolean;
  isValid: boolean;
}

const SidebarFooter = (props: SidebarFooterProps) => {
  const { onSubmit, onClose, isLoading, isValid } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    // <Stack spacing={0} sx={{ bgcolor: theme.palette.background.paper, width: '100%', position: 'absolute', bottom: 0, left: 0, right: 0 }}>
    <Stack spacing={0} sx={{ bgcolor: theme.palette.background.paper, width: '100%' }}>
      <Divider />
      <Stack direction="row" spacing={2} alignItems="center" justifyContent={onClose ? 'space-between' : 'flex-end'} sx={{ px: 2, py: 1 }}>
        {onClose && (
          <Button size="small" variant="contained" color="secondary" onClick={onClose}>
            {t('ncrm_common_btn_close')}
          </Button>
        )}
        <Button size="small" variant="contained" color="success" onClick={onSubmit} disabled={isLoading || !isValid}>
          {t('ncrm_common_btn_save')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default SidebarFooter;
