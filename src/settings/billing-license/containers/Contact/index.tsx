// import components custom
import { IconButton, Stack, Typography } from '@mui/material';
import { Box, useTheme } from '@mui/material';
import { DivHeading, HeadingBillingInformation } from '@settings/billing-license/components/CustomTag';
import SelectInformation from '@settings/billing-license/components/SelectInformation';
import TableInformation from '@settings/billing-license/components/TableInformation';

// import React
import React, { useEffect, useMemo } from 'react';
import { TableData } from '@settings/billing-license/types/tableData';
import { DeleteOutline } from '@mui/icons-material';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import columns from '@base/config/list-field/columns';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ColumnDef } from '@tanstack/react-table';

export const dummyData: TableData[] = [
  { id: 1, name: 'Contact 1', role: 'string', email: 'string@gmail.com', phone: '0123123123', mobile: '0123123123' },
  { id: 2, name: 'Contact 2', role: 'string', email: 'string@gmail.com', phone: '0123123123', mobile: '0123123123' },
  { id: 3, name: 'Contact 3', role: 'string', email: 'string@gmail.com', phone: '0123123123', mobile: '0123123123' },
  { id: 4, name: 'Contact 4', role: 'string', email: 'string@gmail.com', phone: '0123123123', mobile: '0123123123' },
  { id: 5, name: 'Contact 5', role: 'string', email: 'string@gmail.com', phone: '0123123123', mobile: '0123123123' }
];

const Contact = () => {
  const [items, setItems] = React.useState<TableData[] | []>(dummyData);

  // handle click when adding data from select option
  const handleAdd = (val: any) => {
    const existedItem = items.find((item) => item.id === val?.id);
    if (!existedItem) {
      setItems([...items, val]);
    }
  };

  // handle click when pressing a delete button from cell of table
  const handleDelete = (id: number) => {
    const arrayTable = [...items];
    const res = arrayTable.filter((v: TableData) => v.id !== id);
    setItems(res);
  };

  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;

  //=============table============

  const getMapColumns = () => {
    return {
      name(col: string, data: any) {
        return data?.[col];
      },
      role(col: string, data: any) {
        return data?.[col];
      },
      email(col: string, data: any) {
        return data?.[col];
      },
      phone(col: string, data: any) {
        return data?.[col];
      },
      mobile(col: string, data: any) {
        return data?.[col];
      },

      delete(column: string, data: any, extra: any) {
        return (
          <IconButton
            onClick={() => {
              handleDelete(data.id);
            }}
          >
            <DeleteOutline fontSize="small" color="error" />
          </IconButton>
        );
      }
    };
  };

  //table props
  const fields = [
    { languageKey: 'Source', keyName: 'name', enableSorting: false, width: 'auto' },
    { languageKey: 'Name', keyName: 'role', enableSorting: false, width: 'auto' },
    { languageKey: 'Company', keyName: 'email', enableSorting: false, width: 'auto' },
    { languageKey: 'Email', keyName: 'phone', enableSorting: false, width: 'auto' },
    { languageKey: 'Mobile', keyName: 'mobile', enableSorting: false, width: 'auto' },
    { languageKey: '', keyName: 'delete', enableSorting: false, width: '70px' }
  ];

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(), {}, [])], [fields]);

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items,
      columns: columns,
      sx: { px: 0, pb: 1 }
    };
    return <ListTable {...listTableProps} />;
  }, [items, columns]);

  return (
    <Box border={border}>
      <Box p={2} borderBottom={border}>
        <Typography fontWeight={500}>Contact</Typography>
      </Box>

      {TableMemo}

      <SelectInformation handleAdd={handleAdd} />
    </Box>
  );
};

export default Contact;
