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
//portal for dragging
let portal = document.createElement('tbody');
document.body.appendChild(portal);

interface ListProductsProps {
  itemsList: any[];
  fields: any;
  paging: any;
  setPaging: (value: any) => void;
  handleDragDrop?: (item: any) => void;
  menuSourceId: string;
  isRecent?: boolean;
}

const ListProducts = (props: ListProductsProps) => {
  const { itemsList, fields, paging, setPaging, handleDragDrop, menuSourceId, isRecent = false } = props;

  const theme = useTheme();
  const [sort, setSort] = useState<any>({ field: '', orderBy: ASC });
  const [openQuickView, setOpenQuickView] = useState(false);
  const [contentQuickView, setContentQuickView] = useState<any>('');
  // const [rowValue, setRowValue] = useState<boolean>(false);
  // const {mSortNote} = useNoteMutation()

  const getMapColumns = () => {
    return columnRenderRemap(category, menuSourceId, itemsList);
  };

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: paging?.itemPerPage || 10,
    pageIndex: paging?.currentPage || 1
  };

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const handleQuickView = (view: any) => {
    setOpenQuickView(true);
    const itemView = itemsList.filter((item: any) => item.id === view.id);
    setContentQuickView(itemView);
  };

  const category = '';
  const tableFields = useMemo(() => {
    let newFields: any[] = [];
    fields.forEach((_ele: any) => {
      newFields.push({
        ..._ele,
        enableSorting: _ele.sortable,
        width: _ele.keyName === 'id' ? '16px' : 'auto'
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
      //   checkedIds,
      //   onRowChecked: onChecked,
      pagingProps,
      onPageChange: handlePagingChange,
      columns: tableColumns,
      onSortBy: (clName: any, isSorted: any) => {
        if (isSorted !== false) {
          let orderBy = isSorted === 'desc' ? DESC : ASC;
          setSort({ field: clName, orderBy: orderBy });
        }
      },
      // isDraggable: true,
      sxPaging: {
        my: '0px !important',
        borderBottom: '1px solid' + theme.palette.divider
      },
      handleDragDrop: handleDragDrop,
      handleQuickView: handleQuickView
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
  }, [itemsList, tableColumns, sort, openQuickView]);

  return <>{TableMemo}</>;
};

export default ListProducts;
