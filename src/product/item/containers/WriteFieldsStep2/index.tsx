import { Item, ProductItem } from '@product/item/types/item';
import CodeGenerator from '@base/containers/CodeGenerator';
import { MENU_ITEM } from '@base/config/menus';
import { Box, Button, CircularProgress, IconButton, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import { ColumnDef } from '@tanstack/react-table';
import {
  INVENTORY_TYPE_INVENTORY,
  PRODUCT_ITEM_TYPE_ENUM_GENERAL,
  PRODUCT_ITEM_TYPE_ENUM_PREPAID,
  PRODUCT_TYPE_PRODUCED,
  PRODUCT_TYPE_PURCHASE
} from '@product/main/config/constants';
import {
  KEY_ITEM_CODE,
  KEY_ITEM_BASE_PRICE,
  KEY_ITEM_COST_PRICE,
  KEY_ITEM_PURCHASE_PRICE,
  KEY_ITEM_OPEN_STOCK,
  KEY_ITEM_REPLENISHMENT_POINT,
  KEY_ITEM_SKU,
  KEY_ITEM_UNIT_VALUE,
  KEY_ITEM_NAME,
  KEY_ITEM_IMAGES
} from '@product/item/config/keyNames';
import { styled } from '@mui/system';
import { useItemCodes } from '@product/item/hooks/useItemCodes';
import { Product } from '@product/product/types/product';
import { ContentCopyOutlined, Delete } from '@mui/icons-material';
import NumberField from '@base/components/@hanbiro/NumberField';
import CurrencySelect from '@base/components/@hanbiro/CurrencySelect';
// import { Currency } from '@settings/general/types/interface';
// import SKU from '../Sku';
import React from 'react';
import { ReactEditable8 } from '@base/components/@hanbiro/ReactTable8';
import { Currency } from '@base/types/common';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import ImageUpload from '../ImageUpload';
import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import NumberFieldCurrency from '@base/components/@hanbiro/NumberFieldCurrency';
import SpanLang from '@base/components/@hanbiro/SpanLang';
interface WriteFieldsStep2Props {
  value: ProductItem[];
  itemType: string;
  inventoryType: string;
  prodData: Product;
  onChange: (value: ProductItem[]) => void;
}

const TableHeadCell = styled(Box)({
  fontSize: 14,
  textTransform: 'capitalize',
  whiteSpace: 'nowrap'
});

const WriteFieldsStep2 = (props: WriteFieldsStep2Props) => {
  const { value, onChange, itemType, inventoryType, prodData } = props;

  const [items, setItems] = useState<ProductItem[]>([]);
  const [codes, setCodes] = useState<string[]>([]);

  //========================get cost format from Products Settings=================================
  const params = {
    key: 'cost_of_good',
    menu: 'product'
  };
  const { data: costData } = useProductGeneralSetting(params);
  //=====================================================================================================
  // init
  const {
    data: nextIdData,
    isLoading,
    isFetching
  } = useItemCodes({
    itemsLength: value?.length,
    opts: { enabled: codes?.length == 0 }
  });

  useEffect(() => {
    if (!_.isEqual(nextIdData?.codes, codes)) {
      setCodes(nextIdData?.codes);
    }
  }, [nextIdData]);

  // init codes
  useEffect(() => {
    // const codes = nextIdData?.codes || [];
    if (value && value.length) {
      const _values = value?.map((item: ProductItem, index: number) => ({
        ...item,
        [KEY_ITEM_CODE]: codes?.[index] ?? item?.[KEY_ITEM_CODE] ?? ''
      }));

      if (!_.isEqual(value, _values)) {
        setItems(_values);
        onChange && onChange(_values);
      }
    }
  }, [value, codes]);

  // EDITTABLE
  // Give our default column cell renderer editing superpowers!

  //===========================================Debug=======================
  // console.log('prodData item checking', prodData);
  //=======================================================================
  const editableColumn: Partial<ColumnDef<any>> = useMemo(() => {
    return {
      cell: ({ getValue, row: { index, original }, column: { id }, table }) => {
        // console.log('table', table);
        // console.log('column id', id);
        const initialValue = getValue<any>();
        // console.log('column id', costData?.value);
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

        const handleCopy = (fieldId: string, cValue: any) => {
          // update data to all cell table
          // table.options.meta?.updateCellData(2, id, cValue);
          const newTableData: any[] = [];
          table.options.data?.map((row: any, rIdx: number) => {
            newTableData.push({
              ...row,
              [fieldId]: {
                ...row[fieldId],
                amount: cValue?.amount
              }
            });
          });
          table.options.meta?.updateTableData(newTableData);
        };

        const handleCopyNumber = (fieldId: string, cValue: number) => {
          const newTableData: any[] = [];
          table.options.data?.map((row: any, rIdx: number) => {
            newTableData.push({
              ...row,
              [fieldId]: cValue
            });
          });
          table.options.meta?.updateTableData(newTableData);
        };

        const onDeleteItem = (rIndex: number) => {
          const newTableData = [...table.options.data];
          newTableData.splice(rIndex, 1);
          table.options.meta?.updateTableData(newTableData);
        };

        const getEditTableColumn = (fieldId: string) => {
          switch (fieldId) {
            case KEY_ITEM_IMAGES:
              return (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  {itemType === PRODUCT_ITEM_TYPE_ENUM_GENERAL ? (
                    <ImageUpload
                      file={value}
                      setFieldValue={(field: string, value: any) => {
                        setValue(value);
                        table.options.meta?.updateCellData(index, id, value);
                      }}
                    />
                  ) : (
                    <IconAvatar showType="image" variant="rounded" id={value?.id} url={value?.name} alt={''} size="md" />
                  )}
                </Box>
              );
            case KEY_ITEM_NAME:
              return (
                <TextField fullWidth value={value} onChange={(e) => setValue(e.target.value)} onBlur={onBlur} sx={{ minWidth: 150 }} />
              );
            case KEY_ITEM_CODE:
              return <CodeGenerator menu={MENU_ITEM} value={value} onChange={(nVal: any) => setValue(nVal as string)} />;
            case KEY_ITEM_BASE_PRICE:
              return (
                <Stack spacing={1} direction="column">
                  <Stack spacing={1} direction="row">
                    <NumberFieldCurrency
                      sx={{ minWidth: 120 }}
                      onChageCurrency={(nVal: Currency) => {
                        const newValue = {
                          ...value,
                          currency: nVal?.code
                        };
                        setValue(newValue);

                        // update data to cell table
                        table.options.meta?.updateCellData(index, fieldId, newValue);

                        // set currency for other field
                        const cValue = original?.[KEY_ITEM_COST_PRICE];
                        const pValue = original?.[KEY_ITEM_PURCHASE_PRICE];

                        setTimeout(() => {
                          table.options.meta?.updateCellData(index, KEY_ITEM_COST_PRICE, { ...cValue, currency: newValue.currency });
                        }, 200);

                        setTimeout(() => {
                          table.options.meta?.updateCellData(index, KEY_ITEM_PURCHASE_PRICE, { ...pValue, currency: newValue.currency });
                        }, 400);
                      }}
                      currencyValue={value?.currency}
                      thousandSeparator=","
                      value={value?.amount || 0}
                      onChange={(nVal: string | number) => {
                        const newValue = {
                          ...value,
                          amount: parseFloat(nVal as string)
                        };
                        setValue(newValue);
                        let costPercent = 0;
                        if (costData?.value) {
                          costPercent = parseFloat(costData?.value as string);
                        }
                        let cValue = original?.[KEY_ITEM_COST_PRICE];
                        cValue = {
                          ...cValue,
                          amount: (newValue.amount * costPercent) / 100
                        };

                        // update data to cell table
                        table.options.meta?.updateCellData(index, fieldId, newValue);
                        setTimeout(() => {
                          table.options.meta?.updateCellData(index, KEY_ITEM_COST_PRICE, { ...cValue });
                        }, 200);
                      }}
                    />
                  </Stack>
                  <Stack spacing={1} direction="row">
                    {index == 0 ? (
                      <Button
                        variant="text"
                        color="primary"
                        size={'small'}
                        onClick={() => {
                          handleCopy(fieldId, value);
                          setTimeout(() => {
                            let cValue = original?.[KEY_ITEM_COST_PRICE];
                            handleCopy(KEY_ITEM_COST_PRICE, cValue);
                          }, 200);
                        }}
                      >{`Copy All`}</Button>
                    ) : null}
                  </Stack>
                </Stack>
              );
            case KEY_ITEM_COST_PRICE:
              const uPrice = original?.[KEY_ITEM_BASE_PRICE];
              return (
                <Stack spacing={1} direction="column">
                  <Stack spacing={1} direction="row">
                    <NumberFieldCurrency
                      currencyValue={value?.currency}
                      disabledCurrency={true}
                      onChageCurrency={(nVal: Currency) => {
                        const newValue = {
                          ...value,
                          currency: nVal?.code
                        };
                        setValue(newValue);

                        // update data to cell table
                        table.options.meta?.updateCellData(index, fieldId, newValue);
                      }}
                      sx={{ minWidth: 120 }}
                      thousandSeparator=","
                      value={value?.amount || 0}
                      onChange={(nVal: string | number) => {
                        const newValue = {
                          ...value,
                          amount: parseFloat(nVal as string)
                        };
                        setValue(newValue);

                        // update data to cell table
                        table.options.meta?.updateCellData(index, fieldId, newValue);
                      }}
                    />
                    {/* <CurrencySelect
                      disabled
                      value={value?.currency}
                      onChange={(nVal: Currency) => {
                        const newValue = {
                          ...value,
                          currency: nVal?.code
                        };
                        setValue(newValue);

                        // update data to cell table
                        table.options.meta?.updateCellData(index, fieldId, newValue);
                      }}
                    /> */}
                  </Stack>
                  <Stack spacing={1} direction="row">
                    {index == 0 ? (
                      <Button
                        variant="text"
                        color="primary"
                        size={'small'}
                        // startIcon={<ContentCopyOutlined fontSize="small" />}
                        onClick={() => {
                          handleCopy(fieldId, value);
                        }}
                      >{`Copy All`}</Button>
                    ) : null}
                  </Stack>
                </Stack>
              );
            case KEY_ITEM_PURCHASE_PRICE:
              return (
                <Stack spacing={1} direction="column">
                  <Stack spacing={1} direction="row">
                    <NumberFieldCurrency
                      currencyValue={value?.currency}
                      // disabledCurrency={true}
                      onChageCurrency={(nVal: Currency) => {
                        const newValue = {
                          ...value,
                          currency: nVal?.code
                        };
                        setValue(newValue);

                        // update data to cell table
                        table.options.meta?.updateCellData(index, fieldId, newValue);
                      }}
                      sx={{ minWidth: 120 }}
                      thousandSeparator=","
                      value={value?.amount || 0}
                      onChange={(nVal: string | number) => {
                        const newValue = {
                          ...value,
                          amount: parseFloat(nVal as string)
                        };
                        setValue(newValue);

                        // update data to cell table
                        table.options.meta?.updateCellData(index, fieldId, newValue);
                      }}
                    />
                  </Stack>
                  <Stack spacing={1} direction="row">
                    {index == 0 ? (
                      <Button
                        variant="text"
                        color="primary"
                        size={'small'}
                        // startIcon={<ContentCopyOutlined fontSize="small" />}
                        onClick={() => {
                          handleCopy(fieldId, value);
                        }}
                      >{`Copy All`}</Button>
                    ) : null}
                  </Stack>
                </Stack>
              );
            case KEY_ITEM_OPEN_STOCK:
              return (
                <Stack spacing={1} direction="column">
                  <Stack spacing={1} direction="row">
                    <NumberField
                      thousandSeparator=","
                      value={value || 0}
                      onChange={(nVal: string | number) => {
                        setValue(parseFloat(nVal as string));

                        // update data to cell table
                        table.options.meta?.updateCellData(index, fieldId, parseFloat(nVal as string));
                      }}
                    />
                  </Stack>
                  <Stack spacing={1} direction="row">
                    {index == 0 ? (
                      <Button
                        variant="text"
                        color="primary"
                        size={'small'}
                        // startIcon={<ContentCopyOutlined fontSize="small" />}
                        onClick={() => {
                          handleCopyNumber(fieldId, value as number);
                        }}
                      >{`Copy All`}</Button>
                    ) : null}
                  </Stack>
                </Stack>
              );
            case KEY_ITEM_REPLENISHMENT_POINT:
              return (
                <Stack spacing={1} direction="column">
                  <Stack spacing={1} direction="row">
                    <NumberField
                      thousandSeparator=","
                      value={value || 0}
                      onChange={(nVal: string | number) => {
                        setValue(parseFloat(nVal as string));

                        // update data to cell table
                        table.options.meta?.updateCellData(index, fieldId, parseFloat(nVal as string));
                      }}
                    />
                  </Stack>
                  <Stack spacing={1} direction="row">
                    {index == 0 ? (
                      <Button
                        variant="text"
                        color="primary"
                        size={'small'}
                        // startIcon={<ContentCopyOutlined fontSize="small" />}
                        onClick={() => {
                          handleCopyNumber(fieldId, value as number);
                        }}
                      >{`Copy All`}</Button>
                    ) : null}
                  </Stack>
                </Stack>
              );
            // case KEY_ITEM_SKU:
            // return (
            //   <SKU
            //     single
            //     value={value || []}
            //     onChange={(nVal: string | string[]) => {
            //       setValue(nVal);

            //       // update data to cell table
            //       table.options.meta?.updateCellData(index, fieldId, nVal);
            //     }}
            //     data={{
            //       ...original,
            //       itemName: original?.name || '',
            //       productName: prodData?.name || '',
            //       unitValName: original?.[KEY_ITEM_UNIT_VALUE]?.name || '',
            //       attributes: original?.attrValues
            //         ? Array.isArray(original?.attrValues)
            //           ? original?.attrValues
            //           : [original?.attrValues]
            //         : []
            //     }}
            //   ></SKU>
            // );
            case 'delete':
              return (
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => {
                    onDeleteItem(index);
                  }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              );
            default:
              return <TextField fullWidth value={value || ''} />;
          }
        };

        return getEditTableColumn(id);
      }
    };
  }, [costData]);

  const columnsEdittable = React.useMemo<ColumnDef<any>[]>(() => {
    const _columns: ColumnDef<any>[] = [
      {
        accessorKey: KEY_ITEM_IMAGES,
        width: '45px',
        align: 'center',
        header: ({ table }) => <TableHeadCell> <SpanLang keyLang="product_item_field_basic_images" textOnly /></TableHeadCell>
      } as ColumnDef<any>,
      {
        accessorKey: KEY_ITEM_NAME,
        header: ({ table }) => <TableHeadCell><SpanLang keyLang={'product_item_field_basic_name'} textOnly />*</TableHeadCell>
      },
      {
        accessorKey: KEY_ITEM_CODE,
        header: ({ table }) => <TableHeadCell><SpanLang keyLang={'product_item_field_basic_code'} textOnly /></TableHeadCell>
      }
    ];

    // Base prices,product_item_field_basic_unitprice
    prodData.canBeSold &&
      itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID &&
      _columns.push({
        accessorKey: KEY_ITEM_BASE_PRICE,
        header: ({ table }) => <TableHeadCell><SpanLang keyLang={'product_item_field_basic_unitprice'} textOnly />*</TableHeadCell>
      });

    // Cost prices //product_item_field_basic_basecost
    (prodData?.canBeSold || prodData?.type === PRODUCT_TYPE_PRODUCED) &&
      itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID &&
      _columns.push({
        accessorKey: KEY_ITEM_COST_PRICE,
        header: ({ table }) => <TableHeadCell><SpanLang keyLang={'product_item_field_basic_basecost'} textOnly />*</TableHeadCell>
      });

    // Purchase prices//ncrm_product_item_base_info_purchase_price
    !prodData?.canBeSold &&
      prodData?.type === PRODUCT_TYPE_PURCHASE &&
      _columns.push({
        accessorKey: KEY_ITEM_PURCHASE_PRICE,
        header: ({ table }) => <TableHeadCell><SpanLang keyLang={'ncrm_product_item_base_info_purchase_price'} textOnly />*</TableHeadCell>
      });

    // Open stock//product_item_field_basic_stockonhand	
    inventoryType === INVENTORY_TYPE_INVENTORY &&
      _columns.push({
        accessorKey: KEY_ITEM_OPEN_STOCK,
        header: ({ table }) => <TableHeadCell><SpanLang keyLang={'product_item_field_basic_stockonhand'} textOnly /></TableHeadCell>
      });

    // Replenishment//ncrm_product_item_base_info_replenishment_point
    inventoryType === INVENTORY_TYPE_INVENTORY &&
      _columns.push({
        accessorKey: KEY_ITEM_REPLENISHMENT_POINT,
        header: ({ table }) => <TableHeadCell><SpanLang keyLang={'ncrm_product_item_base_info_replenishment_point'} textOnly /></TableHeadCell>
      });

    // SKU
    // inventoryType === INVENTORY_TYPE_INVENTORY &&
    //   _columns.push({
    //     accessorKey: KEY_ITEM_SKU,
    //     header: ({ table }) => <TableHeadCell>SKU</TableHeadCell>
    //   });

    _columns.push({
      accessorKey: 'delete',
      width: '45px',
      header: ({ table }) => <TableHeadCell></TableHeadCell>
    } as ColumnDef<any>);

    return _columns;
  }, [prodData, itemType, inventoryType]);

  // const ReactEditTable = useMemo(() => {
  //   return  <ReactEditable8
  //   sx={{ '& .MuiTableRow-root': { verticalAlign: 'top' } }}
  //   editableColumn={editableColumn}
  //   columns={columnsEdittable}
  //   data={[...items]}
  //   setData={(newData: any) => handleTableOnChange(newData)}
  // />
  // }, [items]);

  const handleTableOnChange = (newData: any) => {
    // console.log('...handleTableOnChange...', newData);

    setItems(newData);
    onChange && onChange(newData);
  };

  // console.log('...WriteFieldsStep2...', value);
  return (
    <Box className="scroll-box" sx={{ width: '100%', overflowX: 'auto', maxHeight: `calc(100vh - 200px)` }}>
      {isFetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        // <ListTable sx={{ padding: 0, mb: 0, '& .MuiTableRow-root': { verticalAlign: 'top' } }} columns={tableColumns} rows={value} />
        <ReactEditable8
          sx={{ '& .MuiTableRow-root': { verticalAlign: 'top' } }}
          editableColumn={editableColumn}
          columns={columnsEdittable}
          data={[...items]}
          setData={(newData: any) => handleTableOnChange(newData)}
        />
      )}
    </Box>
  );
};

export default WriteFieldsStep2;
