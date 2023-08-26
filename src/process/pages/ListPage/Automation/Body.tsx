import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { useRecoilState } from 'recoil';

import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_PROCESS } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { Paging } from '@base/types/response';
import { useMediaQuery, useTheme } from '@mui/material';
import { KEY_NAME_AUTOMATION_CREATED_AT, KEY_NAME_AUTOMATION_DESCRIPTION, KEY_NAME_AUTOMATION_MODE } from '@process/config/keyNames';
import { automationOpenAtom } from '@process/store/atoms/automation';
import { AutomationRule } from '@process/types/automation';
import { ColumnDef } from '@tanstack/react-table';

import { columnRenderRemap } from './Helper';

interface BodyProps {
  category: string;
  fields: any[];
  isSplitMode: boolean;
  itemsList: AutomationRule[];
  paging: Paging;
}

const Body = (props: BodyProps) => {
  console.log('AutomationPage > Body');
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const { isSplitMode, category, fields, itemsList, paging } = props;
  const [automationOpen, setAutomationOpen] = useRecoilState(automationOpenAtom);

  const pageDataKey = `${MENU_PROCESS}_${category}`;
  const { listType: cListType, paging: cPaging, setSort, setPaging } = useListPageSettings(pageDataKey);
  const listType = matchesSm ? ListType.GRID : cListType;

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const EditFn = useCallback((data: AutomationRule) => {
    console.log('editfn', data);
    setAutomationOpen({ open: true, data: data });
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
      if (
        automationOpen.open &&
        _.includes([KEY_NAME_AUTOMATION_DESCRIPTION, KEY_NAME_AUTOMATION_CREATED_AT, KEY_NAME_AUTOMATION_MODE], _ele.keyName)
      )
        return;
      newFields.push({
        ..._ele,
        enableSorting: true,
        width: _ele.keyName === 'name' ? '30% !important' : 'auto'
      });
    });
    return newFields;
  }, [fields, automationOpen.open]);

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
