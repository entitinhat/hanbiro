import { Typography, Button, Stack, useTheme, Box } from '@mui/material';
import React from 'react';

const TextFieldInvoices = () => {
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  return (
    <Stack direction="column" spacing={2} borderBottom={border} p={2}>
      <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
        <Typography>Your Next Payment of</Typography>
        <Typography fontWeight={500}> $5,000 </Typography>
        <Typography>is due on </Typography>
        <Typography color={theme.palette.primary.main}>Feb 26, 2020</Typography>.
      </Stack>
      <Stack direction={'row'} spacing={0.5} alignItems={'center'}>
        <Typography>Current Balance</Typography>
        <Typography fontWeight={500} color={theme.palette.error.main}>
          {' '}
          $5,000{' '}
        </Typography>
        <Button size="small" variant="outlined" color="secondary">
          View
        </Button>
      </Stack>
    </Stack>
  );
};
export default TextFieldInvoices;
