// material-ui
import { Typography, Stack, CardMedia, useTheme } from '@mui/material';

// assets
import UploadCover from '@base/assets/images/upload/upload.svg';
import { CloudUploadOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

// ==============================|| UPLOAD - PLACEHOLDER ||============================== //

interface PlaceholderProps {
  simple?: boolean;
}
export default function PlaceholderContent(props: PlaceholderProps) {
  const { simple = false } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <>
      {simple && (
        <Stack alignItems="center" justifyContent="center" direction="row" sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <CloudUploadOutlined color="secondary" />
          <Typography variant="h6" color="textSecondary" sx={{ marginLeft: '5px' }}>
            {t('ncrm_common_drag_drop_or_select_file')}
          </Typography>
        </Stack>
      )}
      {!simple && (
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
        >
          <CardMedia component="img" image={UploadCover} sx={{ width: 150 }} />
          <Stack sx={{ p: 3 }} spacing={1}>
            <Typography variant="h5">{t('ncrm_common_drag_drop_or_select_file')}</Typography>

            <Typography color="secondary">
              {`${t('ncrm_common_drop_files_here_or_click')} `}
              <Typography component="span" color="primary" sx={{ textDecoration: 'underline' }}>
                {t('ncrm_common_browse')}
              </Typography>
              {` ${t('ncrm_common_through_your_machine')}`}
            </Typography>
          </Stack>
        </Stack>
      )}
    </>
  );
}
