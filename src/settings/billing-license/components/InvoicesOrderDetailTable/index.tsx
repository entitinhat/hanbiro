import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { IdName } from '@base/types/common';
import { Table, TableContainer, Paper, useTheme, TableHead, TableRow, TableBody, TableCell, Typography, Box } from '@mui/material';
import { BillPaymentType } from '@settings/billing-license/types/bill-payment';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

interface OrderDetailTable {}

const dummyData = [
  { id: 1, name: 'CRM 10 users', qty: 10, unitPrice: 'Free', unit: 'User', price: 'Free' },
  { id: 2, name: '10G Storage', qty: 10, unitPrice: '	$10,000', unit: '10G', price: '$100,000' }
];

const OrderDetailTable = (props: OrderDetailTable) => {
  const [items, setItems] = useState(dummyData);
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;

  //=============table============

  const getMapColumns = () => {
    return {
      name(col: string, data: any) {
        return data?.[col];
      },
      Qty(col: string, data: any) {
        return data?.[col];
      },
      unitPrice(col: string, data: any) {
        return data?.[col];
      },
      unit(col: string, data: any) {
        return data?.[col];
      },
      price(col: string, data: any) {
        return data?.[col];
      }
    };
  };

  const fields = [
    { languageKey: 'Name', keyName: 'name', enableSorting: false, width: 'auto' },
    { languageKey: 'Qty', keyName: 'Qty', enableSorting: false, width: 'auto' },
    { languageKey: 'UnitPrice', keyName: 'unitPrice', enableSorting: false, width: 'auto' },
    { languageKey: 'Unit', keyName: 'unit', enableSorting: false, width: 'auto' },
    { languageKey: 'Price', keyName: 'price', enableSorting: false, width: 'auto' }
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
    <Box borderBottom={border}>
      <Box p={2} borderBottom={border}>
        <Typography color={theme.palette.secondary.main}>Order Detail</Typography>
      </Box>
      {TableMemo}
    </Box>
  );
};
export default OrderDetailTable;
