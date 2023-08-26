import React, { useEffect, useMemo, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';

//material
import { AddOutlined, DeleteOutline } from '@mui/icons-material';
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
import { Button } from '@mui/material';
import { Item } from '@product/item/types/item';
import { QUOTE_ITEM_TYPE_GENERAL, QUOTE_ITEM_TYPE_PREPAID, QUOTE_ITEM_TYPE_SUBSCRIPTION } from '@quote/config/constants';
import ItemAutoComplete from '@product/item/containers/ItemAutoComplete';

interface ItemsProps {
  mode?: 'v' | 'w' | 'p';
  menuSourceId?: string;
  isEdit?: boolean;
  items: Item[];
  onChange?: (val: Item[]) => void;
  onSave?: () => void;
}

const defaultItem: any = {
  id: '',
  type: '',
  item: null,
  image: { photo: '', name: '' },
  unit: null,
  attrValues: null,
  priceUnit: null,
  orderedQty: '',
  orderedAmount: { amount: 0, currency: '' }
};

const Items = (props: ItemsProps) => {
  const { mode, menuSourceId, isEdit = false, items = [], onChange, onSave } = props;
  const { t } = useTranslation();

  //hooks
  const theme = useTheme();
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);
  const mUpdate = useQuoteUpdateItem();
  const mDelete = useQuoteDeleteItem();
  //state
  const [generalItems, setGeneralItems] = useState<Item[]>([]);
  const [prepaidItems, setPrepaidItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<Item[]>([]);

  //init items by type
  useEffect(() => {
    if (items.length > 0) {
      setGeneralItems(items.filter((_item: Item) => _item.type === QUOTE_ITEM_TYPE_GENERAL));
      setPrepaidItems(items.filter((_item: Item) => _item.type === QUOTE_ITEM_TYPE_PREPAID));
      setSubItems(items.filter((_item: Item) => _item.type === QUOTE_ITEM_TYPE_SUBSCRIPTION));
    } else {
      setGeneralItems([]);
      setPrepaidItems([]);
      setSubItems([]);
    }
  }, [items]);

  // Give our default column cell renderer editing superpowers!
  const columnRender: Partial<ColumnDef<any>> = {
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
        case 'item':
          return (
            <ItemAutoComplete
              single={true}
              isDisabled={(mode === 'p' || mode === 'v') && !isEdit}
              value={value}
              onChange={(selected: any) => {
                //update current cell
                table.options.meta?.updateCellData(index, id, selected);
              }}
            />
          );
        case 'unit':
          return <Typography>{value?.name}</Typography>;
        case 'attrValues':
          return <Typography>{value ? value?.map((_ele: any) => _ele && _ele.name).join(', ') : ''}</Typography>;
        case 'priceUnit':
          //const defaultPrice = !!value ? value?.find((_ele: any) => _ele.currency === defaultCurrency?.code) : {};
          return <Typography>{`${defaultCurrency?.code} ${moneyFormat(value?.amount || 0)}`}</Typography>;
        case 'orderedQty':
          return (
            <Stack alignItems={'end'}>
              {(mode === 'p' || mode === 'v') && !isEdit ? (
                <Typography>{value}</Typography>
              ) : (
                <TextField
                  sx={{ minWidth: '60px' }}
                  type="number"
                  value={Number(value || 0)}
                  onChange={(e: any) => {
                    const newQty: number = Number(e.target.value);
                    setValue(newQty);
                    //update table
                    table.options.meta?.updateCellData(index, id, newQty);
                  }}
                />
                // <NumberField
                //   sx={{ minWidth: '60px' }}
                //   value={Number(value || 0)}
                //   onChange={(number: string | number) => {
                //     const newQty: number = Number(number);
                //     setValue(newQty);
                //     //update qty
                //     table.options.meta?.updateCellData(index, id, newQty);
                //     //update to db in mode view
                //     // if (mode === 'v') {
                //     //   const updateParams = {
                //     //     id: menuSourceId,
                //     //     item: {
                //     //       id: table.options.data[index].quoteItemId,
                //     //       itemQty: newQty,
                //     //       itemAmount: table.options.data[index].orderedPrice * newQty
                //     //     }
                //     //   };
                //     //   mUpdate.mutate(updateParams);
                //     // }
                //   }}
                //   //onBlur={onBlur}
                // />
              )}
            </Stack>
          );
        case 'orderedAmount':
          return <Typography>{`${defaultCurrency?.code} ${moneyFormat(value?.amount || 0)}`}</Typography>;
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
                // if (mode === 'v') {
                //   const deleteParams = {
                //     id: menuSourceId,
                //     itemIds: [table.options.data[index].quoteItemId]
                //   };
                //   mDelete.mutate(deleteParams);
                // }
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
        accessorKey: 'item',
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
        accessorKey: 'priceUnit',
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
    if (mode === 'w' || isEdit) {
      baseCols.push({
        accessorKey: 'action',
        header: () => <span></span>
      });
    }
    return baseCols;
  }, [mode, isEdit]);

  //add new item
  const handleAddGeneralItem = () => {
    const newItems = [...generalItems];
    newItems.push({ ...defaultItem, type: QUOTE_ITEM_TYPE_GENERAL, orderedQty: 1 });
    setGeneralItems(newItems);
  };

  //add new item
  const handleAddPrepaidItem = () => {
    const newItems = [...prepaidItems];
    newItems.push({ ...defaultItem, type: QUOTE_ITEM_TYPE_PREPAID, orderedQty: 1 });
    setPrepaidItems(newItems);
  };

  //add new item
  const handleAddSubItem = () => {
    const newItems = [...subItems];
    newItems.push({ ...defaultItem, type: QUOTE_ITEM_TYPE_SUBSCRIPTION, orderedQty: 1 });
    setSubItems(newItems);
  };

  //general items
  const handleItemChange = (type: string, newData: any) => {
    let newItems = []; //all items
    const newItemsByType = [...newData]; //items by type
    //set other fields
    newItemsByType.map((_ele: any) => {
      //other changes - fixed values, set once
      //amount - qty change
      const defaultPrice = _ele.item.basePrice; //_ele.basePrices?.find((_ele: any) => _ele.currency === defaultCurrency.code);
      if (!_ele.unit) {
        _ele.unit = _ele.item.unit;
      }
      if (!_ele.attrValues) {
        _ele.attrValues = _ele.item.attrValues;
      }
      if (!_ele.priceUnit) {
        _ele.priceUnit = defaultPrice || { amount: 0, currency: defaultPrice?.currency || defaultCurrency.code };
      }
      _ele.orderedAmount = {
        amount: _ele.orderedQty * (defaultPrice?.amount || 0),
        currency: defaultPrice?.currency || defaultCurrency.code
      };
    });
    if (type === QUOTE_ITEM_TYPE_GENERAL) {
      setGeneralItems(newItemsByType);
      newItems = newItemsByType.concat(prepaidItems).concat(subItems);
    }
    if (type === QUOTE_ITEM_TYPE_PREPAID) {
      setPrepaidItems(newItemsByType);
      newItems = generalItems.concat(newItemsByType).concat(subItems);
    }
    if (type === QUOTE_ITEM_TYPE_SUBSCRIPTION) {
      setSubItems(newItemsByType);
      newItems = generalItems.concat(prepaidItems).concat(newItemsByType);
    }

    //callback
    onChange && onChange(newItems);
  };

  return (
    <Box>
      <Stack>
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
          <Typography variant="subtitle1">General Items</Typography>
        </Stack>
        <ReactEditable8
          editableColumn={columnRender}
          columns={columns}
          data={[...generalItems]}
          setData={(newData: any) => handleItemChange(QUOTE_ITEM_TYPE_GENERAL, newData)}
        />
        {(mode === 'w' || isEdit) && (
          <Stack
            direction={'row'}
            sx={{
              p: 3,
              borderLeft: `1px solid ${theme.palette.divider}`,
              borderRight: `1px solid ${theme.palette.divider}`,
              borderBottom: `1px solid ${theme.palette.divider}`,
              height: 5
            }}
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
              startIcon={<AddOutlined />}
              onClick={handleAddGeneralItem}
            >
              {t('Add another line')}
            </Button>
          </Stack>
        )}
      </Stack>
      <Stack>
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
          <Typography variant="subtitle1">Prepaid Items</Typography>
        </Stack>
        <ReactEditable8
          editableColumn={columnRender}
          columns={columns}
          data={[...prepaidItems]}
          setData={(newData: any) => handleItemChange(QUOTE_ITEM_TYPE_PREPAID, newData)}
        />
        {(mode === 'w' || isEdit) && (
          <Stack
            direction={'row'}
            sx={{
              p: 3,
              borderLeft: `1px solid ${theme.palette.divider}`,
              borderRight: `1px solid ${theme.palette.divider}`,
              borderBottom: `1px solid ${theme.palette.divider}`,
              height: 5
            }}
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
              startIcon={<AddOutlined />}
              onClick={handleAddPrepaidItem}
            >
              {t('Add another line')}
            </Button>
          </Stack>
        )}
      </Stack>
      <Stack>
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
          <Typography variant="subtitle1">Subscription Items</Typography>
        </Stack>
        <ReactEditable8
          editableColumn={columnRender}
          columns={columns}
          data={[...subItems]}
          setData={(newData: any) => handleItemChange(QUOTE_ITEM_TYPE_SUBSCRIPTION, newData)}
        />
        {(mode === 'w' || isEdit) && (
          <Stack
            direction={'row'}
            sx={{
              p: 3,
              borderLeft: `1px solid ${theme.palette.divider}`,
              borderRight: `1px solid ${theme.palette.divider}`,
              borderBottom: `1px solid ${theme.palette.divider}`,
              height: 5
            }}
            justifyContent="space-between"
            alignItems={'center'}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ lineHeight: '1.6', fontSize: '0.725rem' }}
              startIcon={<AddOutlined />}
              onClick={handleAddSubItem}
            >
              {t('Add another line')}
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Items;
