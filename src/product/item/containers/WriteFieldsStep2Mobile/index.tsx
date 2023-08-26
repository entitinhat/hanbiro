import { Item, ProductItem } from '@product/item/types/item';
import CodeGenerator from '@base/containers/CodeGenerator';
import { MENU_ITEM } from '@base/config/menus';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  styled,
  Theme
} from '@mui/material';
import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from 'react';
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
import { useItemCodes } from '@product/item/hooks/useItemCodes';
import { Product } from '@product/product/types/product';
import { ContentCopyOutlined, Delete } from '@mui/icons-material';
import NumberField from '@base/components/@hanbiro/NumberField';
import CurrencySelect from '@base/components/@hanbiro/CurrencySelect';
// import { Currency } from '@settings/general/types/interface';
// import SKU from '../Sku';
import React from 'react';
import { Currency } from '@base/types/common';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageUpload from '../ImageUpload';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import NumberFieldCurrency from '@base/components/@hanbiro/NumberFieldCurrency';
import { useProductGeneralSetting } from '@settings/preferences/hooks/product/useProductGeneralSetting';
import SpanLang from '@base/components/@hanbiro/SpanLang';

interface WriteFieldsStep2Props {
  value: ProductItem[];
  itemType: string;
  inventoryType: string;
  prodData: Product;
  onChange: (value: ProductItem[]) => void;
}

const ItemsContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiAccordion-root': {
    // border: 'none !important',
    border: ` 1px solid !important`,
    borderRadius: 4,
    borderColor: `${theme.palette.divider} !important`,
    '& .MuiAccordionSummary-root': {
      backgroundColor: 'transparent !important',
      flexDirection: 'row !important',
      '& .MuiAccordionSummary-content': {
        marginLeft: 0
      }
      // '& .MuiAccordionSummary-expandIconWrapper': {
      //   display: 'none'
      // }
    },
    '& .MuiAccordionDetails-root': {
      border: 'none !important',
      padding: 8,
      paddingTop: 0
    },
    '& .Mui-expanded': {
      color: `${theme.palette.primary.main} !important`
    }
  }
}));

const WriteFieldsStep2 = (props: WriteFieldsStep2Props) => {
  const { value, onChange, itemType, inventoryType, prodData } = props;

  const [items, setItems] = useState<ProductItem[]>([]);
  const [codes, setCodes] = useState<string[]>([]);
  const theme = useTheme();
  //get data
  const params = {
    key: 'cost_of_good',
    menu: 'product'
  };
  const { data: costData } = useProductGeneralSetting(params);
  const {
    data: nextIdData,
    isLoading,
    isFetching
  } = useItemCodes({
    itemsLength: value?.length,
    opts: { enabled: codes?.length == 0 }
  });
  // console.log('isFetching: ', isFetching);

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

  useLayoutEffect(() => {
    if (!_.isEqual(value, items)) {
      setItems(value);
    }
  }, [value]);

  // onChange
  const onChangeKeyVal = (keyName: any, newValue: any, row: number) => {
    // console.log('table before: ', items);
    const newRow = {
      ...items[row],
      [keyName]: newValue
    };

    items[row] = newRow;
    const newData = [...items];
    // console.log('table after: ', newData);

    setItems(newData);
    onChange && onChange(newData);
  };

  //copy amount to all row
  const handleCopy = (fieldId: string, cValue: any) => {
    const newData: any[] = [];
    items?.map((row: any, rIdx: number) => {
      newData.push({
        ...row,
        [fieldId]: {
          ...row[fieldId],
          amount: cValue?.amount
        }
      });
    });

    onChange && onChange(newData);
  };

  const handleCopyNumber = (fieldId: string, cValue: number) => {
    const newData: any[] = [];
    items.map((row: any, rIdx: number) => {
      newData.push({
        ...row,
        [fieldId]: cValue
      });
    });

    onChange && onChange(newData);
  };

  const onDeleteItem = (rIndex: number) => {
    const newData = [...items];
    newData.splice(rIndex, 1);
    onChange && onChange(newData);
  };

  const getEditTableColumn = (fieldId: string, row: number) => {
    switch (fieldId) {
      case KEY_ITEM_IMAGES:
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {itemType === PRODUCT_ITEM_TYPE_ENUM_GENERAL ? (
              <ImageUpload
                sx={{ width: '200px', height: '200px' }}
                file={items[row][fieldId]}
                setFieldValue={(field: string, value: any) => {
                  // setValue(value);
                  onChangeKeyVal(fieldId, value, row);
                  // table.options.meta?.updateCellData(index, id, value);
                }}
              />
            ) : (
              <IconAvatar
                showType="image"
                variant="rounded"
                id={items[row][fieldId]?.id}
                url={items[row][fieldId]?.name}
                alt={''}
                size="md"
              />
            )}
          </Box>
        );
      case KEY_ITEM_NAME:
        return (
          <TextField
            fullWidth
            name={KEY_ITEM_NAME}
            value={items[row][fieldId]}
            onChange={(e) => onChangeKeyVal(fieldId, e.target.value, row)}
            sx={{ minWidth: 150 }}
          />
        );
      case KEY_ITEM_CODE:
        return (
          <CodeGenerator
            menu={MENU_ITEM}
            value={items[row][fieldId]}
            onChange={(nVal: any) => onChangeKeyVal(fieldId, nVal as string, row)}
          />
        );
      case KEY_ITEM_BASE_PRICE:
        return (
          <Stack spacing={1} direction="column">
            <Stack spacing={1} direction="row">
              <NumberFieldCurrency
                currencyValue={items[row][fieldId]?.currency}
                onChageCurrency={(nVal: Currency) => {
                  const newValue = {
                    ...items[row][fieldId],
                    currency: nVal?.code
                  };
                  // setValue(newValue);
                  onChangeKeyVal(KEY_ITEM_BASE_PRICE, newValue, row);

                  // set currency for other field
                  const cValue = items[row]?.[KEY_ITEM_COST_PRICE];
                  // const pValue = items[row]?.[KEY_ITEM_PURCHASE_PRICE];
                  onChangeKeyVal(KEY_ITEM_COST_PRICE, { ...cValue, currency: newValue.currency }, row);
                }}
                sx={{ minWidth: 120 }}
                thousandSeparator=","
                value={items[row][fieldId]?.amount || 0}
                onChange={(nVal: string | number) => {
                  // console.log('value before change: ', value);
                  const newValue = {
                    ...items[row][fieldId],
                    amount: parseFloat(nVal as string)
                  };

                  let costPercent = 0;
                  if (costData?.value) {
                    costPercent = parseFloat(costData?.value as string);
                  }
                  let cValue = items[row]?.[KEY_ITEM_COST_PRICE];
                  cValue = {
                    ...cValue,
                    amount: (newValue.amount * costPercent) / 100
                  };
                  // console.log('value after change: ', newValue);
                  // setValue(newValue);
                  onChangeKeyVal(KEY_ITEM_BASE_PRICE, newValue, row);
                  onChangeKeyVal(KEY_ITEM_COST_PRICE, { ...cValue }, row);
                }}
              />
              {/* <CurrencySelect
                value={items[row][fieldId]?.currency}
                onChange={(nVal: Currency) => {
                  const newValue = {
                    ...items[row][fieldId],
                    currency: nVal?.code
                  };
                  // setValue(newValue);
                  onChangeKeyVal(KEY_ITEM_BASE_PRICE, newValue, row);

                  // set currency for other field
                  // const cValue = items[row]?.[KEY_ITEM_COST_PRICE];
                  // const pValue = items[row]?.[KEY_ITEM_PURCHASE_PRICE];
                }}
              /> */}
            </Stack>
            <Stack spacing={1} direction="row">
              {row == 0 ? (
                <Button
                  variant="text"
                  color="primary"
                  size={'small'}
                  // startIcon={<ContentCopyOutlined fontSize="small" />}
                  onClick={() => {
                    handleCopy(fieldId, items[row][fieldId]);
                  }}
                >{`Copy All`}</Button>
              ) : null}
            </Stack>
          </Stack>
        );
      case KEY_ITEM_COST_PRICE:
        return (
          <Stack spacing={1} direction="column">
            <Stack spacing={1} direction="row">
              <NumberFieldCurrency
                currencyValue={items[row][fieldId]?.currency}
                onChageCurrency={(nVal: Currency) => {
                  const newValue = {
                    ...items[row][fieldId],
                    currency: nVal?.code
                  };
                  // setValue(newValue);
                  onChangeKeyVal(KEY_ITEM_COST_PRICE, newValue, row);
                }}
                disabledCurrency={true}
                sx={{ minWidth: 120 }}
                thousandSeparator=","
                value={items[row][fieldId]?.amount || 0}
                onChange={(nVal: string | number) => {
                  const newValue = {
                    ...items[row][fieldId],
                    amount: parseFloat(nVal as string)
                  };
                  // setValue(newValue);
                  onChangeKeyVal(KEY_ITEM_COST_PRICE, newValue, row);
                }}
              />
              {/* <CurrencySelect
                disabled
                value={items[row][fieldId]?.currency}
                onChange={(nVal: Currency) => {
                  const newValue = {
                    ...items[row][fieldId],
                    currency: nVal?.code
                  };
                  // setValue(newValue);
                  onChangeKeyVal(KEY_ITEM_COST_PRICE, newValue, row);
                }}
              /> */}
            </Stack>
            <Stack spacing={1} direction="row">
              {row == 0 ? (
                <Button
                  variant="text"
                  color="primary"
                  size={'small'}
                  // startIcon={<ContentCopyOutlined fontSize="small" />}
                  onClick={() => {
                    handleCopy(fieldId, items[row][fieldId]);
                  }}
                >{`Copy All`}</Button>
              ) : null}
            </Stack>
          </Stack>
        );

      //TODO: Covert this component to numberfield Currency
      case KEY_ITEM_PURCHASE_PRICE:
        return (
          <Stack spacing={1} direction="column">
            <Stack spacing={1} direction="row">
              <NumberFieldCurrency
                currencyValue={items[row][fieldId]?.currency}
                onChageCurrency={(nVal: Currency) => {
                  const newValue = {
                    ...items[row][fieldId],
                    currency: nVal?.code
                  };
                  // setValue(newValue);
                  onChangeKeyVal(KEY_ITEM_PURCHASE_PRICE, newValue, row);
                }}
                sx={{ minWidth: 120 }}
                thousandSeparator=","
                value={items[row][fieldId]?.amount || 0}
                onChange={(nVal: string | number) => {
                  const newValue = {
                    ...items[row][fieldId],
                    amount: parseFloat(nVal as string)
                  };
                  // setValue(newValue);
                  onChangeKeyVal(KEY_ITEM_PURCHASE_PRICE, newValue, row);
                }}
              />
              {/* <CurrencySelect
                disabled
                value={items[row][fieldId]?.currency}
                onChange={(nVal: Currency) => {
                  const newValue = {
                    ...items[row][fieldId],
                    currency: nVal?.code
                  };
                  // setValue(newValue);
                  onChangeKeyVal(KEY_ITEM_PURCHASE_PRICE, newValue, row);
                }}
              /> */}
            </Stack>
            <Stack spacing={1} direction="row">
              {row == 0 ? (
                <Button
                  variant="text"
                  color="primary"
                  size={'small'}
                  // startIcon={<ContentCopyOutlined fontSize="small" />}
                  onClick={() => {
                    handleCopy(fieldId, items[row][fieldId]);
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
                value={items[row][fieldId] || 0}
                onChange={(nVal: string | number) => {
                  // setValue(parseFloat(nVal as string));
                  onChangeKeyVal(KEY_ITEM_OPEN_STOCK, parseFloat(nVal as string), row);
                }}
              />
            </Stack>
            <Stack spacing={1} direction="row">
              {row == 0 ? (
                <Button
                  variant="text"
                  color="primary"
                  size={'small'}
                  // startIcon={<ContentCopyOutlined fontSize="small" />}
                  onClick={() => {
                    handleCopyNumber(fieldId, items[row][fieldId] as number);
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
                value={items[row][fieldId] || 0}
                onChange={(nVal: string | number) => {
                  // setValue(parseFloat(nVal as string));
                  onChangeKeyVal(KEY_ITEM_REPLENISHMENT_POINT, parseFloat(nVal as string), row);
                }}
              />
            </Stack>
            <Stack spacing={1} direction="row">
              {row == 0 ? (
                <Button
                  variant="text"
                  color="primary"
                  size={'small'}
                  // startIcon={<ContentCopyOutlined fontSize="small" />}
                  onClick={() => {
                    handleCopyNumber(fieldId, items[row][fieldId] as number);
                  }}
                >{`Copy All`}</Button>
              ) : null}
            </Stack>
          </Stack>
        );
      // case KEY_ITEM_SKU:
      //   return (
      //     <SKU
      //       single
      //       value={items[row][fieldId] || []}
      //       onChange={(nVal: string | string[]) => {
      //         // setValue(nVal);
      //         onChangeKeyVal(KEY_ITEM_SKU, nVal, row);
      //       }}
      //       data={{
      //         ...items[row],
      //         itemName: items[row]?.name || '',
      //         productName: prodData?.name || '',
      //         unitValName: items[row]?.[KEY_ITEM_UNIT_VALUE]?.name || '',
      //         attributes: items[row]?.attrValues
      //           ? Array.isArray(items[row]?.attrValues)
      //             ? items[row]?.attrValues
      //             : [items[row]?.attrValues]
      //           : []
      //       }}
      //     ></SKU>
      //   );
      case 'delete':
        return (
          <Button
            color="error"
            size="small"
            onClick={() => {
              onDeleteItem(row);
            }}
            startIcon={<Delete />}
          >
            Delete Row
          </Button>
        );
      default:
        return <TextField fullWidth value={value || ''} />;
    }
  };

  const columnsEdittable = React.useMemo<ColumnDef<any>[]>(() => {
    const _columns: any[] = [
      // {
      //   accessorKey: 'delete',
      //   width: '45px',
      //   header: <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}></Typography>
      // },
      {
        accessorKey: KEY_ITEM_IMAGES,
        header: (
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            <SpanLang keyLang="product_item_field_basic_images" textOnly />
          </Typography>
        )
      },
      {
        accessorKey: KEY_ITEM_NAME,
        header: (
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            <SpanLang keyLang={'product_item_field_basic_name'} textOnly />*
          </Typography>
        )
      },
      {
        accessorKey: KEY_ITEM_CODE,
        header: (
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            <SpanLang keyLang={'product_item_field_basic_code'} textOnly />
          </Typography>
        )
      }
    ];

    // Base prices
    prodData.canBeSold &&
      itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID &&
      _columns.push({
        accessorKey: KEY_ITEM_BASE_PRICE,
        header: (
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            <SpanLang keyLang={'product_item_field_basic_unitprice'} textOnly />*
          </Typography>
        )
      });

    // Cost prices
    (prodData?.canBeSold || prodData?.type === PRODUCT_TYPE_PRODUCED) &&
      itemType != PRODUCT_ITEM_TYPE_ENUM_PREPAID &&
      _columns.push({
        accessorKey: KEY_ITEM_COST_PRICE,
        header: (
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            <SpanLang keyLang={'product_item_field_basic_basecost'} textOnly />*
          </Typography>
        )
      });

    // Purchase prices
    !prodData?.canBeSold &&
      prodData?.type === PRODUCT_TYPE_PURCHASE &&
      _columns.push({
        accessorKey: KEY_ITEM_PURCHASE_PRICE,
        header: (
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            <SpanLang keyLang={'ncrm_product_item_base_info_purchase_price'} textOnly />*
          </Typography>
        )
      });

    // Open stock
    inventoryType === INVENTORY_TYPE_INVENTORY &&
      _columns.push({
        accessorKey: KEY_ITEM_OPEN_STOCK,
        header: (
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            <SpanLang keyLang={'product_item_field_basic_stockonhand'} textOnly />
          </Typography>
        )
      });

    // Replenishment
    inventoryType === INVENTORY_TYPE_INVENTORY &&
      _columns.push({
        accessorKey: KEY_ITEM_REPLENISHMENT_POINT,
        header: (
          <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>
            <SpanLang keyLang={'ncrm_product_item_base_info_replenishment_point'} textOnly />
          </Typography>
        )
      });

    // // SKU
    // inventoryType === INVENTORY_TYPE_INVENTORY &&
    //   _columns.push({
    //     accessorKey: KEY_ITEM_SKU,
    //     header: <Typography sx={{ fontWeight: theme.typography.fontWeightMedium }}>SKU</Typography>
    //   });

    return _columns;
  }, [prodData, itemType, inventoryType]);

  // console.log('columnsEdittable: ', columnsEdittable);
  // console.log('items: ', items);
  // console.log('value: ', value);
  // console.log('codes: ', codes);

  const mainMemo = useMemo(() => {
    return (
      <ItemsContainer p={1}>
        {items.map((item: any, row: number) => (
          <Accordion key={row} defaultExpanded sx={{ mb: 1 }}>
            <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" sx={{}}>
              <Stack width="100%" direction="row" spacing={1.25} alignItems="center">
                <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="subtitle1" color="textPrimary" sx={{ textTransform: 'capitalize' }}>
                    {`Item ${row + 1}:`}
                  </Typography>

                  <Button
                    color="error"
                    size="small"
                    onClick={() => {
                      onDeleteItem(row);
                    }}
                    startIcon={<Delete />}
                    sx={{ mr: 1 }}
                  >
                    Delete Row
                  </Button>
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              {columnsEdittable.map((column: any, colIndex: number) => (
                <Stack spacing={3} key={colIndex}>
                  <Box pt={1}>
                    {column.header}
                    {getEditTableColumn(column.accessorKey, row)}
                  </Box>
                </Stack>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </ItemsContainer>
    );
  }, [columnsEdittable, items]);
  return (
    <Box sx={{ width: '100%' }}>
      {isFetching ? (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>{mainMemo}</>
      )}
    </Box>
  );
};

export default WriteFieldsStep2;
