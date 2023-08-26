import React, { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { Box, Stack, Typography, OutlinedInput, Divider, InputAdornment, useTheme, Button } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { Search } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useItems } from '@product/item/hooks/useItems';
import { FilterInput } from '@base/types/common';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import { IMAGE_MODULE_PRODUCT_ITEM, PRODUCT_ITEM_TYPE_OPTIONS } from '@product/main/config/constants';
import * as keyNames from '@product/item/config/keyNames';
import { ProductItemQuickView } from '@base/containers/QuickView';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import { moneyFormat } from '@base/utils/helpers';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import WritePage from '@product/item/pages/WritePage';
import { DESC } from '@base/config/constant';

import IconAvatar from '@base/components/@hanbiro/IconAvatar';
import { useQueryClient } from '@tanstack/react-query';
import { Product } from '@product/product/types/product';
import { queryKeys } from '@product/product/config/queryKeys';

interface Props {
  menuSourceId: string;
  canAddNew?: boolean;
}

const Items = (props: Props) => {
  const { menuSourceId, canAddNew = true } = props;
  const theme = useTheme();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  // get viewData from queryClient
  const prodData = queryClient.getQueryData<Product>([queryKeys.viewProduct, menuSourceId]);

  const params: any = {
    filter: {
      query: `prodId=${menuSourceId} name=${searchText}`,
      sort: {
        field: 'createdAt',
        orderBy: DESC
      },
      paging: {
        page: currentPage,
        size: pageSize
      }
    } as FilterInput
  };

  const { data, isLoading, refetch } = useItems(params);

  const checkedIds: string[] = [];
  const onChecked = () => {};

  const pagingProps: ListPaginationProps = {
    pageTotal: data?.paging?.totalPage || 1,
    pageCount: data?.paging?.totalItems || 0,
    pageSize: pageSize,
    pageIndex: data?.paging?.currentPage || 1
  };

  const handlePagingChange = (page: number, size: number) => {
    if (page != currentPage) {
      setCurrentPage(page);
    }
    if (size != pageSize) {
      setPageSize(size);
    }
  };

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
          const mainImage: any = row?.original?.[keyNames.KEY_ITEM_IMAGES]?.[0] ?? null;
          return (
            <IconAvatar
              moduleDownload={IMAGE_MODULE_PRODUCT_ITEM}
              showType="image"
              variant="rounded"
              id={mainImage?.id}
              url={mainImage?.name}
              alt={''}
              size="md"
            />
          );
        }
      },
      {
        id: keyNames.KEY_ITEM_NAME,
        header: () => <SpanLang keyLang={'product_item_field_basic_name'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_NAME,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <ProductItemQuickView value={{ id: row?.original?.id, name: row?.original?.name }} />;
        }
      },
      {
        id: keyNames.KEY_ITEM_CODE,
        header: () => <SpanLang keyLang={'product_item_field_basic_code'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_CODE,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <Typography noWrap>{row?.original?.code ?? ''}</Typography>;
        }
      },
      {
        id: keyNames.KEY_ITEM_UNIT_VALUE,
        header: () => <SpanLang keyLang={'product_item_field_basic_unitval'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_UNIT_VALUE,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <Typography noWrap>{row?.original?.unitVal?.name ?? ''}</Typography>;
        }
      },
      {
        id: keyNames.KEY_ITEM_UNIT_VALUE_QTY,
        header: () => <SpanLang keyLang={'product_item_field_basic_unitvalqty'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_UNIT_VALUE_QTY,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          return <Typography noWrap>{row?.original?.unitVal?.qty ?? ''}</Typography>;
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
            row?.original?.attrValues?.map((item: any) => ({
              id: item?.id,
              name: [item?.attr?.name, item?.name].join(':')
            })) ?? [];
          return items.length > 0 ? <ListTableCellDroplist showAvatar={false} values={items} /> : '';
        }
      },
      {
        id: keyNames.KEY_ITEM_UNIT_PRICE,
        header: () => <SpanLang keyLang={'product_item_field_basic_unitprice'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_BASE_PRICE,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          const unitPrice = row?.original?.unitPrice;
          return <Typography noWrap>{unitPrice ? moneyFormat(unitPrice?.amount ?? 0, unitPrice?.currency) : ''}</Typography>;
        }
      },
      {
        id: keyNames.KEY_ITEM_COST_PRICE,
        header: () => <SpanLang keyLang={'product_item_field_basic_basecost'} textOnly />,
        accessorKey: keyNames.KEY_ITEM_COST_PRICE,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          const costPrice = row?.original?.costPrice;
          return <Typography noWrap>{costPrice ? moneyFormat(costPrice?.amount ?? 0, costPrice?.currency) : ''}</Typography>;
        }
      }
    ],
    []
  );

  const listTableProps: ListTableProps = {
    rows: data?.data || [],
    checkedIds,
    onRowChecked: onChecked,
    pagingProps,
    onPageChange: handlePagingChange,
    columns: tableColumns,
    onSortBy: (clName: any, isSorted: any) => {
      // if (isSorted !== false) {
      //   let orderBy = isSorted === 'desc' ? DESC : ASC;
      //   setSort({ field: clName, orderBy: orderBy });
      // }
    }
  };

  //handler
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    setSearchText(value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    searchText.trim();
  };

  const handleAdd = () => {
    setShowWrite(true);
  };

  return (
    <Stack spacing={2} className="scroll-box" sx={{ ml: -2, mr: -2 }}>
      <Box sx={{ px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <OutlinedInput
          fullWidth={false}
          onChange={handleTextChange}
          value={searchText}
          onKeyPress={handleEnter}
          sx={{
            width: 216
          }}
          placeholder={t('ncrm_common_search_placeholder') as string}
          size="small"
          endAdornment={
            <>
              <Divider orientation="vertical" sx={{ height: 32 }} />
              <InputAdornment
                position="end"
                sx={{
                  '& .MuiInputAdornment-sizeSmall': {
                    width: 32,
                    ml: '-8px'
                  },
                  ':hover': {
                    '& .MuiIconButton-root': {
                      bgcolor: theme.palette.primary.lighter,
                      color: `${theme.palette.primary.main}`
                    }
                  },
                  '& .MuiIconButton-root': {
                    height: 32
                  },
                  py: 0
                }}
              >
                <IconButton
                  aria-label="search"
                  edge="end"
                  color="inherit"
                  sx={{
                    ml: '-8px',
                    mr: '-14px'
                  }}
                  onClick={() => {}}
                >
                  <Search
                    sx={
                      {
                        // color: `${theme.palette.grey[300]}`
                      }
                    }
                    fontSize="small"
                  />
                </IconButton>
              </InputAdornment>
            </>
          }
        />
        <Button size="small" variant="contained" startIcon={<AddOutlined />} onClick={handleAdd} disabled={!canAddNew}>
          <SpanLang keyLang="ncrm_common_btn_new" textOnly />
        </Button>
      </Box>
      <ListTable {...listTableProps} sx={{ px: 0 }} />
      {showWrite && (
        <WritePage
          isOpen={showWrite}
          onClose={() => {
            setShowWrite(false);
          }}
          prodData={prodData}
          fromProd={true}
          onReload={refetch}
        />
      )}
    </Stack>
  );
};

export default Items;
