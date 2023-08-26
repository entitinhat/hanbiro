import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { Box, Typography, useTheme } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

const dummyData = [{ id: 1, date: '7/4/2022', activityType: 'asd', item: 'asd', note: 'asd', amount: 10, transactionId: 'asd' }];

const TransactionHistory = () => {
  const [items, setItems] = useState(dummyData);
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  // console.log('dataTemp: ', JSON.stringify(dataTemp))

  //=============table============

  const getMapColumns = () => {
    return {
      date(col: string, data: any) {
        return data?.[col];
      },
      activityType(col: string, data: any) {
        return data?.[col];
      },
      item(col: string, data: any) {
        return data?.[col];
      },
      note(col: string, data: any) {
        return data?.[col];
      },
      amount(col: string, data: any) {
        return data?.[col];
      },
      transactionId(col: string, data: any) {
        return data?.[col];
      }
    };
  };

  const fields = [
    { languageKey: 'Date', keyName: 'date', enableSorting: false, width: 'auto' },
    { languageKey: 'Activity Type', keyName: 'activityType', enableSorting: false, width: 'auto' },
    { languageKey: 'Item', keyName: 'item', enableSorting: false, width: 'auto' },
    { languageKey: 'Note', keyName: 'note', enableSorting: false, width: 'auto' },
    { languageKey: 'Amount', keyName: 'amount', enableSorting: false, width: 'auto' },
    { languageKey: 'Transaction ID', keyName: 'transactionId', enableSorting: false, width: 'auto' }
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
    <Box border={border}>
      <Box borderBottom={border} p={2}>
        <Typography fontWeight={500}>Transaction History</Typography>
      </Box>
      <Box>{TableMemo}</Box>
    </Box>
  );
};
export default TransactionHistory;
