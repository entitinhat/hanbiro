import React, { useEffect, useMemo, useRef, useState } from 'react';
//mui
import { useTheme, Button } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ColumnDef } from '@tanstack/react-table';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
interface AllItemsTabTable {
  handleOpen: (tag: any) => void;
}

const dummyData = [
  { id: 1, product: 'CRM', item: 'CRM 10 Users', description: '', unitPrice: 'Free', unit: 'User', billing: '' },
  { id: 2, product: 'CRM', item: 'CRM Add a user', description: '', unitPrice: '3,000', unit: 'User', billing: 'Monthly' },
  { id: 3, product: 'CRM Call', item: 'Call Setting', description: '', unitPrice: '180,000', unit: 'Set', billing: 'One time' },
  { id: 4, product: 'CRM Call', item: 'Call Add a  user', description: '', unitPrice: '0', unit: 'User', billing: 'Monthly' },
  { id: 5, product: 'HR', item: 'HR 10 users', description: '', unitPrice: 'Free', unit: '', billing: '' },
  { id: 6, product: 'HR', item: 'HR Add a user', description: '', unitPrice: '0', unit: '', billing: 'Monthly' },
  { id: 7, product: 'Online Storage', item: '1G Storage', description: '', unitPrice: 'Free', unit: '', billing: '' },
  { id: 8, product: 'Online Storage', item: '10G Storage', description: '', unitPrice: '10,000', unit: '10G', billing: 'Monthly' },
  { id: 9, product: 'Online Storage', item: '30G Storage', description: '', unitPrice: '20,000', unit: '30G', billing: 'Monthly' },
  { id: 10, product: 'Email', item: 'Email', description: '', unitPrice: '1,000', unit: '10G', billing: 'Monthly' },
  { id: 11, product: 'Email', item: 'Sending Email', description: '', unitPrice: '5,000', unit: '1000 Messages	', billing: 'Monthly' },
  { id: 12, product: 'Email', item: 'Recharge sending Email', description: '', unitPrice: '0.5', unit: '', billing: 'Recharge' },
  { id: 13, product: 'Project', item: 'Project 10 users', description: '', unitPrice: 'Free', unit: '', billing: '' },
  { id: 14, product: 'Project', item: 'Project 10 users', description: '', unitPrice: '0', unit: '', billing: 'Monthly' },
  { id: 15, product: 'Team Channel', item: 'Team Channel 10 users', description: '', unitPrice: 'Free', unit: '', billing: '' },
  { id: 16, product: 'Team Channel', item: 'Team Channel Add a user', description: '', unitPrice: '0', unit: '', billing: 'Monthly' },
  { id: 17, product: 'SMS', item: 'SMS', description: '', unitPrice: '0', unit: 'Message', billing: 'Recharge	' },
  { id: 18, product: 'SMS', item: 'LMS', description: '', unitPrice: '0', unit: 'Message', billing: 'Recharge	' },
  { id: 19, product: 'Digital Tax Invoice', item: '', description: '', unitPrice: '150', unit: '', billing: 'Recharge' },
  { id: 20, product: 'Virtual Billing Account', item: '', description: '', unitPrice: '0', unit: 'Billing Account', billing: 'Recharge' },
  { id: 21, product: 'Fax', item: '', description: '', unitPrice: '0', unit: 'Fax number', billing: 'Monthly' },
  { id: 22, product: 'Fax', item: '', description: '', unitPrice: '0', unit: 'Document', billing: 'Recharge' }
];

const AllItemTabTable = ({ handleOpen }: AllItemsTabTable) => {
  const [items, setItems] = useState(dummyData);
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;

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
      unitPrice(col: string, data: any) {
        return data?.[col];
      },
      unit(col: string, data: any) {
        return data?.[col];
      },
      billing(col: string, data: any) {
        return data?.[col];
      },
      purchasing(col: string, data: any) {
        return (
          <Button size="small" variant="outlined" onClick={() => handleOpen(data.billing)}>
            <AddShoppingCartIcon fontSize="small" />
          </Button>
        );
      }
    };
  };

  const fields = [
    { languageKey: 'Product', keyName: 'product', enableSorting: false, width: 'auto' },
    { languageKey: 'Item', keyName: 'item', enableSorting: false, width: 'auto' },
    { languageKey: 'Description', keyName: 'description', enableSorting: false, width: 'auto' },
    { languageKey: 'UnitPrice', keyName: 'unitPrice', enableSorting: false, width: 'auto' },
    { languageKey: 'Unit', keyName: 'unit', enableSorting: false, width: 'auto' },
    { languageKey: 'Billing', keyName: 'billing', enableSorting: false, width: 'auto' },
    { languageKey: 'Purchasing', keyName: 'purchasing', enableSorting: false, width: 'auto' }
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
export default AllItemTabTable;
