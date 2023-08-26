import React, { useMemo } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useRecoilValue } from 'recoil';

//material
import { DeleteOutline } from '@mui/icons-material';
import { Box, Stack, TextField, Typography, useTheme } from '@mui/material';

//project
import IconButton from '@base/components/@extended/IconButton';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import { moneyFormat } from '@base/utils/helpers';
import { defaultCurrencySelector } from '@base/store/selectors/app';

//related menu
import { useQuoteDeleteItem, useQuoteUpdateItem } from '@quote/hooks/useQuoteProductDetail';
import NumberField from '@base/components/@hanbiro/NumberField';

interface OneTimeItemsProps {
  mode?: 'v' | 'w' | 'p';
  menuSourceId?: string;
  isEdit?: boolean;
  items: any[];
  onChange?: (val: any[]) => void;
  onSave?: () => void;
  title?: string | null;
}

const OneTimeItems = (props: OneTimeItemsProps) => {
  const { mode, menuSourceId, isEdit = false, items, onChange, onSave, title = 'Onetime Payment' } = props;
  //hooks
  const theme = useTheme();
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  const mUpdate = useQuoteUpdateItem();
  const mDelete = useQuoteDeleteItem();

  // Give our default column cell renderer editing superpowers!
  const editableColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id }, table }) => {
      //console.log('row index', index);
      //console.log('column id', id);
      const initialValue = getValue();
      //console.log('initialValue', initialValue);
      //console.log('table options', table.options);

      // We need to keep and update the state of the cell normally
      const [value, setValue] = React.useState<any>(initialValue || '');
      //console.log('value', value);

      // When the input is blurred, we'll call our table meta's updateData function
      const onBlur = () => {
        table.options.meta?.updateCellData(index, id, value);
      };

      // If the initialValue is changed external, sync it up with our state
      React.useEffect(() => {
        setValue(initialValue || '');
      }, [initialValue]);

      switch (id) {
        case 'image':
          return <IconAvatar url={value?.photo} alt={value?.name} />;
        case 'name':
          return <Typography>{value}</Typography>;
        case 'unit':
          return <Typography>{value?.name}</Typography>;
        case 'attrValues':
          return <Typography>{value ? value?.map((_ele: any) => _ele && _ele.name).join(', ') : ''}</Typography>;
        case 'basePrices':
          const defaultPrice = !!value ? value?.find((_ele: any) => _ele.currency === defaultCurrency?.code) : {};
          return (
            <Stack direction={'row'} alignItems={'end'} spacing={0.5}>
              <Typography>{moneyFormat(defaultPrice?.amount || 0)}</Typography>
              <Typography>{defaultCurrency?.code}</Typography>
            </Stack>
          );
        case 'orderedQty':
          return (
            <Stack alignItems={'end'}>
              {mode === 'p' ? (
                <Typography>{value}</Typography>
              ) : (
                <NumberField
                  sx={{ minWidth: '60px' }}
                  value={value as number}
                  onChange={(number: string | number) => {
                    const newQty: number = Number(number);
                    setValue(newQty);
                    //update qty
                    table.options.meta?.updateCellData(index, id, newQty);
                    //update to db in mode view
                    if (mode === 'v') {
                      const updateParams = {
                        id: menuSourceId,
                        item: {
                          id: table.options.data[index].quoteItemId,
                          itemQty: newQty,
                          itemAmount: table.options.data[index].orderedPrice * newQty
                        }
                      };
                      mUpdate.mutate(updateParams);
                    }
                  }}
                  //onBlur={onBlur}
                />
              )}
            </Stack>
          );
        case 'orderedAmount':
          return (
            <Stack direction={'row'} alignItems={'end'} spacing={0.5}>
              <Typography>{moneyFormat(value || 0)}</Typography>
              <Typography>{defaultCurrency?.code}</Typography>
            </Stack>
          );
        case 'action':
          return (
            <IconButton
              size="small"
              aria-label="delete"
              color="error"
              onClick={(event: any) => {
                event.stopPropagation();
                table.options.meta?.removeTableRow(index, id);
                //update to db in mode view
                if (mode === 'v') {
                  const deleteParams = {
                    id: menuSourceId,
                    itemIds: [table.options.data[index].quoteItemId]
                  };
                  mDelete.mutate(deleteParams);
                }
              }}
            >
              <DeleteOutline fontSize="small" color="error" />
            </IconButton>
          );
      }
    }
  };

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(() => {
    const baseCols = [
      {
        accessorKey: 'image',
        header: () => <span>Image</span>
      },
      {
        accessorKey: 'name',
        header: () => <span>Item</span>
      },
      {
        accessorKey: 'unit',
        header: () => <span>Unit</span>
      },
      {
        accessorKey: 'attrValues',
        header: () => <span>Attribute</span>
      },
      {
        accessorKey: 'basePrices',
        header: () => <span>Unit Price</span>
      },
      {
        accessorKey: 'orderedQty',
        header: () => <span>Qty Ordered</span>
      },
      {
        accessorKey: 'orderedAmount',
        header: () => <span>Amount</span>
      }
    ];
    if (mode !== 'p') {
      baseCols.push({
        accessorKey: 'action',
        header: () => <span>Action</span>
      });
    }
    return baseCols;
  }, [mode]);

  return (
    <Box>
      {
        title !== null && (
          <Stack
            direction={'row'}
            sx={{
              p: 3,
              borderLeft: `1px solid ${theme.palette.divider}`,
              borderTop: `1px solid ${theme.palette.divider}`,
              borderRight: `1px solid ${theme.palette.divider}`,
              height: 5
            }}
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Typography variant="subtitle1">Onetime Payment</Typography>
            {/* {mode === 'v' && (
          <LoadingButton variant="contained" color="primary" size="small" onClick={onSave}>
            Save
          </LoadingButton>
        )} */}
          </Stack>
        )
      }
      <ReactEditable8
        editableColumn={editableColumn}
        columns={columns}
        data={[...items]}
        setData={(newData: any) => onChange && onChange(newData)}
      />
    </Box>
  );
};

export default OneTimeItems;
