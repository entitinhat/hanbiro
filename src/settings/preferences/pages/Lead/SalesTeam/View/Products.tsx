import React, { useEffect, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { Box, styled, SxProps, TextField, Typography } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material';

//project base
import IconButton from '@base/components/@extended/IconButton';
import ProductAutoComplete from '@product/product/containers/ProductAutoComplete';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LookUp from '@base/containers/LookUp';
import { useGetModuleProcesses } from '@process/hooks/useModule';

//menu
import { KEY_SALES_TEAM_PRODUCTS_OPPRTUNITY, KEY_SALES_TEAM_PRODUCTS_PRODUCT } from '@settings/preferences/config/lead/keyNames';

interface Props {
  value: any[];
  onChange?: (values: any) => void;
  tableSx?: SxProps;
  isWrite?: boolean;
}

const Products = (props: Props) => {
  const { value, onChange, tableSx, isWrite } = props;
  const [items, setItems] = useState<any[]>([]);

  //initial value
  useEffect(() => {
    if (value && JSON.stringify(value) != JSON.stringify(items)) {
      setItems(value);
    }
  }, [value]);

  //column render
  const editableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index, original }, column: { id }, table }) => {
      // console.log('table', table);
      // console.log('column id', id);
      const initialValue = getValue<any>();

      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState(initialValue || '');

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue || '');
      }, [initialValue]);

      //delete a row
      const onDelete = (rIndex: number) => {
        const newTableData = [...table.options.data];
        newTableData.splice(rIndex, 1);
        table.options.meta?.updateTableData(newTableData);
      };

      const getViewTableColumn = (fieldId: string) => {
        switch (fieldId) {
          case KEY_SALES_TEAM_PRODUCTS_PRODUCT:
            return <Typography>{value.name ?? '(none)'}</Typography>;
          case KEY_SALES_TEAM_PRODUCTS_OPPRTUNITY:
            return <Typography>{value.name ?? '(none)'}</Typography>;
          case 'delete':
            return (
              <Box sx={{ textAlign: 'right' }}>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    onDelete(index);
                  }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Box>
            );
          default:
            return <Typography>{value}</Typography>;
        }
      };

      const getEditTableColumn = (fieldId: string) => {
        switch (fieldId) {
          case KEY_SALES_TEAM_PRODUCTS_PRODUCT:
            return (
              <ProductAutoComplete
                single
                value={value}
                onChange={(selected) => {
                  setValue(selected);
                  table.options.meta?.updateCellData(index, id, selected);
                }}
              />
            );
          case KEY_SALES_TEAM_PRODUCTS_OPPRTUNITY:
            return (
              <LookUp
                fetchList={useGetModuleProcesses}
                fieldValue="id"
                fieldLabel="name"
                extraParams={{ module: 'MODULE_TICKET' }} //MODULE_QUOTE
                isSearch={false}
                value={value}
                onChange={(selected) => {
                  setValue(selected);
                  table.options.meta?.updateCellData(index, id, selected);
                }}
              />
            );
          case 'delete':
            return (
              <Box sx={{ textAlign: 'right' }}>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    onDelete(index);
                  }}
                >
                  <DeleteOutline fontSize="small" />
                </IconButton>
              </Box>
            );
          default:
            return <TextField fullWidth value={value || ''} onBlur={onBlur} />;
        }
      };

      return isWrite ? getEditTableColumn(id) : getViewTableColumn(id);
    }
  };

  //column config
  const columnsRender = React.useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: KEY_SALES_TEAM_PRODUCTS_PRODUCT,
        header: ({ table }) => <SpanLang keyLang={`Product`} textOnly />
      },
      {
        accessorKey: KEY_SALES_TEAM_PRODUCTS_OPPRTUNITY,
        header: ({ table }) => <SpanLang keyLang={`Opportunity Process`} textOnly />
      },
      {
        accessorKey: 'delete',
        width: '8%',
        header: ({ table }) => <></>
      }
    ],
    []
  );

  //value change
  const handleTableOnChange = (newData: any) => {
    setItems(newData);
    onChange && onChange(newData);
  };

  return (
    <>
      <ReactEditable8
        editableColumn={editableColumn}
        columns={columnsRender}
        data={[...items]}
        setData={(newData: any) => handleTableOnChange(newData)}
        sx={tableSx}
      />
    </>
  );
};

export default Products;
