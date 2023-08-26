import { Box, Grid, Stack } from '@mui/material';
import DigitalTaxInvoiceUsage from '@settings/billing-license/containers/DigitalTaxInvoiceUsage';
import FaxUsage from '@settings/billing-license/containers/FaxUsage';
import MailSendingUsage from '@settings/billing-license/containers/MailSendingUsage';
import SMSUsage from '@settings/billing-license/containers/SmsUsage';
import TransactionHistory from '@settings/billing-license/containers/TransactionHistory';
import VirtualBillingAccuntUsage from '@settings/billing-license/containers/VirtualBillingAccountUsage';
import React from 'react';

const containStyle = {
  height: 'calc(100vh - 174px)'
};

const History = () => {
  return (
    <Box sx={containStyle} className="scroll-box" p={2}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <TransactionHistory />
            <SMSUsage />
            <MailSendingUsage />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <FaxUsage />
            <VirtualBillingAccuntUsage />
            <DigitalTaxInvoiceUsage />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
export default History;
