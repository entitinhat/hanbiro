import { ListBody } from '@base/components/@hanbiro/List';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';

import ListTable, { ListTableProps, LoadMoreProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { LIST_TABLE_PAGE_SIZE_IAM } from '@base/config/constant';
import { Paging } from '@base/types/response';

import { Checkbox } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { User } from '../../types';
import { columnRenderRemap } from './Helper';
export interface ListColumn {
  id: string;
  isDefault: boolean;
  keyName: string;
  languageKey: string;
  title: string;
  order: number;
  render?: (...parameters: any[]) => any;
}

interface BodyProps<T> {
  columns: ListColumn[];
  itemsList: T[];
  paging?: Paging | undefined;
  checkedIds: string[];
  onChecked: (checkedIds: string[]) => void;
  refetch: () => void;
  nextCursor?: string;
  onLoadMore?: (cursor: string | undefined) => void;
  isLoading?: boolean;
}
const Body = (props: BodyProps<User>) => {
  const { columns, itemsList, paging, checkedIds, onChecked, refetch, onLoadMore, nextCursor, isLoading } = props;
  const tableFields = columns;
  const getMapColumns = () => {
    return columnRenderRemap();
  };
  const tableColumns = useMemo<ColumnDef<any>[]>(
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
            sx={{ p: 0 }}
          />
        ),
        cell: ({ row }) => (
          <div className="pd-x-1">
            <Checkbox
              {...{
                color: 'secondary',
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
              sx={{ p: 0 }}
            />
          </div>
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(), {}, [])
    ],
    [tableFields, checkedIds]
  );

  const handlePagingChange = (page: number, size: number) => {
    // setPaging({ page, size });
  };

  const ListBodyMemo = useMemo(() => {
    const pagingProps: ListPaginationProps = {
      pageTotal: 1,
      pageCount: itemsList.length,
      pageSize: LIST_TABLE_PAGE_SIZE_IAM,
      pageIndex: 1
    };

    //#This is old version
    // const loadMoreProps: LoadMoreProps = {
    //   totalItems: itemsList?.length,
    //   onLoadMore: onLoadMore,
    //   nextCursor: nextCursor,
    //   isLoading: isLoading
    // };

    const listTableProps: ListTableProps = {
      rows: itemsList || [],
      checkedIds,
      onRowChecked: onChecked,
      columns: tableColumns,
      pagingProps,
      onPageChange: handlePagingChange
    };

    return <ListTable {...listTableProps} />;
  }, [itemsList, checkedIds, nextCursor]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
