import _ from 'lodash';
import React, { Suspense, useMemo } from 'react';

import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_PROJECT } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { Paging } from '@base/types/response';
import { useMediaQuery, useTheme } from '@mui/material';
import Calendar from '@project/containers/Calendar';
import KanbanBoard from '@project/containers/Kanban';
import { Task } from '@project/types/task';
import { ColumnDef } from '@tanstack/react-table';

import { columnRenderRemap } from './Helper';

interface BodyProps {
  category: string;
  fields: any[];
  isSplitMode: boolean;
  itemsList: Task[];
  paging: Paging;
}

const Body = (props: BodyProps) => {
  console.log('ProjectPage > Body');
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const { isSplitMode, category, fields, itemsList, paging } = props;
  const pageDataKey = `${MENU_PROJECT}_${category}`;
  const { listType: cListType, paging: cPaging, setSort, setPaging } = useListPageSettings(pageDataKey);
  const listType = matchesSm ? ListType.GRID : cListType;

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const getMapColumns = () => {
    return columnRenderRemap();
  };

  const tableFields = useMemo(() => {
    let newFields: any[] = [];
    fields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: true,
        width: _ele.keyName === 'name' ? '30% !important' : 'auto'
      });
    });
    return newFields;
  }, [fields]);

  const tableColumns = useMemo<ColumnDef<any>[]>(() => makeTable8Columns(tableFields, getMapColumns(), {}, []), [tableFields]);

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.itemPerPage ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        const listGridProps: ListGridProps = {
          rows: itemsList || [],
          pagingProps,
          onPageChange: handlePagingChange,
          columns: fields,
          columnRenderRemap: getMapColumns(),
          isSmall: isSplitMode,
          children: () => <></>
        };
        return (
          <ListGrid {...listGridProps}>
            {(props) => {
              // return <ListGridCard {...props} category={category} />;
              return <></>;
            }}
          </ListGrid>
        );
      case ListType.CALENDAR:
        return (
          <Suspense fallback={<></>}>
            <Calendar category={category} />
          </Suspense>
        );
      case ListType.KANBAN:
        return (
          <Suspense fallback={<></>}>
            <KanbanBoard category={category} />
          </Suspense>
        );
      default:
        const listTableProps: ListTableProps = {
          rows: itemsList || [],
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
        return <ListTable {...listTableProps} />;
    }
  };

  const ListBodyMemo = useMemo(() => {
    return getTypeBody(listType);
  }, [itemsList, isSplitMode, fields, listType, tableColumns]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
