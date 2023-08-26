import { Box, Button, Chip, Divider, IconButton, InputAdornment, OutlinedInput, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import RouteName from '@base/components/@hanbiro/RouteName';
import { AnniversaryType, OptionValue } from '@base/types/common';
import * as keyNames from '@customer/config/keyNames';
import { ColumnDef } from '@tanstack/react-table';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { LABEL_VALUE_CUSTOM_ANNI, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { Search } from '@mui/icons-material';
import {
  CUSTOMER_CATEGORY_ACCOUNT,
  CUSTOMER_CATEGORY_ALL,
  CUSTOMER_CATEGORY_CONTACT,
  CUSTOMER_CATEGORY_ENUM,
  CUSTOMER_GENDER_OPTIONS
} from '@customer/config/constants';
import { useCustomerAssignContacts } from '@customer/hooks/useCustomerAssignContact';
import WritePage from '@customer/pages/WritePage';
import { MENU_CUSTOMER } from '@base/config/menus';
import { useMatch } from 'react-router-dom';

interface CustomerContactViewProps {
  menuSource: string;
  menuSourceId: string;
  menuSourceName: string;
  value?: any;
  isCenter?: boolean;
  onCallback?: (data: any) => void;
}

const CustomerContactView = (props: CustomerContactViewProps) => {
  const { isCenter, menuSource, menuSourceId, menuSourceName, onCallback } = props;
  const { t } = useTranslation();
  const [items, setItems] = useState<any>([]);
  const [paging, setPaging] = useState<any>({ page: 1, size: LIST_TABLE_PAGE_SIZE });
  const [showAdd, setShowAdd] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const [curSearchValue, setCurSearchValue] = useState<string>('');
  const theme = useTheme();

  const {
    data: contactsData,
    isLoading,
    refetch
  } = useCustomerAssignContacts(menuSourceId, {
    filter: {
      query: curSearchValue
        ? `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_CONTACT]} account=\"${menuSourceId}\" name:\"${curSearchValue}\"`
        : `category=${CUSTOMER_CATEGORY_ENUM[CUSTOMER_CATEGORY_CONTACT]} account=\"${menuSourceId}\" `,
      paging: {
        page: paging.page,
        size: paging.size
      }
    }
  });
  // const mutationCreate = useCustomerCreateAssignContact();
  // const mutationDelete = useCustomerDeleteContact(menuSourceId);

  //init contact items
  useEffect(() => {
    if (contactsData?.data) {
      setItems(contactsData.data);
    } else {
      setItems([]);
    }
  }, [contactsData]);
  // ------------table center-----------------
  const getMapColumns = (category: string) => {
    return {
      [keyNames.KEY_NAME_CUSTOMER_NAME](col: string, data: any, extra: any) {
        let custName = data[col] ? data[col] : <em>{t('ncrm_common_none')}</em>;
        let sourceId = data[keyNames.KEY_NAME_CUSTOMER_ID] ? data[keyNames.KEY_NAME_CUSTOMER_ID] : '';
        let url =
          category === CUSTOMER_CATEGORY_ALL
            ? `/${MENU_CUSTOMER}/${CUSTOMER_CATEGORY_ALL}/${sourceId}/${CUSTOMER_CATEGORY_CONTACT}`
            : `/${MENU_CUSTOMER}/${CUSTOMER_CATEGORY_CONTACT}/${sourceId}`;
        const isRead = data?.isRead ?? true;

        return <RouteName name={custName} url={url} variant="h6" isRead={isRead} />;
      },
      [keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE](col: string, data: any, extra: any) {
        return data?.[col]?.languageKey ? <Typography>{t(data?.[col]?.languageKey)}</Typography> : <em>(none)</em>;
      },
      [keyNames.KEY_NAME_CUSTOMER_DEPARTMENT](col: string, data: any, extra: any) {
        return data?.[col] ? <Typography>{t(data?.[col])}</Typography> : <em>(none)</em>;
      },
      [keyNames.KEY_NAME_CUSTOMER_JOB](col: string, data: any, extra: any) {
        return data?.[col] ? <Typography>{t(data?.[col]?.languageKey)}</Typography> : <em>(none)</em>;
      },
      [keyNames.KEY_NAME_CUSTOMER_GENDER](col: string, data: any, extra: any) {
        const languegeKey = CUSTOMER_GENDER_OPTIONS.find((v: any) => v.keyName === data?.[col])?.languageKey;
        return languegeKey ? t(languegeKey) : <em>(none)</em>;
      },
      [keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES](col: string, data: any, extra: any) {
        const value = data[col] ?? null;
        return (
          <Box>
            {Array.isArray(value) && value.length > 0 ? (
              value.map((_item: AnniversaryType, index: number) => {
                const labelKey = _item.label.label || '';
                return (
                  <Stack key={index} spacing={1} direction="row" alignItems="center" sx={{ mb: 0.5 }}>
                    {labelKey && (
                      <Chip
                        size="small"
                        color="lime"
                        label={t(labelKey == LABEL_VALUE_CUSTOM_ANNI ? _item.labelValue : _item.label.languageKey)}
                      />
                    )}
                    <Typography variant="inherit" color="primary">
                      {_item.anniversary?.slice(0, 10)}
                    </Typography>
                  </Stack>
                );
              })
            ) : (
              <em>(none)</em>
            )}
          </Box>
        );
      }
    };
  };

  const fields = useMemo(() => {
    return [
      { languageKey: 'Contact Name', keyName: keyNames.KEY_NAME_CUSTOMER_NAME, enableSorting: false, width: 'auto' },
      { languageKey: 'Employee Role', keyName: keyNames.KEY_NAME_CUSTOMER_EMPLOYEE_ROLE, enableSorting: false, width: 'auto' },
      { languageKey: 'Department', keyName: keyNames.KEY_NAME_CUSTOMER_DEPARTMENT, enableSorting: false, width: 'auto' },
      { languageKey: 'Job Title', keyName: keyNames.KEY_NAME_CUSTOMER_JOB, enableSorting: false, width: 'auto' },
      { languageKey: 'Gender', keyName: keyNames.KEY_NAME_CUSTOMER_GENDER, enableSorting: false, width: 'auto' },
      { languageKey: 'Anniversary', keyName: keyNames.KEY_NAME_CUSTOMER_ANNIVERSARIES, enableSorting: false, width: 'auto' }
    ];
  }, []);

  let layoutCategory = CUSTOMER_CATEGORY_ACCOUNT; //router category
  const matchAll = useMatch('/customer/all/*');
  const matchAccount = useMatch('/customer/account/*');
  if (matchAll) {
    layoutCategory = CUSTOMER_CATEGORY_ALL;
  }
  if (matchAccount) {
    layoutCategory = CUSTOMER_CATEGORY_ACCOUNT;
  }

  const columns = useMemo<ColumnDef<any>[]>(() => [...makeTable8Columns(fields, getMapColumns(layoutCategory), {}, [])], [fields]);

  // paging
  const pagingProps: ListPaginationProps = {
    pageTotal: contactsData?.paging?.totalPage || 1,
    pageCount: contactsData?.paging?.totalItems || 0,
    pageSize: !!paging?.size ? paging?.size : LIST_TABLE_PAGE_SIZE,
    pageIndex: contactsData?.paging?.currentPage || 1
  };

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items,
      columns: columns,
      pagingProps,
      sx: { p: 0, mb: 0 },
      onPageChange: handlePagingChange
    };
    return <ListTable {...listTableProps} />;
  }, [items, columns, pagingProps]);

  // handle Search
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    setSearchText(value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLDivElement> | undefined) => {
    if (event?.key !== 'Enter') {
      return;
    }

    setCurSearchValue(searchText.trim());
  };

  if (isCenter) {
    return (
      <>
        <Box
          sx={{
            my: 1,
            // mx: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row-reverse'
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setShowAdd(true);
            }}
            size="small"
          >
            + New
          </Button>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <OutlinedInput
              fullWidth
              onChange={handleTextChange}
              value={searchText}
              onKeyPress={handleEnter}
              sx={
                {
                  // bgcolor: (t) => t.palette.grey[50],
                  // overflow: 'hidden'
                }
              }
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
          </Box>
        </Box>
        {TableMemo}
        <WritePage
          isOpen={showAdd}
          onClose={() => setShowAdd(false)}
          category={CUSTOMER_CATEGORY_CONTACT}
          account={
            menuSource === MENU_CUSTOMER
              ? {
                  id: menuSourceId || '', //account id
                  code: '', //account id
                  name: menuSourceName || '', //account name
                  category: CUSTOMER_CATEGORY_ACCOUNT
                }
              : undefined
          }
          menuApi={`${MENU_CUSTOMER}_${CUSTOMER_CATEGORY_CONTACT}`}
          onSuccess={onCallback}
        />
      </>
    );
  }

  return (
    <Stack spacing={2}>
      {items?.map((v: any, i: number) => {
        return (
          <Stack key={i} direction={'row'} alignItems="center" spacing={1}>
            <Typography>{v?.code}</Typography>
            <RouteName name={v?.subject} url={'/'} variant="h6" />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default CustomerContactView;
