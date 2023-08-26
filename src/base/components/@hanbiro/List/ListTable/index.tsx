import React from 'react';
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import { BaseListProps } from '@base/components/@hanbiro/List/Interface';
import { ColumnDef } from '@tanstack/react-table';
import ListPagination from '@base/components/@hanbiro/List/ListPagination';
import { Box, Stack, StackProps, SxProps } from '@mui/material';
import { Table as ReactTableType } from '@tanstack/table-core';
import { useTranslation } from 'react-i18next';
import SpanLang from '@base/components/@hanbiro/SpanLang';
import LoadMoreButton from './LoadMoreButton';
import ListTableHeader from './ListTableHeader';

export interface LoadMoreProps {
  totalItems: number;
  nextCursor?: string; //last item id in current list
  onLoadMore?: (cursor: string | undefined) => void;
  isLoading?: boolean; //
}

export interface ListTableProps extends BaseListProps {
  sx?: StackProps['sx'];
  columns: ColumnDef<any>[];
  onSortBy?: (columnName: string, isSortedDesc: boolean) => void;
  footerRender?: (table: ReactTableType<any>) => React.ReactElement;
  setRowHover?: (row: any) => void;
  isRowSpanned?: boolean;
  loadMoreProps?: LoadMoreProps;
  isMultiSelection?: boolean; //enable multi selection in list, default equal to true
  isDraggable?: boolean; //enable drag amd drop rows on table
  sxPaging?: SxProps; //style props for pagination
  sxTableHeader?: StackProps['sx']; //style props for table header
  listTableHeaderProps?: any;
  //handle drag and drop item
  handleDragDrop?: (item: any) => void;
  //handle quick view
  handleQuickView?: (item: any) => void;
}

const ListTable = (props: ListTableProps) => {
  const {
    columns,
    rows = [],
    checkedIds = [],
    pagingProps,
    onPageChange,
    onRowChecked,
    onSortBy,
    footerRender,
    setRowHover,
    sx,
    isRowSpanned = false,
    primaryKey,
    loadMoreProps,
    isMultiSelection,
    isDraggable,
    sxPaging,
    listTableHeaderProps,
    handleDragDrop,
    handleQuickView,
    sxTableHeader
  } = props;
  //const { t } = useTranslation();

  // translate if column.header is string
  const nColumns = columns.map((column: any) => {
    // return { ...column, header: column.hideTitle ? '' : typeof column?.header === 'string' ? t(column.header) : column.header };
    return {
      ...column,
      header: column.hideTitle ? '' : typeof column?.header === 'string' ? <SpanLang keyLang={column.header} textOnly /> : column.header
    };
  });

  return (
    <Stack sx={{ px: 2, mb: 4, ...sx }} spacing={2}>
      {listTableHeaderProps && <ListTableHeader {...listTableHeaderProps} />}
      <ReactTable8
        columns={nColumns}
        data={rows}
        paging={pagingProps ?? { pageSize: rows?.length ?? 10 }}
        rowSelected={checkedIds}
        onRowSelect={onRowChecked}
        onSortBy={onSortBy}
        footerRender={footerRender}
        setRowHover={setRowHover}
        isRowSpanned={isRowSpanned}
        primaryKey={primaryKey}
        isMultiSelection={isMultiSelection}
        isDraggable={isDraggable}
        handleDragDrop={handleDragDrop}
        handleQuickView={handleQuickView}
        sxTableHeader={sxTableHeader}
      />
      {/* I using this load more to get more Data from Server without changing page */}
      {loadMoreProps && <LoadMoreButton {...loadMoreProps} />}
      {pagingProps && (
        <ListPagination
          gotoPage={(page: number) => onPageChange && onPageChange(page, pagingProps.pageSize)}
          setPageSize={(size: number, pageIndex) => onPageChange && onPageChange(pageIndex ?? pagingProps.pageIndex, size)}
          pageSize={pagingProps.pageSize}
          pageIndex={pagingProps.pageIndex}
          pageTotal={pagingProps.pageTotal}
          pageCount={pagingProps.pageCount}
          sx={sxPaging}
        />
      )}
    </Stack>
  );
};

export default ListTable;
