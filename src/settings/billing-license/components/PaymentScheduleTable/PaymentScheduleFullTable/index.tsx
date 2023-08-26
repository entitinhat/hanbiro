import tableBody from '@base/components/@hanbiro/GrapeTS/plugins/basic-block/components/table/table-body';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import { BillPaymentType } from '@settings/billing-license/types/bill-payment';
import React, { useMemo, useState } from 'react';
import { IdName } from '@base/types/common';
import { ColumnDef } from '@tanstack/react-table';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';

interface PaymentScheduleFullTable {
  data: any;
}

const dummyData = [
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
];

const PaymentScheduleFullTable = () => {
  const theme = useTheme();
  const [items, setItems] = useState(dummyData);
  const border = `1px solid ${theme.palette.divider}`;
  const tableCellStyle = { border: border, '&::after': { display: 'none' } };

  //=============table============

  const getMapColumns = () => {
    return {
      item(col: string, data: any) {
        return data?.[col];
      },
      purchasedOn(col: string, data: any) {
        return data?.[col];
      },
      billingDate(col: string, data: any) {
        return data?.[col];
      },
      startOn(col: string, data: any) {
        return data?.[col];
      },
      endOn(col: string, data: any) {
        return data?.[col];
      },
      amount(col: string, data: any) {
        return data?.[col];
      }
    };
  };

  const fields = [
    { languageKey: 'Item', keyName: 'item', enableSorting: false, width: 'auto' },
    { languageKey: 'Purchased on', keyName: 'purchasedOn', enableSorting: false, width: 'auto' },
    { languageKey: 'Billing date', keyName: 'billingDate', enableSorting: false, width: 'auto' },
    { languageKey: 'Start on', keyName: 'startOn', enableSorting: false, width: 'auto' },
    { languageKey: 'End on', keyName: 'endOn', enableSorting: false, width: 'auto' },
    { languageKey: 'Amount', keyName: 'amount', enableSorting: false, width: 'auto' }
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

  return <>{TableMemo}</>;
};
export default PaymentScheduleFullTable;
