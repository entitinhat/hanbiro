import { useEffect, useMemo, useState } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';

//material
import { Box, Checkbox, InputLabel, Stack } from '@mui/material';

//project
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import { LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
//menu
import { CUSTOMER_CATEGORY_MARKETING_LIST } from '@customer/config/constants';
import { useQuickCustomers } from '@customer/hooks/useCustomers';
import * as keyNames from '@customer/config/keyNames';
import { getMapColumns } from '@customer/pages/ListPage/Helper';
import { Customer } from '@customer/types/interface';
import MarketingListAutoComplete from '@marketing-list/containers/MarketingListAutoComplete';
import { useMarketingListMembers } from '@marketing-list/hooks/useMarketingListMember';
import LoadingCircular from '@base/components/@hanbiro/LoadingCircular';

interface TableTabProps {
  defaultSelectedIds: string[];
  onChange?: (selected: any) => void;
  isMarketingModal?: boolean;
  category: string;
}

const TableTab = (props: TableTabProps) => {
  const { defaultSelectedIds = [], onChange, category } = props;

  //state
  const [selectedMarketingList, setSelectedMarketingList] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [items, setItems] = useState<Customer[]>([]);
  const [paging, setPaging] = useState<any>({ page: 1, size: 10 });

  //get list
  const {
    data: customerData,
    isLoading,
    refetch
  } = useQuickCustomers(category, paging, { enabled: category !== CUSTOMER_CATEGORY_MARKETING_LIST });

  //get marketing list
  const {
    data: memberData,
    isLoading: isMemberLoading,
    refetch: memberRefetch
  } = useMarketingListMembers(selectedMarketingList?.id, paging, {
    enabled: category === CUSTOMER_CATEGORY_MARKETING_LIST && selectedMarketingList?.id?.length > 0
  });

  //init selected
  useEffect(() => {
    if (JSON.stringify(defaultSelectedIds) !== JSON.stringify(selectedIds)) {
      setSelectedIds(defaultSelectedIds);
    }
  }, [defaultSelectedIds]);

  //init from marketing list members
  useEffect(() => {
    if (category === CUSTOMER_CATEGORY_MARKETING_LIST) {
      //console.log('memberData', memberData);
      if (memberData?.data) {
        const newItems = memberData.data.map((_item: any) => ({
          ..._item.customer,
          targetId: _item.id,
          targetSource: _item.source
        }));
        setItems(newItems);
      } else {
        setItems([]);
      }
      if (memberData?.paging) {
        setPaging({ ...paging, page: memberData.paging.currentPage });
      } else {
        setPaging({ page: 1, size: 10 });
      }
    }
  }, [memberData, category]);

  //init from customer list
  useEffect(() => {
    if (category !== CUSTOMER_CATEGORY_MARKETING_LIST) {
      //console.log('customerData', customerData);
      if (customerData?.data) {
        setItems(customerData.data);
      } else {
        setItems([]);
      }
      if (customerData?.paging) {
        setPaging({ ...paging, page: customerData.paging.currentPage });
      } else {
        setPaging({ page: 1, size: 10 });
      }
    }
  }, [customerData, category]);

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  //selected change
  const handleCheckChange = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
    //callback
    const selectedItems = items.filter((_item) => checkedIds.includes(_item.id));
    onChange && onChange({ customers: selectedItems, category, marketingList: selectedMarketingList });
  };

  //table props
  const fields = useMemo(() => {
    return [
      // { languageKey: 'Source', keyName: keyNames.KEY_NAME_CUSTOMER_CATEGORY, enableSorting: false, width: 'auto' },
      { languageKey: 'Created On', keyName: keyNames.KEY_NAME_CUSTOMER_CREATED_AT, enableSorting: false, width: 'auto' },
      { languageKey: 'Name', keyName: keyNames.KEY_NAME_CUSTOMER_NAME, enableSorting: false, width: 'auto' },
      { languageKey: 'Company', keyName: keyNames.KEY_NAME_CUSTOMER_ACCOUNT, enableSorting: false, width: 'auto' },
      { languageKey: 'Email', keyName: keyNames.KEY_NAME_CUSTOMER_EMAIL, enableSorting: false, width: 'auto' },
      { languageKey: 'Mobile', keyName: keyNames.KEY_NAME_CUSTOMER_MOBILE, enableSorting: false, width: 'auto' }
    ];
  }, [category]);

  //build columns for table v8
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        id: 'select',
        width: '45px',
        header: ({ table }) => (
          <Checkbox
            {...{
              color: 'secondary',
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              color: 'secondary',
              checked: row.getIsSelected(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      ...makeTable8Columns(fields, getMapColumns(category), { category }, [])
    ],
    [fields, selectedIds]
  );

  //paging props
  const pagingProps: ListPaginationProps = {
    pageTotal: customerData?.paging?.totalPage || 1,
    pageCount: customerData?.paging?.totalItems || 0,
    pageSize: paging?.size || LIST_TABLE_PAGE_SIZE,
    pageIndex: customerData?.paging?.currentPage || 1
  };

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: items,
      checkedIds: selectedIds,
      onRowChecked: handleCheckChange,
      pagingProps,
      onPageChange: handlePagingChange,
      columns: columns,
      sx: { px: 0, ml: -2 }
      // onSortBy: (clName: any, isSorted: any) => {
      //   if (isSorted !== false) {
      //     let orderBy = isSorted === 'desc' ? DESC : ASC;
      //     setSort({ field: clName, orderBy: orderBy });
      //   }
      // }
    };
    return <ListTable {...listTableProps} />;
  }, [items, pagingProps, columns, selectedIds, category]);

  return (
    <>
      {category === CUSTOMER_CATEGORY_MARKETING_LIST && (
        <Stack pb={2} spacing={1}>
          <InputLabel>Marketing list</InputLabel>
          <Stack sx={{ maxWidth: '450px' }}>
            <MarketingListAutoComplete
              single={true}
              value={selectedMarketingList}
              onChange={(data: any) => setSelectedMarketingList(data)}
            />
          </Stack>
        </Stack>
      )}
      <Box>
        {TableMemo}
        {isLoading && <LoadingCircular loading />}
      </Box>
    </>
  );
};

export default TableTab;
