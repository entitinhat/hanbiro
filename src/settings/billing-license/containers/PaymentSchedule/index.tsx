import React, { useState } from 'react';

import { Typography, useTheme, Button, IconButton, Box, Stack } from '@mui/material';
import { FormIcon } from '@base/components/@hanbiro/FormIcon';
import PaymentSheduleShortTable from '@settings/billing-license/components/PaymentScheduleTable/PaymentScheduleShortTable';
import PaymentScheduleFullTable from '@settings/billing-license/components/PaymentScheduleTable/PaymentScheduleFullTable';

const paymentSchedulePerAItemPurchased = {
  shortTable: [{ id: 1, item: 'CRM Add a user', startOn: '5/4/2020', endOn: '5/4/2021' }],
  tableHeader: [
    { id: 1, name: 'Item' },
    { id: 2, name: 'Purchased on' },
    { id: 3, name: 'Billing Date' },
    { id: 4, name: 'Start on' },
    { id: 5, name: 'End on' },
    { id: 6, name: 'Amount' }
  ],
  tableBody: [
    {
      id: 1,
      item: 'CRM Add a user',
      purchasedOn: '3/20/2023',
      billingDate: '5/4/2020',
      startOn: '5/4/2020',
      endOn: '5/4/2021',
      amount: '10'
    },
    {
      id: 2,
      item: 'CRM 10 users',
      purchasedOn: '3/20/2023',
      billingDate: '7/4/2021',
      startOn: '7/4/2021',
      endOn: '7/4/2022',
      amount: '10'
    }
  ]
};

const PaymentSchedulePerAItemPurchased = () => {
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  const [viewType, setViewType] = useState(1);
  const billPaymentData = {
    shortTable: {
      tableBody: paymentSchedulePerAItemPurchased.shortTable
    },
    fullTable: {
      tableHeader: paymentSchedulePerAItemPurchased.tableHeader,
      tableBody: paymentSchedulePerAItemPurchased.tableBody
    }
  };
  // console.log('billPaymentData: ', billPaymentData)
  return (
    <Box border={border}>
      <Stack direction={'row'} borderBottom={border} p={2} alignItems={'center'} justifyContent={'space-between'}>
        <Typography fontWeight={500}>Payment Schedule</Typography>
        <Box>
          <IconButton
            sx={{
              border: border,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              background: viewType === 1 ? `${theme.palette.divider}` : 'none'
            }}
            size="small"
            onClick={() => setViewType(1)}
          >
            <FormIcon icon={'shortText'} iconType="icon" />
          </IconButton>
          <IconButton
            sx={{
              border: border,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              background: viewType === 2 ? `${theme.palette.divider}` : 'none'
            }}
            size="small"
            onClick={() => setViewType(2)}
          >
            <FormIcon icon={'tableView'} iconType="icon" />
          </IconButton>
        </Box>
      </Stack>
      <Box borderBottom={border}>
        {viewType === 1 ? <PaymentSheduleShortTable props={billPaymentData.shortTable} /> : <PaymentScheduleFullTable />}
      </Box>
      <Stack direction={'row'} p={2} spacing={1} justifyContent="flex-end">
        <Button size="small" variant="outlined">
          Edit
        </Button>
        <Button size="small" variant="contained">
          Save
        </Button>
      </Stack>
    </Box>
  );
};
export default PaymentSchedulePerAItemPurchased;
