import { Box, Button, Stack, Typography, useTheme } from '@mui/material';

import MainCard from '@base/components/App/MainCard';
import { headerHeight } from '@base/config/config';
import { Add, ArrowBackOutlined } from '@mui/icons-material';
import IconButton from '@base/components/@extended/IconButton';
import { useTranslation } from 'react-i18next';

interface Props {
  data?: any;
  onAdd?: () => void;
  onBack?: () => void;
}

const Header = (props: Props) => {
  const { data, onAdd, onBack } = props;

  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <MainCard
      border={false}
      content={false}
      sx={{
        position: 'relative',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 0,
        height: headerHeight,
        minHeight: headerHeight,
        bgcolor: theme.palette.mode == 'dark' ? theme.palette.background.paper : '#f4f6f8',
        borderBottom: `1px solid ${theme.palette.divider}`,
        mb: 2
      }}
    >
      <Box sx={{ display: 'flex', flex: 1, zIndex: 1 }}>
        <Stack direction="row" justifyContent="flex-start" alignItems="center" spacing={0.75} sx={{ flexGrow: 1, display: 'flex', px: 1 }}>
          {/* back */}
          <Stack direction="row" justifyContent="space-around" alignItems="center">
            <IconButton
              variant="outlined"
              size="small"
              sx={{
                // borderColor: theme.palette.divider,
                // '&:hover': {
                //   backgroundColor: theme.palette.secondary.lighter,
                //   borderColor: theme.palette.secondary.light
                // }
                border: 0,
                ml: 0
              }}
              onClick={onBack}
            >
              <ArrowBackOutlined />
            </IconButton>
          </Stack>

          {/* view title */}
          <Box>
            <Typography variant="subtitle1" color="textPrimary">
              {data?.name}
            </Typography>
          </Box>

          {/* right button */}
          <Stack sx={{ ml: 'auto !important' }} direction="row" justifyContent="space-around" alignItems="center" spacing={0.75}>
            <Button size={'small'} variant="contained" startIcon={<Add />} onClick={onAdd}>
              {t(`ncrm_common_btn_add`)}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </MainCard>
  );
};

export default Header;
