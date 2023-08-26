import React, { useMemo } from 'react';
import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { PageLayoutSectionField } from '@base/types/pagelayout';

import { Checkbox } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { columnRenderRemap } from './Helper';
import ListGridCard from '@settings/sites/containers/ListGridCard';
import { Paging } from '@base/types/response';

interface BodyProps {
  isSplitMode: boolean;
  category: string;
  fields: PageLayoutSectionField[];
  itemsList: any[];
  paging?: Paging | undefined;
  checkedIds: string[];
  onChecked: (checkedIds: string[]) => void;
  refetch: () => void;
  setSort: (value: any) => void;
  group: string;
}

const Body = (props: BodyProps) => {
  const { isSplitMode, category, fields, itemsList, paging, checkedIds, onChecked, refetch, setSort, group } = props;
  const { listType, setPaging, paging: cPaging, getViewingFields, settingColumns } = useListPageSettings(category);

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };
  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }
  const tableFields = viewingFields.map((_ele: any) => ({
    ..._ele,
    enableSorting: true,
    width: _ele.keyName === 'photo' ? '100px' : 'auto'
  }));
  const getMapColumns = () => {
    return columnRenderRemap(group);
  };
  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
      /*{
        id: 'select',
        width: '45px',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="pd-x-1">
            <Checkbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler()
              }}
            />
          </div>
        )
      },*/
      ...makeTable8Columns(tableFields, getMapColumns(), { category }, [])
    ],
    [tableFields, checkedIds]
  );
  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: cPaging?.size || LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const listTableProps: ListTableProps = {
    rows: itemsList || [],
    checkedIds,
    onRowChecked: onChecked,
    pagingProps,
    onPageChange: handlePagingChange,
    columns: tableColumns,
    onSortBy: (clName: any, isSorted: any) => {
      if (isSorted !== false) {
        let orderBy = isSorted === 'desc' ? DESC : ASC;
        setSort({ field: clName, orderBy: orderBy });
      }
    }
  };
  const listGridProps: ListGridProps = {
    rows: itemsList || [],
    checkedIds,
    onRowChecked: onChecked,
    pagingProps,
    onPageChange: handlePagingChange,
    columns: fields,
    hideColumns: [],
    columnRenderRemap: getMapColumns(),
    isSmall: isSplitMode,
    children: () => <></>
  };
  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        return (
          <ListGrid {...listGridProps}>
            {(props) => {
              return <ListGridCard iSplitMode={isSplitMode} {...props} category={category} />;
            }}
          </ListGrid>
        );
      default:
        return <ListTable {...listTableProps} />;
    }
  };

  const ListBodyMemo = useMemo(() => {
    return getTypeBody(listType);
  }, [itemsList, fields, isSplitMode, listType]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
