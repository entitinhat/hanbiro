import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { Add } from '@mui/icons-material';
import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import AddNewBillingPlanModal from '@settings/billing-license/components/BillPaymentModal/AddNewBillingPlanModal';

import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const dummyData = [
  { id: 1, name: 'Plan 1', billingCycle: '6 Monthly', startOn: '7/11/2022' },
  { id: 2, name: 'Plan 2', billingCycle: '6 Monthly', startOn: '7/11/2022' },
  { id: 3, name: 'Plan 3', billingCycle: '6 Monthly', startOn: '7/11/2022' },
  { id: 4, name: 'Plan 4', billingCycle: '6 Monthly', startOn: '7/11/2022' }
];

const BillingPlan = () => {
  const theme = useTheme();
  const [toggle, setToggle] = useState(false);
  const [items, setItems] = useState(dummyData);

  const [tag, setTag] = useState({
    id: null,
    name: '',
    billingcycle: '',
    startOn: ''
  });

  const methods = useForm();

  const handleClose = () => {
    setToggle(false);
  };
  const onSubmit = (data: any) => {
    if (data !== null) {
      setItems([...items, data]);
    }
    setToggle(false);
  };

  const border = `1px solid ${theme.palette.divider}`;
  //=============table============

  const getMapColumns = () => {
    return {
      name(col: string, data: any) {
        return data?.[col];
      },
      billingCycle(col: string, data: any) {
        return data?.[col];
      },
      startOn(col: string, data: any) {
        return data?.[col];
      }
    };
  };

  const fields = [
    { languageKey: 'Name', keyName: 'name', enableSorting: false, width: 'auto' },
    { languageKey: 'Billing cycle', keyName: 'billingCycle', enableSorting: false, width: 'auto' },
    { languageKey: 'Start on', keyName: 'startOn', enableSorting: false, width: 'auto' }
  ];

  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items || [],
      columns: columns,
      sx: { px: 0, mb: 0 }
    };
    return <ListTable {...listTableProps} />;
  }, [items, columns]);
  return (
    <>
      <Box border={border}>
        <Stack direction={'row'} borderBottom={border} p={2} alignItems="center" justifyContent={'space-between'}>
          <Typography fontWeight={500}>Billing Plan</Typography>
          <Button variant="contained" size="small" startIcon={<Add />} onClick={() => setToggle(true)}>
            Add New Plan
          </Button>
        </Stack>
        {TableMemo}
      </Box>
      {toggle && (
        <FormProvider {...methods}>
          <AddNewBillingPlanModal action={toggle} methods={methods} submit={methods.handleSubmit(onSubmit)} close={handleClose} />
        </FormProvider>
      )}
    </>
  );
};
export default BillingPlan;
