import { find } from 'lodash';
import React, { useMemo } from 'react';

import * as keyNames from '@analytic/report/config/keyNames';
import { Report } from '@analytic/report/types/reports';
import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { PageLayoutSectionField } from '@base/types/pagelayout';
import { Paging } from '@base/types/response';
import { VisibilityOutlined } from '@mui/icons-material';
import { Checkbox } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import { columnRenderRemap } from './Helper';
import ListGridCard from '@analytic/report/containers/ListGridCard';

interface BodyProps<T> {
  isSplitMode: boolean;
  category: string;
  fields: PageLayoutSectionField[];
  itemsList: T[];
  paging?: Paging | undefined;
  checkedIds: string[];
  onPreview: (data: any) => void;
  onChecked: (checkedIds: string[]) => void;
  refetch: () => void;
}

const Body = (props: BodyProps<Report>) => {
  const { isSplitMode, category, fields, itemsList, paging, checkedIds, onChecked, refetch, onPreview } = props;
  const { listType, settingColumns, filterValues, setSort, setPaging, paging: cPaging, getViewingFields } = useListPageSettings(category);

  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const tableFields = viewingFields.map((_ele: any) => ({
    ..._ele,
    enableSorting: true,
    width: _ele.keyName === 'photo' ? '100px' : 'auto'
  }));

  const getMapColumns = () => {
    return columnRenderRemap(category);
  };

  const tableColumns = useMemo<ColumnDef<any>[]>(() => {
    let newColumns: ColumnDef<any>[] = [
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
      ...makeTable8Columns(tableFields, getMapColumns(), { category }, [keyNames.REPORT_REPORTING_CONTENT])
    ];

    if (!!find(tableFields, (v) => v.keyName === keyNames.REPORT_REPORTING_CONTENT)) {
      newColumns = [
        ...newColumns,
        {
          id: keyNames.REPORT_REPORTING_CONTENT,
          width: '100px',
          header: ({ table }) => <span>Preview</span>,
          cell: ({ row }: any) => {
            return (
              <VisibilityOutlined
                sx={{ ':hover': { color: '#07f' } }}
                fontSize="small"
                color="secondary"
                onClick={() => {
                  onPreview && onPreview(row.original);
                }}
              />
            );
          }
        } as ColumnDef<any>
      ];
    }

    return newColumns;
  }, [tableFields, checkedIds]);
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
              return <ListGridCard iSplitMode={listType === ListType.SPLIT} {...props} category={category} onPreview={onPreview} />;
            }}
          </ListGrid>
        );
      default:
        return <ListTable {...listTableProps} />;
    }
  };

  const ListBodyMemo = useMemo(() => {
    return getTypeBody(listType);
  }, [itemsList, isSplitMode, fields, viewingFields, listType, checkedIds]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
