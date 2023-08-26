import React, { useEffect, useMemo, useState } from 'react';
import { LicensesUsed } from '@settings/billing-license/types/liences';
// import {queryKeys} from '@settings/billing-license/config/License/queryKeys';
import ReduceUserModal from '@settings/billing-license/components/LicenseModal/ReduceUser';
import TerminateModal from '@settings/billing-license/components/LicenseModal/Terminate';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ColumnDef } from '@tanstack/react-table';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { Button, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/material';

const dummyData = [
  {
    id: 1,
    product: 'CRM',
    item: 'CRM 10 users',
    description: '',
    quantity: 10,
    unitPrice: 'Free',
    unit: 'User',
    amount: '',
    billing: '',
    action: 'Terminate'
  },
  {
    id: 2,
    product: 'CRM',
    item: 'CRM 10 users',
    description: '',
    quantity: 5,
    unitPrice: '3,000',
    unit: 'User',
    amount: '1500',
    billing: 'Monthly',
    action: 'Reduce'
  },
  {
    id: 3,
    product: 'Online Storage',
    item: '10G Storage',
    description: '',
    quantity: 1,
    unitPrice: '10,000',
    unit: '10G',
    amount: '150',
    billing: '',
    action: 'Terminate'
  },
  {
    id: 4,
    product: 'HR',
    item: 'HR 10 users',
    description: '',
    quantity: 10,
    unitPrice: 'Free',
    unit: 'User',
    amount: '',
    billing: '',
    action: 'Terminate'
  }
];

// const LicenseData = { tableHeaders: tableHeaders, tableBody: tableBody }
const LicensesUsed = () => {
  const [items, setitems] = useState(dummyData);
  const [showModal, setShowModal] = useState<{ type: 'Reduce' | 'Terminate' | undefined; data: any }>({ type: undefined, data: undefined });
  const handleClose = () => {
    setShowModal({ type: undefined, data: undefined });
  };

  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  //   useEffect(() => {

  //   }, [dummyData]);

  const handleOpenModal = (value: string, data: any) => {
    if (value === 'Terminate') {
      setShowModal({ type: 'Terminate', data: data });
    } else if (value === 'Reduce') {
      setShowModal({ type: 'Reduce', data: data });
    }
  };

  //=============table============

  const getMapColumns = () => {
    return {
      product(col: string, data: any) {
        return data?.[col];
      },
      item(col: string, data: any) {
        return data?.[col];
      },
      description(col: string, data: any) {
        return data?.[col];
      },
      quantity(col: string, data: any) {
        return data?.[col];
      },
      unitPrice(col: string, data: any) {
        return data?.[col];
      },
      unit(col: string, data: any) {
        return data?.[col];
      },
      amount(col: string, data: any) {
        return data?.[col];
      },
      billing(col: string, data: any) {
        return data?.[col];
      },
      action(col: string, data: any, extra: any) {
        return (
          <Button variant="outlined" color="error" size="small" onClick={() => handleOpenModal(data?.[col], data)}>
            {data?.[col]}
          </Button>
        );
      }
    };
  };

  const fields = [
    { languageKey: 'Product', keyName: 'product', enableSorting: false, width: 'auto' },
    { languageKey: 'Item', keyName: 'item', enableSorting: false, width: 'auto' },
    { languageKey: 'Description', keyName: 'description', enableSorting: false, width: 'auto' },
    { languageKey: 'Quantity', keyName: 'quantity', enableSorting: false, width: 'auto' },
    { languageKey: 'Unit_Price', keyName: 'unitPrice', enableSorting: false, width: 'auto' },
    { languageKey: 'Unit', keyName: 'unit', enableSorting: false, width: 'auto' },
    { languageKey: 'Amount', keyName: 'amount', enableSorting: false, width: 'auto' },
    { languageKey: 'Billing', keyName: 'billing', enableSorting: false, width: 'auto' },
    { languageKey: 'Actions', keyName: 'action', enableSorting: false, width: 'auto' }
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
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} border={border} p={2}>
          <Typography fontWeight={500}>Licenses Used</Typography>
          <Button variant="contained" color="error" size="small" onClick={() => setitems([])}>
            Terminate All
          </Button>
        </Stack>
        {TableMemo}
      </Box>
      {showModal.type !== 'Reduce' ? (
        <TerminateModal isOpen={showModal.type === 'Terminate'} onClose={handleClose} />
      ) : (
        <ReduceUserModal isOpen={showModal.type === 'Reduce'} onClose={handleClose} item={showModal?.data} />
      )}
    </>
  );
};
export default LicensesUsed;
