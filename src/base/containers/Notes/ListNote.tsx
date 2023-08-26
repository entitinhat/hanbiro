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
import { NoteQuickView } from '../QuickView';
import { useTranslation } from 'react-i18next';
//portal for dragging
let portal = document.createElement('tbody');
document.body.appendChild(portal);

interface ListNoteProps {
  itemsList: any[];
  fields: any;
  paging: any;
  setPaging: (value: any) => void;
  handleDragDrop?: (item: any) => void;
  menuSourceId: string;
  isRecent?: boolean;
}

const ListNote = (props: ListNoteProps) => {
  const { itemsList, fields, paging, setPaging, handleDragDrop, menuSourceId, isRecent = false } = props;

  const theme = useTheme();
  const [sort, setSort] = useState<any>({ field: '', orderBy: ASC });
  const [openQuickView, setOpenQuickView] = useState(false);
  const [contentQuickView, setContentQuickView] = useState<any>('');
  const { t } = useTranslation();
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
    () => [
      {
        id: 'moveicon',
        width: '24px',
        minWidth: '24px',
        minSize: 8,
        size: 32,
        header: ({ table }) => <></>,
        cell: ({ row }) => (
          <DragIndicatorIcon
            sx={{ cursor: 'move', p: 0, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 16 }}
            fontSize="small"
          />
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(), { category, isRecent }, [])
    ],
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
      isDraggable: true,
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
        {openQuickView && (
          <NoteQuickView
            content={contentQuickView[0].content}
            isOpen={openQuickView}
            title={t('ncrm_desk_ticket_recent_notes')}
            handleClose={() => setOpenQuickView(false)}
          />
        )}
      </>
    );
  }, [itemsList, tableColumns, sort, openQuickView]);

  return <>{TableMemo}</>;
};

export default ListNote;
