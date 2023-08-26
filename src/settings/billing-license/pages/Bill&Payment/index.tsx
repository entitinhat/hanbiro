import React from 'react';
import { Box, Grid, Stack } from '@mui/material';
import BillingPlan from '@settings/billing-license/containers/BillingPlan';
import PaymentSchedulePerAItemPurchased from '@settings/billing-license/containers/PaymentSchedule';
import Invoices from '@settings/billing-license/containers/Invoices';

const containStyle = {
  height: 'calc(100vh - 174px)'
};
const BillPayment = () => {
  return (
    // <>
    //     <BillingPlan />
    // </>
    <Box className="scroll-box" p={2} sx={{ flexGrow: 1, paddingTop: 2, ...containStyle }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack spacing={2}>
            <BillingPlan />
            <PaymentSchedulePerAItemPurchased />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Invoices />
        </Grid>
      </Grid>
    </Box>
  );
};
export default BillPayment;
