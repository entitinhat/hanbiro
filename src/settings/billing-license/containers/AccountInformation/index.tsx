// import MUI components
import { styled } from '@mui/material/styles';
import { InputLabel, TextField, Typography, useTheme, Stack } from '@mui/material';

// import components custom
import SpanLang from '@base/components/@hanbiro/SpanLang';
import DragDropFiles from '@settings/billing-license/components/DragDropFiles';
import YourLogo from '@settings/billing-license/components/YourLogo';

const AccountInformation = () => {
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  return (
    <Stack p={2} border={border}>
      <Stack spacing={1}>
        <InputLabel sx={{ display: 'flex', alignItems: 'center', color: theme.palette.secondary.main, overflow: 'visible' }}>
          <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang={'Account Holder Name'} />
        </InputLabel>
        <TextField fullWidth />
      </Stack>

      <YourLogo />
    </Stack>
  );
};

export default AccountInformation;
