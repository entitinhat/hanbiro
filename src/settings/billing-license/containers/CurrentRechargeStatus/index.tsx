import React from 'react';
import { Box, Typography, Stack, Checkbox, FormGroup, FormControlLabel, Button, Grid, Paper, useTheme } from '@mui/material';
import { IdName } from '@base/types/common';

const dummyData = [
  { id: '1', name: 'Sending Mail (Free: 100/month)' },
  { id: '2', name: 'Bulk Email' },
  { id: '3', name: 'SMS' },
  { id: '4', name: 'Digital Tax Invoice' },
  { id: '5', name: 'Virtual Billing Account' }
];

const CurrentRechargeStatus = () => {
  const checkboxLabel = dummyData;

  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;

  return (
    <Box border={border}>
      <Box borderBottom={border} p={2}>
        <Typography fontWeight={500}>Current Recharge Status</Typography>
      </Box>
      <Box borderBottom={border} p={2}>
        <Typography>Allow to use Services:</Typography>
        <Stack direction="row" spacing={2}>
          {checkboxLabel.map((checkbox: IdName, index: any) => {
            return (
              <FormGroup key={index}>
                <FormControlLabel control={<Checkbox defaultChecked={index == 0 ? true : false} />} label={checkbox.name} />
              </FormGroup>
            );
          })}
        </Stack>
      </Box>
      <Box p={2}>
        <Stack direction="row" sx={{ width: '100%', justifyContent: 'space-between' }}>
          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Typography>The Balance Left</Typography>
            <Typography color={theme.palette.error.main}>￦0</Typography>
          </Stack>
          <Stack direction={'row'} alignItems="center" spacing={1}>
            <Typography>Recharging</Typography>
            <Button size="small" variant="outlined" color="secondary">
              View History
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
export default CurrentRechargeStatus;
