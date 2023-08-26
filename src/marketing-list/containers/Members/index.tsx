import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import CustomerModal from '@customer/containers/CustomerModal';
import { useMembers } from '@marketing-list/hooks/useMembers';
import { Box, Button, Checkbox, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import * as keyNames from '@marketing-list/config/keyNames';
import { ColumnDef } from '@tanstack/react-table';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { getMapColumns } from './Helper';
import useMemberDelete from '@marketing-list/hooks/useMemberDelete';
import { SET_TIMEOUT } from '@base/config/constant';

interface MembersProps {
  menuSource: string;
  menuCategory: string;
  menuSourceId: string;
}

const Memebers = (props: MembersProps) => {
  const { menuCategory: category, menuSource, menuSourceId } = props;
  const theme = useTheme();
  // state
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [paging, setPaging] = useState<any>({ page: 1, size: 10 });
  const [items, setItems] = useState<any[]>([]);

  // call data
  const { data, refetch } = useMembers(paging, {
    staleTime: 0
  });

  //init data
  useEffect(() => {
    if (data?.data) {
      setItems(data.data);
    } else {
      setItems([]);
    }
    if (data?.paging) {
      setPaging({ ...paging, page: data.paging.currentPage, totalItems: data.paging.totalItems });
    }
  }, [data]);

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ ...paging, page, size });
  };

  //table props
  const fields = [
    // { languageKey: 'Source', keyName: keyNames.KEY_NAME_CUSTOMER_CATEGORY, enableSorting: false, width: 'auto' },
    { languageKey: 'Name', keyName: keyNames.KEY_NAME_CUSTOMER_NAME, enableSorting: false, width: 'auto' },
    { languageKey: 'Company', keyName: keyNames.KEY_NAME_CUSTOMER_COMPANY, enableSorting: false, width: 'auto' },
    { languageKey: 'Email', keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL, enableSorting: false, width: 'auto' },
    { languageKey: 'Mobile', keyName: keyNames.KEY_NAME_CUSTOMER_MOBILES, enableSorting: false, width: 'auto' },
    { languageKey: '', keyName: keyNames.KEY_NAME_CUSTOMER_DELETE, enableSorting: false, width: '70px' }
  ];

  // delete Member
  const mDelete = useMemberDelete();

  const handleDelete = (ids: string[]) => {
    const params = {
      id: menuSourceId,
      memberIds: ids
    };
    mDelete.mutate(params, {
      onSuccess: () => {
        setTimeout(() => {
          refetch && refetch();
        }, SET_TIMEOUT);
      }
    });
  };

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(
    () => [...makeTable8Columns(fields, getMapColumns(category), { category, handleDelete }, [])],
    [fields]
  );
  //paging props
  const pagingProps: ListPaginationProps = {
    pageTotal: data?.paging?.totalPage || 1,
    pageCount: data?.paging?.totalItems || 0,
    pageSize: paging?.size || LIST_TABLE_PAGE_SIZE,
    pageIndex: data?.paging?.currentPage || 1
  };

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items,
      pagingProps,
      onPageChange: handlePagingChange,
      columns: columns,
      sx: { px: 0 }
    };
    return <ListTable {...listTableProps} />;
  }, [items, pagingProps, columns]);

  return (
    <Box mr={2}>
      <Stack mb={2} width="100%" direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" fontWeight="500">
          <Typography ml={0.5} fontWeight="500" color={theme.palette.success.main}>{` Total: ${paging?.totalItems || 0}`}</Typography>
        </Stack>
        <Button variant="contained" size="small" sx={{ width: 'fit-content' }} onClick={() => setShowAdd(true)}>
          Add Member
        </Button>
      </Stack>
      {TableMemo}
      <CustomerModal
        isMarketingModal
        campaignId={menuSourceId}
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        onReload={() => {
          setTimeout(() => {
            refetch && refetch();
          }, SET_TIMEOUT);
        }}
      />
    </Box>
  );
};

export default Memebers;
