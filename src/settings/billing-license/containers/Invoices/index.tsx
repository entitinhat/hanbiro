import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material';
import InvoiceIssued from '@settings/billing-license/components/InvoiceIssuedTable';
import OrderDetailTable from '@settings/billing-license/components/InvoicesOrderDetailTable';
import TextFieldInvoices from '@settings/billing-license/components/TextFieldInvoices';

const Invoices = () => {
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;

  return (
    <Box border={border}>
      <Box sx={{ borderBottom: border }} p={2}>
        <Typography fontWeight={500}>Invoices</Typography>
      </Box>
      <Box borderBottom={border}>
        <TextFieldInvoices />
        <OrderDetailTable />
        <Stack direction="column" spacing={2} sx={{ justifyContent: 'right', borderBottom: border }} p={2}>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'right' }}>
            <Box sx={{ width: '30%' }}>
              <Typography>Sub-Total</Typography>
              <Stack direction={'row'} alignItems={'center'} justifyContent="space-between">
                <Typography>Sub-Total</Typography>
                <Typography>-5,000</Typography>
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent="space-between">
                <Typography>Tax</Typography>
              </Stack>
              <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
            </Box>
          </Box>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'flex-end'} spacing={1}>
            <Button size="small" variant="outlined">
              Request Virtual Billing Account
            </Button>
            <Button size="small" variant="contained">
              Make Payment
            </Button>
          </Stack>
        </Stack>
        <InvoiceIssued />
      </Box>

      <Box p={2}>
        <Typography sx={{ fontWeight: 'bold' }}>Total Revenue: </Typography>
      </Box>
    </Box>
  );
};
export default Invoices;
