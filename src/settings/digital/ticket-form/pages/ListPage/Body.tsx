import React, { useMemo } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';

//project
import { ListBody } from '@base/components/@hanbiro/List';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListType } from '@base/types/app';
import { DESC, ASC, LIST_TABLE_PAGE_SIZE, LANGUAGES } from '@base/config/constant';

//material
import { Checkbox } from '@mui/material';

import TicketFormListGridCard from '@settings/digital/ticket-form/components/TicketFormListGridCard'; //custom
import { getMapColumns } from './Helper';
import { columnRenderRemap } from './Helper';
import { MENU_SETTING_TICKET_FORM } from '@base/config/menus';

interface BodyProps {
  isSplitMode: boolean;
  category: string;
  isFetching?: boolean;
  fields: any[];
  itemsList: any[];
  paging: any;
  selectedIds: string[];
  onChecked: (val: string[]) => void;
}

const PageBody = (props: BodyProps) => {
  const {
    isSplitMode,
    category, //router category
    isFetching,
    fields, //--> viewing fields
    itemsList,
    paging,
    selectedIds,
    onChecked
  } = props;
  const { t } = useTranslation();
  //state
  const pageDataKey = `setting_${category}`;
  const { listType, setSort, setPaging, paging: cPaging } = useListPageSettings(pageDataKey);

  //config disable sortBy columns
  const disableSortByColumns: string[] = [];
  const hideColumns: string[] = [];

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  //fields for table
  const tableFields = fields.map((_ele: any) => ({
    ..._ele,
    enableSorting: !disableSortByColumns.includes(_ele.keyName)
    //width: 'auto'
  }));

  //build columns for table v8
  const mapColumns = getMapColumns(LANGUAGES);
  const tableColumns = useMemo<ColumnDef<any>[]>(
    () => [
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
            />
          </div>
        )
      },
      ...makeTable8Columns(tableFields, getMapColumns(LANGUAGES), { category }, [])
    ],
    [tableFields, selectedIds]
  );

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.size ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  console.log('fields', fields);
  console.log('category', category);

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        const listGridProps: ListGridProps = {
          rows: itemsList || [], //###
          checkedIds: selectedIds,
          onRowChecked: onChecked,
          pagingProps,
          onPageChange: handlePagingChange,
          columns: fields, //isSplitMode ? gridFieldsInSplitMode : fields,
          columnRenderRemap: mapColumns, //isSplitMode ? getMapColumnsInSplitMode(category) : getMapColumns(category),
          hideColumns,
          isSmall: isSplitMode,
          children: () => <></>
        };

        return (
          <ListGrid {...listGridProps}>
            {(props) => {
              return <TicketFormListGridCard {...props} category={category} />;
            }}
          </ListGrid>
        );
      default:
        const listTableProps: ListTableProps = {
          rows: itemsList || [],
          checkedIds: selectedIds,
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
        return <ListTable {...listTableProps} />;
    }
  };

  const ListBodyMemo = useMemo(() => {
    return getTypeBody(listType);
  }, [itemsList, isSplitMode, fields, listType, selectedIds]);

  //main
  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default PageBody;
