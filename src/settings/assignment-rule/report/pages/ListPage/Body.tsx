import React, { useMemo } from 'react';
import { ListType } from '@base/types/app';
import { ListBody } from '@base/components/@hanbiro/List';
import * as keyNames from '@activity/config/keyNames';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@mui/material';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';

import { PageLayoutSectionField } from '@base/types/pagelayout';
import ListGridCard from '@settings/assignment-rule/rule/containers/ListGridCard';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import { Ticket } from '@settings/assignment-rule/rule/types/ticket';
import { AssignRule } from '@settings/assignment-rule/rule/types/rule';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';

import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { columnRenderRemap, FakeData } from './Helper';
import { Paging } from '@base/types/response';

interface BodyProps<T> {
  isSplitMode: boolean;
  category: string;
  fields: PageLayoutSectionField[];
  itemsList: T[];
  paging?: Paging | undefined;
  refetch: () => void;
}

const Body = (props: BodyProps<AssignRule>) => {
  const { isSplitMode, category, itemsList, paging, refetch } = props;
  const { listType, setSort, setPaging, paging: cPaging } = useListPageSettings(category);
  const { fields, fakeData } = FakeData();
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const tableFields = fields.map((_ele: any) => ({
    ..._ele,
    enableSorting: true,
    width: _ele.keyName === 'photo' ? '100px' : 'auto'
  }));
  const getMapColumns = () => {
    return columnRenderRemap(category);
  };

  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [...makeTable8Columns(tableFields, getMapColumns(), { category }, [])],
    [tableFields]
  );
  // const pagingProps: ListPaginationProps = {
  //   pageTotal: paging?.totalPage || 1,
  //   pageCount: paging?.totalItems || 0,
  //   pageSize: cPaging?.size || LIST_TABLE_PAGE_SIZE,
  //   pageIndex: paging?.currentPage || 1
  // };

  const pagingProps: ListPaginationProps = {
    pageTotal: fakeData.paging?.totalPage || 1,
    pageCount: fakeData.paging?.totalItems || 0,
    pageSize: fakeData.paging?.itemPerPage || 10,
    pageIndex: fakeData.paging?.currentPage || 1
  };

  const listTableProps: ListTableProps = {
    rows: fakeData.data || [],
    pagingProps,
    onPageChange: handlePagingChange,
    columns: tableColumns,
    onSortBy: (clName: any, isSorted: any) => {
      if (isSorted !== false) {
        let orderBy = isSorted === 'desc' ? DESC : ASC;
        setSort({ field: clName, orderBy: orderBy });
      }
    },
    isRowSpanned: true
  };
  const ListBodyMemo = useMemo(() => {
    return <ListTable {...listTableProps} />;
  }, [itemsList, fields, isSplitMode, listType]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
