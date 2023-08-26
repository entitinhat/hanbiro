import React, { useMemo } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

//project
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ReactTable8 } from '@base/components/@hanbiro/ReactTable8';
import { Ticket } from '@desk/ticket/types/ticket';
import { columnRenderRemap } from '@desk/ticket/pages/ListPage/Helper';
import { DESC, ASC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import * as keyNames from '@customer/config/keyNames';
import { Typography } from '@mui/material';

interface BodyProps {
  category: string;
  fields: any[];
  itemsList: Ticket[];
  paging: any;
  filter: any;
  setFilter: (val: any) => void;
}

const PageBody = (props: BodyProps) => {
  const {
    category, //router category
    fields,
    itemsList,
    paging,
    filter,
    setFilter
  } = props;
  const { t } = useTranslation();
  //state

  //config disable sortBy columns
  const disableSortByColumns: string[] = [];

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    const newListFilter = {
      ...filter,
      paging: { page, size }
    };
    setFilter(newListFilter);
  };

  //set filter sort param
  const setSort = (sort: any) => {
    let newFilter = {
      ...filter,
      sort: sort
    };
    setFilter(newFilter);
  };

  //fields for table
  const tableFields = fields.map((_ele: any) => ({
    ..._ele,
    enableSorting: !disableSortByColumns.includes(_ele.keyName),
    width: _ele.keyName === keyNames.KEY_NAME_CUSTOMER_PHOTO ? '100px' : 'auto'
  }));

  const getColumnRender = (extraParams: any) => {
    const { category } = extraParams;
    return {
      ...columnRenderRemap(category),
      subject(col: string, row: Ticket) {
        return (
          // <TicketTextView value={{ id: row.id, name: row.subject }} />
          <Typography variant="h6">{row.subject}</Typography>
        );
      }
    };
  };

  //build columns for table v8
  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [...makeTable8Columns(tableFields, getColumnRender({ category }), { category }, [])],
    [tableFields]
  );

  //v8
  const listTable8Props = {
    className: '',
    columns: tableColumns,
    data: itemsList || [],
    paging: {
      pageTotal: paging?.totalPage || 1,
      pageCount: paging?.totalItems || 0,
      pageSize: paging?.size || LIST_TABLE_PAGE_SIZE,
      pageIndex: paging?.currentPage || 1
    },
    onPageChange: handlePagingChange,
    //rowSelected: selectedIds,
    //onRowSelect: onChecked,
    onSortBy: (clName: any, isSorted: any) => {
      //isSorted from react-table-v8 that is false, 'asc' or 'desc'
      //// console.log('isSorted', isSorted);
      if (isSorted !== false) {
        let orderBy = isSorted === 'desc' ? DESC : ASC;
        setSort({ field: clName, orderBy: orderBy });
      }
    }
  };

  //v8: body
  const ListBodyMemo = useMemo(() => {
    return (
      <>
        <ReactTable8 {...listTable8Props} />
      </>
    );
  }, [itemsList, filter]);

  //main
  return <>{ListBodyMemo}</>;
};

export default PageBody;
