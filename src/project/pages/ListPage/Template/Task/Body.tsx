import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { ListBody } from '@base/components/@hanbiro/List';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_PROJECT_TEMPLATE } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { Paging } from '@base/types/response';
import { useMediaQuery, useTheme } from '@mui/material';
import { taskTemplateOpenAtom } from '@project/store/atoms/template';
import { TaskTemplate } from '@project/types/template';
import { ColumnDef } from '@tanstack/react-table';

import { columnRenderRemap } from './Helper';

interface BodyProps {
  category: string;
  fields: any[];
  itemsList: TaskTemplate[];
  paging: Paging;
}

const Body = (props: BodyProps) => {
  console.log('Template Page > Body');
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { category, fields, itemsList, paging } = props;
  const [taskTemplateOpen, setTaskTemplateOpen] = useRecoilState(taskTemplateOpenAtom);

  const pageDataKey = `${MENU_PROJECT_TEMPLATE}_${category}`;
  const { listType: cListType, paging: cPaging, setSort, setPaging } = useListPageSettings(pageDataKey);
  const listType = matchesSm ? ListType.GRID : cListType;

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const EditFn = useCallback((id: string) => {
    setTaskTemplateOpen({ open: true, id: id });
  }, []);

  const DeleteFn = useCallback((id: string) => {
    console.log(id);
  }, []);

  const getMapColumns = () => {
    return columnRenderRemap(EditFn, DeleteFn);
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
  }, [fields, taskTemplateOpen.open]);

  const tableColumns = useMemo<ColumnDef<any>[]>(() => makeTable8Columns(tableFields, getMapColumns(), {}, []), [tableFields]);

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.itemPerPage ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
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
  }, [itemsList, fields, listType, tableColumns]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
