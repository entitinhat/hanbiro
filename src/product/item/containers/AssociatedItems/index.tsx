import React, { useEffect, useMemo, useState } from 'react';

import { currencySymbol, moneyFormat, nanoid } from '@base/utils/helpers';
import { ProductItemQuickView } from '@base/containers/QuickView';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import ItemAutoComplete from '@product/item/containers/ItemAutoComplete';
import { Add, Delete, Edit, Save } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputLabel,
  Paper,
  Stack,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import LoadingButton from '@base/components/@extended/LoadingButton';
import useSnackBar from '@base/hooks/useSnackBar';
import useAssociatedItems from '@product/item/hooks/useAssociatedItems';
import _ from 'lodash';
import { useItemMutation } from '@product/item/hooks/useItemMutation';
import { queryKeys } from '@product/item/config/queryKeys';
import { Item } from '@product/item/types/item';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import * as keyNames from '@product/item/config/keyNames';
import { ColumnDef } from '@tanstack/react-table';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { PRODUCT_ITEM_TYPE_ENUM_GENERAL } from '@product/main/config/constants';

interface AssociatedItemsProps {
  value: any[];
  onChange?: (nVal: any[]) => void;
  itemId?: string;
  isWriteForm?: boolean;
}

const TableHeadCell = styled(Box)({
  fontSize: '14px !important',
  textTransform: 'capitalize',
  whiteSpace: 'nowrap'
});

const AssociatedItems = (props: AssociatedItemsProps) => {
  const { value = [], onChange, itemId = '', isWriteForm = false } = props;

  const theme = useTheme();

  const { enqueueErrorBar, enqueueSuccessBar } = useSnackBar();

  // const queryClient = useQueryClient();

  const defaultItem = {
    id: nanoid(),
    item: null,
    image: null,
    sku: [],
    unit_name: '',
    unit_qty: '',
    contained_qty: 0,
    base_price: [],
    cost_price: [],
    best_price: [],
    unit_price: [],
    actions: { canRemove: true }
  };

  //state
  const [items, setItems] = useState<any>([{ ...defaultItem }]);
  const [itemTotal, setItemTotal] = useState<any>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(isWriteForm);
  const [oldItems, setOldItems] = useState<any[]>([]);

  // get init data
  const { data, isLoading } = useAssociatedItems({ menuSourceId: itemId });

  const { mUpdate } = useItemMutation([queryKeys.listAssociatedItem]);

  useEffect(() => {
    if (data?.associatedItems) {
      const newItems: any[] = [];
      data?.associatedItems?.map((item: any, index: number) => {
        newItems.push({
          id: item?.item?.id,
          item: { ...item?.item },
          sku: item?.item?.sku,
          unit_name: item?.item?.unitVal?.name,
          unit_qty: item?.item?.unitVal?.qty,
          attrValues: item?.item?.attrValues ?? [],
          contained_qty: item?.qty,
          base_price: item?.item?.basePrice ? [item?.item?.basePrice] : [],
          cost_price: item?.item?.costPrice ? [item?.item?.costPrice] : [],
          best_price: item?.item?.bestPrice ? [item?.item?.bestPrice] : [],
          unit_price: item?.item?.unitPrice ? [item?.item?.unitPrice] : []
        });
      });
      setItems(newItems);
      setOldItems(newItems);
    } else {
      setItems([]);
      setOldItems([]);
    }
  }, [data]);

  // // mutation
  // const mUpdateItemUnit: any = useMutationPost<BaseResponse<string>>(
  //   PRODUCT_ITEM_UNIT_UPDATE,
  //   'product_updateItem',
  //   {
  //     onMutate: () => {
  //       setIsSaving(true);
  //     },
  //     onSuccess: (res: any) => {
  //       setIsSaving(false);
  //       toast.success('Updated successfully!');
  //       setTimeout(() => {
  //         queryClient.invalidateQueries(['product_item']);
  //       }, 500);
  //     },
  //     onError: (error: any) => {
  //       setIsSaving(false);
  //       toast.warning('Updated failed');
  //     },
  //   },
  // );

  // onchange
  useEffect(() => {
    // calculate total
    calPriceTotal();
    // callback
    onChange && onChange(items);
  }, [items]);

  // total
  const calPriceTotal = () => {
    const newItemTotal: any = {
      base_price: [],
      cost_price: [],
      best_price: [],
      unit_price: []
    };
    items.map((item: any, index: number) => {
      // total base price by currency
      item?.base_price?.map((price: any) => {
        // find value with same currency
        const idx = newItemTotal.base_price.findIndex((el: any) => el.currency === price.currency);
        if (idx >= 0) {
          newItemTotal.base_price[idx].amount += parseFloat(price.amount) * item?.contained_qty ?? 0;
        } else {
          newItemTotal.base_price.push({
            amount: parseFloat(price.amount) * item?.contained_qty ?? 0,
            currency: price.currency
          });
        }
      });

      // total cost price by currency
      item?.cost_price?.map((price: any) => {
        //find value with same currency
        const idx = newItemTotal.cost_price.findIndex((el: any) => el.currency === price.currency);
        if (idx > -1) {
          newItemTotal.cost_price[idx].amount += parseFloat(price.amount) * item?.contained_qty ?? 0;
        } else {
          newItemTotal.cost_price.push({
            amount: parseFloat(price.amount) * item?.contained_qty ?? 0,
            currency: price.currency
          });
        }
      });

      // total cost price by currency
      item?.best_price?.map((price: any) => {
        //find value with same currency
        const idx = newItemTotal.best_price.findIndex((el: any) => el.currency === price.currency);
        if (idx > -1) {
          newItemTotal.best_price[idx].amount += parseFloat(price.amount) * item?.contained_qty ?? 0;
        } else {
          newItemTotal.best_price.push({
            amount: parseFloat(price.amount) * item?.contained_qty ?? 0,
            currency: price.currency
          });
        }
      });

      // total cost price by currency
      item?.unit_price?.map((price: any) => {
        //find value with same currency
        const idx = newItemTotal.unit_price.findIndex((el: any) => el.currency === price.currency);
        if (idx > -1) {
          newItemTotal.unit_price[idx].amount += parseFloat(price.amount) * item?.contained_qty ?? 0;
        } else {
          newItemTotal.unit_price.push({
            amount: parseFloat(price.amount) * item?.contained_qty ?? 0,
            currency: price.currency
          });
        }
      });
    });

    setItemTotal(newItemTotal);
  };

  //add new default item
  const handleAddItem = () => {
    const newItems: any = _.cloneDeep(items);
    newItems.push(defaultItem);
    setItems(newItems);
  };

  //remove item
  const handleRemoveItem = (index: number) => {
    const newItems = _.cloneDeep(items);
    newItems.splice(index, 1);
    setItems(newItems);
  };

  //item change
  const handleItemChange = (item: any, index: number) => {
    const newItems: any = _.cloneDeep(items);
    // check exist
    const idx = newItems.findIndex((el: any) => el?.item?.id === item?.id);
    // console.log('item product', item);
    if (idx === -1) {
      newItems[index].item = item;
      newItems[index].images = item?.images;
      newItems[index].sku = item?.sku ?? [];
      newItems[index].unit_name = item?.unitVal?.name ?? '';
      newItems[index].unit_qty = item?.unitVal?.qty ?? '';
      newItems[index].contained_qty = item?.id ? 1 : 0;
      newItems[index].base_price = item?.basePrice ? [item?.basePrice] : [];
      newItems[index].cost_price = item?.costPrice ? [item?.costPrice] : [];
      newItems[index].best_price = item?.bestPrice ? [item?.bestPrice] : [];
      newItems[index].unit_price = item?.unitPrice ? [item?.unitPrice] : [];
      newItems[index].attrValues = item?.attrValues ?? [];
      setItems(newItems);
    } else {
      enqueueErrorBar('Item already selected');
    }
  };

  // Qty change
  const handleContainedQtyChange = (value: any, index: number) => {
    const newItems: any = _.cloneDeep(items);
    newItems[index].contained_qty = parseInt(value);
    setItems(newItems);
  };

  const isValid = useMemo(() => {
    let _isValid = true;
    items?.map((item: any) => {
      if (!item.item || !item.contained_qty) {
        _isValid = false;
      }
    });
    return _isValid;
  }, [items]);

  const handleOnSave = () => {
    const associatedItems: any[] = [];
    const newItems = _.cloneDeep(items);

    newItems?.map((item: any) => {
      if (item?.item?.id && item?.item?.id != '') {
        associatedItems.push({
          item: { id: item?.item?.id, name: item?.item?.name },
          qty: item?.contained_qty
        });
      }
    });
    const params: Item = {
      id: itemId,
      associatedItems: associatedItems?.length > 0 ? associatedItems : null
    };
    mUpdate.mutate(
      { item: params },
      {
        onMutate() {
          setIsSaving && setIsSaving(true);
        },
        onSuccess(data: any, variables: any, context: any) {
          setIsSaving && setIsSaving(false);
          setShowEdit(false);
          setOldItems(newItems);
        },
        onError(error: any, variables: any, context: any) {
          setIsSaving && setIsSaving(false);
        }
      }
    );
  };

  //=======================================================================Debug==================================================================
  console.log('Associated Items', items);
  //=================================================================================================================================

  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: keyNames.KEY_ITEM_IMAGES,
        width: '50px',
        header: () => <SpanLang keyLang={'product_item_field_basic_images'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_IMAGES,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          const mainImage: any = row?.original?.item?.[keyNames.KEY_ITEM_IMAGES]?.[0] ?? null;
          return <IconAvatar showType="image" variant="rounded" id={mainImage?.id} url={mainImage?.name} alt={''} size="md" />;
        }
      },
      {
        id: keyNames.KEY_ITEM_NAME,
        header: () => <SpanLang keyLang={'product_item_field_basic_name'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_NAME,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <ProductItemQuickView value={{ id: row?.original?.item?.id, name: row?.original?.item?.name }} />;
        }
      },
      {
        id: 'contained_qty',
        header: () => <SpanLang keyLang={'ncrm_product_item_base_info_contained_qty'} textOnly />,
        accessorKey: 'contained_qty',
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <Typography noWrap>{row?.original?.contained_qty ?? ''}</Typography>;
        }
      },
      {
        id: keyNames.KEY_ITEM_UNIT_VALUE,
        header: () => <SpanLang keyLang={'product_item_field_basic_unitval'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_UNIT_VALUE,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <Typography noWrap>{row?.original?.item?.unitVal?.name ?? ''}</Typography>;
        }
      },
      {
        id: keyNames.KEY_ITEM_UNIT_VALUE_QTY,
        header: () => <SpanLang keyLang={'product_item_field_basic_unitvalqty'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_UNIT_VALUE_QTY,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <Typography noWrap>{row?.original?.item?.unitVal?.qty ?? ''}</Typography>;
        }
      },
      {
        id: keyNames.KEY_ITEM_ATTR_VALUES,
        header: () => <SpanLang keyLang={'product_item_field_basic_attrvalues'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_ATTR_VALUES,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          const items: any[] =
            row?.original?.item?.attrValues?.map((item: any) => ({
              id: item?.id,
              name: [item?.attr?.name, item?.name].join(':')
            })) ?? [];
          // return items.length > 0 ? <ListTableCellDroplist showAvatar={false} values={items} /> : '';
          return items.length > 0 ? (
            <Stack direction={'row'}>
              {items?.map((item: any, index: number) => (
                <Typography noWrap key={index}>{`${item?.name}`}</Typography>
              ))}
            </Stack>
          ) : (
            ''
          );
        }
      },
      {
        id: keyNames.KEY_ITEM_UNIT_PRICE,
        header: () => <SpanLang keyLang={'product_item_field_basic_unitprice'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_UNIT_PRICE,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          // let items: any[] = row?.original?.item?.unitPrice ?? [];
          // items = items
          //   ? items?.map((price: any) => ({
          //       id: price?.currency,
          //       name: moneyFormat(price?.amount ?? 0, price?.currency)
          //     }))
          //   : [];
          // return items.length > 0 ? <ListTableCellDroplist showAvatar={false} values={items} /> : '';
          const unitPrice = row?.original?.item?.unitPrice ?? null;
          return <Typography noWrap>{moneyFormat(unitPrice?.amount ?? 0, unitPrice?.currency) ?? ''}</Typography>;
        }
      },
      {
        id: keyNames.KEY_ITEM_COST_PRICE,
        header: () => <SpanLang keyLang={'product_item_field_basic_basecost'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_COST_PRICE,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          // let items: any[] = row?.original?.item?.costPrice ?? [];
          // items = items
          //   ? items?.map((price: any) => ({
          //       id: price?.currency,
          //       name: moneyFormat(price?.amount ?? 0, price?.currency)
          //     }))
          //   : [];
          // return items.length > 0 ? <ListTableCellDroplist showAvatar={false} values={items} /> : '';
          const costPrice = row?.original?.item?.costPrice ?? null;
          return <Typography noWrap>{moneyFormat(costPrice?.amount ?? 0, costPrice?.currency) ?? ''}</Typography>;
        }
      }
    ],
    []
  );

  const listTableProps: ListTableProps = {
    rows: items || [],
    // checkedIds,
    // onRowChecked: onChecked,
    // pagingProps,
    // onPageChange: handlePagingChange,
    columns: tableColumns,
    onSortBy: (clName: any, isSorted: any) => {
      // if (isSorted !== false) {
      //   let orderBy = isSorted === 'desc' ? DESC : ASC;
      //   setSort({ field: clName, orderBy: orderBy });
      // }
    }
  };

  const tableView = () => {
    return <ListTable {...listTableProps} sx={{ px: 0, mb: 0 }} />;
  };

  return (
    <Box className="scroll-box" sx={{ border: `1px solid ${theme.palette.divider}`, borderBottom: 0 }}>
      <Box sx={{ p: 2, borderBottom: 0 }}>
        {itemId == '' && (
          <InputLabel>
            <SpanLang sx={{ fontWeight: theme.typography.fontWeightMedium }} keyLang="product_item_field_basic_associateditems" textOnly />
          </InputLabel>
        )}
        {itemId != '' && (
          <Stack spacing={1} direction="row" justifyContent="flex-end" alignItems="center" sx={{ p: 0 }}>
            {itemId != '' && !showEdit && (
              <Button
                variant="outlined"
                onClick={() => {
                  setShowEdit(true);
                }}
                color={'secondary'}
                startIcon={<Edit />}
                size={'small'}
              >
                <SpanLang keyLang="ncrm_common_btn_edit" textOnly />
              </Button>
            )}
            {/* Save/Close button */}
            {itemId != '' && showEdit && (
              <Button
                size="small"
                color="secondary"
                variant="outlined"
                onClick={() => {
                  setShowEdit(false);
                  setItems(oldItems);
                }}
              >
                <SpanLang keyLang="ncrm_common_btn_cancel" textOnly />
              </Button>
            )}
            {itemId != '' && showEdit && (
              <LoadingButton
                loading={isSaving}
                variant="contained"
                loadingPosition="start"
                startIcon={<></>}
                onClick={handleOnSave}
                disabled={!isValid}
                size={'small'}
              >
                <SpanLang keyLang="ncrm_common_btn_save" textOnly />
              </LoadingButton>
            )}
          </Stack>
        )}
      </Box>

      {/* Table */}
      {!showEdit && tableView()}

      <TableContainer component={Paper} sx={{ boxShadow: 'none', border: `none` }}>
        <Table
          size="medium"
          sx={{
            boxShadow: 'none',
            borderBottom: `1px solid ${theme.palette.divider}`
          }}
        >
          <TableHead sx={{ borderTop: 0, borderBottom: `1px solid ${theme.palette.divider}`, ...(!showEdit && { visibility: 'hidden' }) }}>
            <TableRow>
              <TableCell component="th">
                <TableHeadCell>
                  <SpanLang keyLang="product_item_field_basic_images" textOnly />
                </TableHeadCell>
              </TableCell>
              <TableCell component="th">
                <TableHeadCell>
                  <SpanLang keyLang="product_item_field_basic_name" textOnly />
                  <Box component="span" sx={{ ml: 1, color: 'error.main' }}>
                    *
                  </Box>
                </TableHeadCell>
              </TableCell>
              <TableCell component="th">
                <TableHeadCell>
                  <SpanLang keyLang="ncrm_product_item_base_info_contained_qty" textOnly />
                  <Box component="span" sx={{ ml: 1, color: 'error.main' }}>
                    *
                  </Box>
                </TableHeadCell>
              </TableCell>
              <TableCell component="th">
                <TableHeadCell>
                  <SpanLang keyLang="product_item_field_basic_unitval" textOnly />
                </TableHeadCell>
              </TableCell>
              <TableCell component="th">
                <TableHeadCell>
                  <SpanLang keyLang="product_item_field_basic_unitvalqty" textOnly />
                </TableHeadCell>
              </TableCell>
              <TableCell component="th">
                <TableHeadCell>
                  <SpanLang keyLang="product_item_field_basic_attrvalues" textOnly />
                </TableHeadCell>
              </TableCell>
              <TableCell component="th">
                <TableHeadCell>
                  <SpanLang keyLang="product_item_field_basic_unitprice" textOnly />
                </TableHeadCell>
              </TableCell>
              <TableCell component="th">
                <TableHeadCell>
                  <SpanLang keyLang="product_item_field_basic_basecost" textOnly />
                </TableHeadCell>
              </TableCell>
              {(showEdit || itemId == '') && (
                <TableCell align="center">
                  <TableHeadCell></TableHeadCell>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {showEdit && (
              <>
                {items.map((item: any, index: number) => {
                  // const sku = item?.sku ? item?.sku?.map((sku: string) => ({ id: sku, name: sku })) : [];
                  let image = { id: '', name: '' };
                  const attrValues: any[] =
                    item?.attrValues?.map((item: any) => ({
                      id: item?.id,
                      name: [item?.attr?.name, item?.name].join(':')
                    })) ?? [];
                  if (item?.images) {
                    image = item?.images[0];
                  }

                  return (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <IconAvatar showType="image" variant="rounded" id={image?.id} url={image?.name} alt={''} size="md" />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {showEdit || itemId == '' ? (
                          <ItemAutoComplete
                            single={true}
                            type={PRODUCT_ITEM_TYPE_ENUM_GENERAL}
                            // showAllOption={true}
                            // addLabel={'Add Item'}
                            excludes={items.map((ele: any) => ele?.item?.id || '')}
                            onChange={(item: any) => handleItemChange(item, index)}
                            value={item?.item}
                          />
                        ) : (
                          <ProductItemQuickView value={{ id: item?.item?.id, name: item?.item?.name }} />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {showEdit || itemId == '' ? (
                          <TextField
                            type="number"
                            value={item.contained_qty}
                            onChange={(e) => handleContainedQtyChange(e.target.value, index)}
                          />
                        ) : (
                          item?.contained_qty
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.unit_name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.unit_qty}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <ListTableCellDroplist showAvatar={false} values={attrValues} />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item?.unit_price?.map((price: any, baIndex: number) => (
                          <Typography key={baIndex} noWrap>
                            {moneyFormat(price.amount, price?.currency)}
                          </Typography>
                        ))}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item?.cost_price?.map((price: any, coIndex: number) => (
                          <Typography key={coIndex} noWrap>
                            {moneyFormat(price.amount, price?.currency)}
                          </Typography>
                        ))}
                      </TableCell>
                      {(showEdit || itemId == '') && (
                        <TableCell width={'5%'} align="center">
                          <IconButton
                            color="error"
                            size="small"
                            onClick={() => {
                              handleRemoveItem(index);
                            }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
                <TableRow
                  sx={{
                    height: '20px',
                    background: 'transparent !important'
                  }}
                >
                  <TableCell colSpan={9}>
                    {(showEdit || itemId == '') && (
                      <Box>
                        <Button
                          size="small"
                          variant="contained"
                          startIcon={<Add />}
                          onClick={() => {
                            handleAddItem();
                          }}
                        >
                          {/* {`Add a attribute`} */}
                          <SpanLang
                            sx={{ fontSize: '0.75rem', fontWeight: theme.typography.fontWeightMedium }}
                            keyLang="ncrm_common_add_new_line"
                          />
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                </TableRow>
              </>
            )}

            <TableRow sx={{ background: theme.palette.secondary.lighter }}>
              {/* <TableCell colSpan={5} component="th">
                  <TableHeadCell></TableHeadCell>
                </TableCell> */}
              <TableCell colSpan={6} align="right">
                <TableHeadCell sx={{ background: 'transparent', fontWeight: '700' }}>
                  <SpanLang keyLang="ncrm_common_toltal" textOnly />
                </TableHeadCell>
              </TableCell>
              <TableCell align="left">
                <TableHeadCell sx={{ background: 'transparent' }}>
                  {itemTotal?.unit_price.map((item: any, baIndex: number) => (
                    <Typography sx={{ fontWeight: 'medium' }} key={baIndex} noWrap>
                      {moneyFormat(item.amount, item?.currency)}
                    </Typography>
                  ))}
                </TableHeadCell>
              </TableCell>
              <TableCell colSpan={2} align="left">
                <TableHeadCell sx={{ background: 'transparent' }}>
                  {itemTotal?.cost_price.map((item: any, coIndex: number) => (
                    <Typography sx={{ fontWeight: 'medium' }} key={coIndex} noWrap>
                      {moneyFormat(item.amount, item?.currency)}
                    </Typography>
                  ))}
                </TableHeadCell>
              </TableCell>
              {/* {(showEdit || itemId == '') && <TableCell align="center"></TableCell>} */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AssociatedItems;
