import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { Box, Card, CardContent, Typography, useTheme } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

const dummyData: any[] = [];

const VirtualBillingAccountUsage = () => {
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;
  const [items, setItems] = useState(dummyData);
  //=============table============

  const getMapColumns = () => {
    return {
      date(col: string, data: any) {
        return data?.[col];
      },
      user(col: string, data: any) {
        return data?.[col];
      },
      subject(col: string, data: any) {
        return data?.[col];
      },
      amount(col: string, data: any) {
        return data?.[col];
      }
    };
  };

  const fields = [
    { languageKey: 'Date', keyName: 'date', enableSorting: false, width: 'auto' },
    { languageKey: 'User', keyName: 'user', enableSorting: false, width: 'auto' },
    { languageKey: 'Subject', keyName: 'subject', enableSorting: false, width: 'auto' },
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
  return (
    <Box border={border}>
      <Box borderBottom={border} p={2}>
        <Typography fontWeight={500}>Virtual Billing Account Usage</Typography>
      </Box>
      <Box>{TableMemo}</Box>
    </Box>
  );
};
export default VirtualBillingAccountUsage;
