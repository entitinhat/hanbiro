
import React, { useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

import { Box, Button, Checkbox, Stack, TextField, Typography, OutlinedInput, Divider, InputAdornment, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { useRelatedProduct } from '@product/unit/hooks/useRelatedProduct';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import * as keyNames from '@product/product/config/keyNames';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { ProductQuickView } from '@base/containers/QuickView';


interface RelatedProductTableProps {
  menuSourceId: string;
}

const RelatedProductTable = (props: RelatedProductTableProps) => {
  const { menuSourceId } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showWrite, setShowWrite] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const params: any = {
    id: menuSourceId,
    keyword: searchText,
    paging: {
      page: currentPage,
      size: pageSize
    }
  };

    const { data, isLoading, refetch } = useRelatedProduct(params);

  //handler
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    setSearchText(value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }
    searchText.trim()
  };


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
            id: 'select',
            width: '45px',
            header: ({ table }) => (
              <Checkbox
                {...{
                  color: 'primary',
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler()
                }}
                sx={{ p: 0 }}
              />
            ),
            cell: ({ row }) => (
              <div className="pd-x-1">
                <Checkbox
                  {...{
                    color: 'primary',
                    checked: row.getIsSelected(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler()
                  }}
                  sx={{ p: 0 }}
                />
              </div>
            )
          },
        {
            id: keyNames.KEY_PRODUCT_NAME,
            header: () => <SpanLang keyLang={'product_product_field_basic_name'} textOnly />,
            accessorKey: keyNames.KEY_PRODUCT_NAME,
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
            return <ProductQuickView value={{ id: row?.original?.id, name: row?.original?.name }} />;
            }
        },
        {
            id: keyNames.KEY_PRODUCT_GROUP,
            header: () => <SpanLang keyLang={'product_product_field_basic_group'} textOnly />,
            accessorKey: keyNames.KEY_PRODUCT_GROUP,
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
            //   return <ProductItemQuickView value={{ id: row?.original?.id, name: row?.original?.name }} />;
            return <Typography noWrap>{row?.original?.[keyNames.KEY_PRODUCT_GROUP]?.name ?? ''}</Typography>;                      
            }
        },
        {
            id: keyNames.KEY_PRODUCT_ATTRIBUTE,
            header: () => <SpanLang keyLang={'product_product_field_basic_attributes'} textOnly />,
            accessorKey: keyNames.KEY_PRODUCT_ATTRIBUTE,
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
                let items: any[] = row?.original?.[keyNames.KEY_PRODUCT_ATTRIBUTE] ?? [];
                
                items = items
                ? items?.map((attr: any) => ({
                    id: attr?.id,
                    name: attr?.name
                    }))
                : [];
                return items.length > 0 ? <ListTableCellDroplist showAvatar={false} values={items} /> : '';
            }
        },
        {
            id: keyNames.KEY_PRODUCT_ITEMS,
            header: () => <SpanLang keyLang={'product_product_field_basic_items'} textOnly />,
            accessorKey: keyNames.KEY_PRODUCT_ITEMS,
            enableColumnFilter: false,
            enableSorting: false,
            cell: ({ row }) => {
              let items: any[] = row?.original?.[keyNames.KEY_PRODUCT_ITEMS] ?? [];
              
              items = items
              ? items?.map((attr: any) => ({
                  id: attr?.id,
                  name: attr?.name
                  }))
              : [];
              return items.length > 0 ? <ListTableCellDroplist showAvatar={false} values={items} /> : '';
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

  const handleAdd = () => {
    setShowWrite(true);
  };

  return (
    <Stack spacing={2} className="scroll-box" sx={{ ml: -2, mr: -2 }}>
        <Box sx={{ pl: 2 }} >
            <OutlinedInput
                fullWidth={false}
                onChange={handleTextChange}
                value={searchText}
                onKeyPress={handleEnter}
                sx={{
                  width: 400
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
                          },
                        },
                        '& .MuiIconButton-root': {
                          height: 32,
                        },
                        py: 0,
                      }}
                    >
                      <IconButton
                        aria-label="search"
                        edge="end"
                        color="inherit"
                        sx={{ 
                          ml: '-8px', 
                          mr: '-14px',
                        }}
                        onClick={() => {
                          
                        }}
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
        </Box>
        <ListTable {...listTableProps} sx={{ px: 0 }} />
    </Stack>
  );
};

export default RelatedProductTable;
