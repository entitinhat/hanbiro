import React, { useMemo } from 'react';

//third-party
import { ColumnDef } from '@tanstack/react-table';
import { useTranslation } from 'react-i18next';

//project
import { MENU_SETTING_LANDINGPAGE } from '@base/config/menus';
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

//menu
import * as keyNames from '@settings/digital/landing-page/config/keyNames';
import ListGridCard from '@settings/digital/landing-page/containers/ListGridCard';
import { getMapColumns, getMapColumnsInSplitMode } from './Helper';
import { columnRenderRemap } from './Helper';

interface BodyProps {
  isSplitMode: boolean;
  category: string;
  isFetching?: boolean;
  fields: any[];
  itemsList: any[];
  itemsListSplitView: any[];
  paging: any;
  selectedIds: string[];
  onChecked: (val: string[]) => void;
  onRefresh?: any;
}

const PageBody = (props: BodyProps) => {
  const {
    isSplitMode,
    category, //router category
    isFetching,
    fields, //--> viewing fields
    itemsList,
    itemsListSplitView,
    paging,
    selectedIds,
    onChecked,
    onRefresh
  } = props;
  const { t } = useTranslation();
  //state
  const pageDataKey = MENU_SETTING_LANDINGPAGE;
  const { listType, setSort, setPaging, paging: cPaging } = useListPageSettings(pageDataKey);

  //config disable sortBy columns
  const disableSortByColumns = [
    keyNames.KEY_NAME_LANDING_PAGE_NAME,
    keyNames.KEY_NAME_LANDING_PAGE_TYPE,
    keyNames.KEY_NAME_LANDING_PAGE_LANGUAGE,
    keyNames.KEY_NAME_LANDING_PAGE_STAGE,
    keyNames.KEY_NAME_LANDING_PAGE_PUBLISH,
    keyNames.KEY_NAME_LANDING_PAGE_TITLE,
    keyNames.KEY_NAME_LANDING_PAGE_TEMPLATE,
    keyNames.KEY_NAME_LANDING_PAGE_ASSIGN_TO,
    keyNames.KEY_NAME_LANDING_PAGE_PRODUCT
  ];

  const hideColumns = [keyNames.KEY_NAME_LANDING_PAGE_NAME];

  // const columnsByGrid = [
  //   keyNames.KEY_NAME_LANDING_PAGE_NAME,
  //   keyNames.KEY_NAME_LANDING_PAGE_TYPE,
  //   keyNames.KEY_NAME_LANDING_PAGE_LANGUAGE,
  //   keyNames.KEY_NAME_LANDING_PAGE_STAGE,
  //   keyNames.KEY_NAME_LANDING_PAGE_CREATED_AT
  // ];

  // const gridFieldsInSplitMode: any[] = [];
  // columnsByGrid.map((_col: string) => {
  //   fields.map((_ele: any) => {
  //     if (_ele.name === _col) {
  //       gridFieldsInSplitMode.push(_ele);
  //     }
  //   });
  // });

  //paging change
  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  //fields for table
  const tableFields = fields.map((_ele: any) => ({
    ..._ele,
    enableSorting: !disableSortByColumns.includes(_ele.keyName)
    // width: _ele.keyName === keyNames.KEY_NAME_CUSTOMER_PHOTO ? '100px' : 'auto'
  }));

  //build columns for table v8
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

  const getColumns = () => {
    return columnRenderRemap(category);
  };

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        const listGridProps: ListGridProps = {
          rows: itemsListSplitView || [],
          checkedIds: selectedIds,
          onRowChecked: onChecked,
          pagingProps,
          onPageChange: handlePagingChange,
          columns: fields,
          columnRenderRemap: getColumns,
          hideColumns,
          isSmall: isSplitMode,
          // onChecked: onChecked,
          // onRefresh:onRefresh,
          children: () => <></>
        };

        return (
          <ListGrid {...listGridProps}>
            {(props) => {
              return <ListGridCard {...props} category={category} />;
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
