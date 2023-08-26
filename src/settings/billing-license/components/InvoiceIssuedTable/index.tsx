import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { IdName } from '@base/types/common';
import { Paper, TableContainer, Typography, Table, TableHead, useTheme, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { BillPaymentType } from '@settings/billing-license/types/bill-payment';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

interface InvoiceIssued {}

const dummyData = [
  { id: 1, date: '5/4/2022', invoiceName: 'CRM 10 users', totalAmount: 10, payment: 'Credit Card' },
  { id: 1, date: '5/4/2022', invoiceName: '10G Storage', totalAmount: 10, payment: 'Credit Card' }
];

const InvoiceIssued = (props: InvoiceIssued) => {
  const [items, setItems] = useState(dummyData);
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;

  //=============table============

  const getMapColumns = () => {
    return {
      date(col: string, data: any) {
        return data?.[col];
      },
      invoiceName(col: string, data: any) {
        return data?.[col];
      },
      totalAmount(col: string, data: any) {
        return data?.[col];
      },
      payment(col: string, data: any) {
        return data?.[col];
      }
    };
  };

  const fields = [
    { languageKey: 'Date', keyName: 'date', enableSorting: false, width: 'auto' },
    { languageKey: 'Invoice Name', keyName: 'invoiceName', enableSorting: false, width: 'auto' },
    { languageKey: 'Total Amount', keyName: 'totalAmount', enableSorting: false, width: 'auto' },
    { languageKey: 'Payment', keyName: 'payment', enableSorting: false, width: 'auto' }
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
    <Box>
      <Box p={2}>
        <Typography color={theme.palette.secondary.main}>Invoice Issued</Typography>
      </Box>
      {TableMemo}
    </Box>
  );
};
export default InvoiceIssued;
