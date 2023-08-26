import { Box, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  title: string;
}

const Header = (props: HeaderProps) => {
  const { title } = props;

  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: 40,
        p: 2,
        bgcolor: theme.palette.common.white,
        borderBottom: `1px solid ${theme.palette.divider}`
      }}
    >
      <Stack direction="row" spacing={10} alignItems="center">
        <Typography variant="h4">{t(title)}</Typography>
      </Stack>
    </Box>
  );
};

export default Header;
