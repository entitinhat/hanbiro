import { useEffect, useMemo, useState } from 'react';

//Material-UI
import { useMediaQuery, useTheme } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import {} from '@mui/material';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { ColumnDef } from '@tanstack/react-table';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { columnRenderRemap } from './Helper';
import { ASC, DESC } from '@base/config/constant';
// import { NoteQuickView } from '../QuickView';
//portal for dragging
let portal = document.createElement('tbody');
document.body.appendChild(portal);

interface ListProductURLsProps {
  itemsList: any[];
  fields: any;
  paging?: any;
  setPaging?: (value: any) => void;
  handleDragDrop?: (item: any) => void;
  menuSourceId?: string;
  isRecent?: boolean;
}

const ListProductURLs = (props: ListProductURLsProps) => {
  const { itemsList, fields, paging, setPaging, handleDragDrop, menuSourceId, isRecent = false } = props;
  console.log('🚀 ~ file: ListNote.tsx:30 ~ ListProducts ~ itemsList:', itemsList);

  const theme = useTheme();

  const getMapColumns = () => {
    return columnRenderRemap(category, menuSourceId, itemsList);
  };

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: paging?.itemPerPage || 10,
    pageIndex: paging?.currentPage || 1
  };

  const category = '';
  const tableFields = useMemo(() => {
    let newFields: any[] = [];
    fields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: _ele.sortable
      });
    });
    return newFields;
  }, [fields]);

  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [...makeTable8Columns(tableFields, getMapColumns(), { category, isRecent }, [])],
    [tableFields, isRecent]
  );

  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: itemsList || [],
      columns: tableColumns
    };
    return (
      <>
        <ListTable
          {...listTableProps}
          sx={{
            width: '100%',
            px: 0,
            mb: 0,
            '& .MuiTableContainer-root': {
              overflowX: 'inherit'
            }
          }}
        />
      </>
    );
  }, [itemsList, tableColumns]);

  return <>{TableMemo}</>;
};

export default ListProductURLs;
