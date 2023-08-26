import React, { useEffect, useMemo, useState } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

import { Box, Stack, Typography, OutlinedInput, Divider, InputAdornment, useTheme, Checkbox } from '@mui/material';
import { Search } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { MENU_CUSTOMER } from '@base/config/menus';
import { LABEL_VALUE_PRIMARY } from '@base/config/constant';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import * as keyNames from '@customer/config/keyNames';
import ListTableCellDroplist from '@base/components/@hanbiro/List/ListTableCellDropList';
import RouteName from '@base/components/@hanbiro/RouteName';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import { selectionFieldsAtom } from '@base/store/atoms/app';
import { useSelectionFieldItems } from '@settings/general/hooks/useSelectionFieldItems';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ALL, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';

import { useRelatedCustomers } from '@product/product/hooks/useRelatedCustomers';

interface RelatedCustomerTableProps {
  menuSourceId: string;
}

const RelatedCustomerTable = (props: RelatedCustomerTableProps) => {
  const { menuSourceId } = props;
  const { t } = useTranslation();
  const theme = useTheme();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [searchText, setSearchText] = useState<string>('');

  const [selectionFields, setSelectionFields] = useRecoilState(selectionFieldsAtom);

  //get selection fields for customer
  const { data: fieldData } = useSelectionFieldItems({ keyNames: ['customer_category', 'contact_type'] });

  //init states list
  useEffect(() => {
    if (fieldData?.data) {
      setSelectionFields({
        ...selectionFields,
        ['customer_category']: fieldData.data.filter((_ele: any) => _ele.keyRoot === 'customer_category'),
        ['contact_type']: fieldData.data.filter((_ele: any) => _ele.keyRoot === 'contact_type')
      });
    }
  }, [fieldData]);

  const params: any = {
    id: menuSourceId,
    keyword: searchText,
    paging: {
      page: currentPage,
      size: pageSize
    }
  };

  const { data, isLoading, refetch } = useRelatedCustomers(params);

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
              // color: 'secondary',
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
                // color: 'secondary',
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
        id: keyNames.KEY_NAME_CUSTOMER_NAME,
        header: () => <SpanLang keyLang={'customer_all_field_basic_name'} textOnly />,
        accessorKey: keyNames.KEY_NAME_CUSTOMER_NAME,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          let custName = row?.original?.name ? row?.original?.name : '';
          let custCategory = CUSTOMER_CATEGORY_ACCOUNT;
          const category = row?.original?.category;
          switch (category) {
            case 'CATEGORY_ACCOUNT':
              custCategory = CUSTOMER_CATEGORY_ACCOUNT;
              break;
            case 'CATEGORY_CONTACT':
              custCategory = CUSTOMER_CATEGORY_CONTACT;
              break;
          }
          let sourceId = row?.original?.id ? row?.original?.id : '';
          let url =
            category === CUSTOMER_CATEGORY_ALL
              ? `/${MENU_CUSTOMER}/all/${sourceId}/${custCategory}`
              : `/${MENU_CUSTOMER}/${custCategory}/${sourceId}`;
          return <RouteName name={custName} url={url} variant="h6" />;
        }
      },
      {
        id: keyNames.KEY_NAME_CUSTOMER_TYPE,
        header: () => <SpanLang keyLang={'customer_all_field_basic_type'} textOnly />,
        accessorKey: keyNames.KEY_NAME_CUSTOMER_TYPE,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          let label: any = '';
          if (row?.original?.[keyNames.KEY_NAME_CUSTOMER_TYPE]?.languageKey) {
            label = t(row?.original?.[keyNames.KEY_NAME_CUSTOMER_TYPE]?.languageKey);
          } else if (row?.original?.[keyNames.KEY_NAME_CUSTOMER_TYPE]) {
            const typesData = selectionFields['customer_category'];
            if (typesData?.length) {
              const keyItem = typesData.find((_ele: any) => _ele.keyName === row?.original?.[keyNames.KEY_NAME_CUSTOMER_TYPE]);
              if (keyItem) {
                label = t(keyItem.languageKey);
              }
            }
          }
          return <Typography noWrap>{label ?? ''}</Typography>;
        }
      },
      {
        id: keyNames.KEY_NAME_CUSTOMER_INDUSTRIES,
        header: () => <SpanLang keyLang={'customer_all_field_basic_industries'} textOnly />,
        accessorKey: keyNames.KEY_NAME_CUSTOMER_INDUSTRIES,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          let industries: any = [];
          row?.original?.industries?.map((_ele: any) => {
            if (_ele !== null) {
              industries.push({ ..._ele, name: _ele?.languageKey ? t(_ele.languageKey) : _ele?.name });
            }
          });
          return <ListTableCellDroplist showAvatar={false} values={industries} />;
        }
      },
      {
        id: keyNames.KEY_NAME_CUSTOMER_EMAIL,
        header: () => <SpanLang keyLang={'customer_all_field_basic_emails'} textOnly />,
        accessorKey: keyNames.KEY_NAME_CUSTOMER_EMAIL,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          let emails: any = [];
          row?.original?.[keyNames.KEY_NAME_CUSTOMER_EMAIL]?.map((_ele: any) => {
            if (_ele.label === LABEL_VALUE_PRIMARY) {
              emails.unshift({ ..._ele, name: _ele.email });
            } else {
              emails.push({ ..._ele, name: _ele.email });
            }
          });
          return <ListTableCellDroplist showAvatar={false} values={emails} />;
        }
      },
      {
        id: keyNames.KEY_NAME_CUSTOMER_PHONES,
        header: () => <SpanLang keyLang={'customer_all_field_basic_phones'} textOnly />,
        accessorKey: keyNames.KEY_NAME_CUSTOMER_PHONES,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          let phones: any = [];
          row?.original?.[keyNames.KEY_NAME_CUSTOMER_PHONES]?.map((_ele: any) => {
            if (_ele.label === LABEL_VALUE_PRIMARY) {
              phones.unshift({ ..._ele, name: `+${_ele.country || ''}${_ele.phoneNumber}` });
            } else {
              phones.push({ ..._ele, name: `+${_ele.country || ''}${_ele.phoneNumber}` });
            }
          });
          return phones?.length > 0 ? <ListTableCellDroplist showAvatar={false} values={phones} /> : '';
        }
      },
      {
        id: keyNames.KEY_NAME_CUSTOMER_MOBILE,
        header: () => <SpanLang keyLang={'customer_contact_field_basic_mobiles'} textOnly />,
        accessorKey: keyNames.KEY_NAME_CUSTOMER_MOBILE,
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
          let mobiles: any = [];
          row?.original?.[keyNames.KEY_NAME_CUSTOMER_MOBILE]?.map((_ele: any) => {
            if (_ele.label === LABEL_VALUE_PRIMARY) {
              mobiles.unshift({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.mobileNumber}` });
            } else {
              mobiles.push({ ..._ele, name: `+${_ele.fCountry?.phoneCode || ''}${_ele.mobileNumber}` });
            }
          });
          return <ListTableCellDroplist showAvatar={false} values={mobiles} />;
        }
      }
    ],
    [selectionFields]
  );

  const listTableProps: ListTableProps = {
    rows: data?.data || [],
    checkedIds,
    onRowChecked: onChecked,
    pagingProps,
    onPageChange: handlePagingChange,
    columns: tableColumns,
    onSortBy: (clName: any, isSorted: any) => {}
  };

  return (
    <Stack spacing={2} className="scroll-box" sx={{ ml: -2, mr: -2 }}>
      <Box sx={{ pl: 2 }}>
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
                  <Search fontSize="small" />
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

export default RelatedCustomerTable;
