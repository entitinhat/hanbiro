import { useMemo } from 'react';
import { ListBody } from '@base/components/@hanbiro/List';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';

import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { LIST_TABLE_PAGE_SIZE_IAM } from '@base/config/constant';

import { Checkbox } from '@mui/material';
import { ListColumn } from '@settings/users-groups/users/pages/ListPage/Body';
import { ColumnDef } from '@tanstack/react-table';
import { Group } from '../../types/group';
import { columnRenderRemap } from './Helper';
import RouteName from '@base/components/@hanbiro/RouteName';

interface BodyProps<T> {
  columns: ListColumn[];
  itemsList: T[];
  checkedIds: string[];
  onChecked: (checkedIds: string[]) => void;
  refetch: () => void;

  nextCursor?: string;
  onLoadMore?: (cursor: string | undefined) => void;
  isLoading?: boolean;
}
const Body = (props: BodyProps<Group>) => {
  const { columns, itemsList, checkedIds, onChecked, refetch, onLoadMore, nextCursor, isLoading } = props;
  const tableFields = columns;
  const getMapColumns = () => {
    return columnRenderRemap();
  };

  const handlePagingChange = (page: number, size: number) => {
    // setPaging({ page, size });
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
      ...makeTable8Columns(tableFields, getMapColumns(), {}, []),
      {
        id: 'actions',
        // width: '45px',
        header: 'Actions',
        cell: ({ row }) => {
          let url = `/settings/manage-users-groups/groups/${row.id}`;
          return (
            <div className="pd-x-1">
              <RouteName url={url} name={'Show details'} component="h6" />
            </div>
          );
        }
      }
    ],
    [tableFields, checkedIds]
  );

  const ListBodyMemo = useMemo(() => {
    const pagingProps: ListPaginationProps = {
      pageTotal: 1,
      pageCount: itemsList.length,
      pageSize: LIST_TABLE_PAGE_SIZE_IAM,
      pageIndex: 1
    };
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
      // loadMoreProps: loadMoreProps
    };
    return <ListTable {...listTableProps} />;
  }, [itemsList, checkedIds, nextCursor]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
