import React, { Suspense, useMemo } from 'react';

import * as keyNames from '@activity/config/keyNames';
import Calendar from '@activity/containers/Calendar';
import KanbanBoard from '@activity/containers/Kanban';
import ListGridCard from '@activity/containers/ListGridCard';
import { ListBody } from '@base/components/@hanbiro/List';
import ListGrid, { ListGridProps } from '@base/components/@hanbiro/List/ListGrid';
import { ListPaginationProps } from '@base/components/@hanbiro/List/ListPagination';
import ListTable, { ListTableProps } from '@base/components/@hanbiro/List/ListTable';
import { makeTable8Columns } from '@base/components/@hanbiro/ReactTable8/Helper';
import { ASC, DESC, LIST_TABLE_PAGE_SIZE } from '@base/config/constant';
import { MENU_ACTIVITY, MENU_MYWORK } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { GroupType, ListType } from '@base/types/app';
import { Checkbox, useMediaQuery, useTheme } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';

import { columnRenderRemap } from './Helper';
import _ from 'lodash';
import ListTableGrouping from '@base/components/@hanbiro/List/ListTableGroup';
import { configMovingColumnsByKey, getConfigRowSpannedByField } from '@base/components/@hanbiro/List/helper';
import { useTranslation } from 'react-i18next';
import * as activitiesGroupBy from '@activity/config/list-field/activitiesGroupBy';

interface BodyProps {
  [x: string]: any;
}

const Body = (props: BodyProps) => {
  const { isSplitMode, category, fields, itemsList, paging = {}, checkedIds, onChecked } = props;

  const pageDataKey = `${MENU_ACTIVITY}_${category}`;
  const {
    settingColumns,
    filterValues,
    listType: cListType,
    paging: cPaging,
    setSort,
    setPaging,
    getViewingFields
  } = useListPageSettings(pageDataKey);
  const theme = useTheme();
  const { t } = useTranslation();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const listType = matchesSm ? ListType.GRID : cListType;

  const configItemsList = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      from: item?.from ? item.from[0] : { id: '0', name: '' }
    };
  });

  // config Items List to ListTableGrouping
  const configItemsListGroup = itemsList.map((item: any, index: number) => {
    return {
      ...item,
      from: item?.from ? item.from[0].name : t('ncrm_common_unassigned')
    };
  });

  const groupBy = filterValues?.groupBy;

  const isFieldGrouping = groupBy === activitiesGroupBy.MY_GROUP_ACTIVITY_1;
  const isFieldGrouping2 = groupBy === activitiesGroupBy.MY_GROUP_ACTIVITY_2;

  //what group type
  let selectedGroupType = isFieldGrouping ? GroupType.ROWSPAN : isFieldGrouping2 ? GroupType.ROWGROUP : '';
  let groupKeyName = '';
  switch (groupBy) {
    case activitiesGroupBy.MY_GROUP_ACTIVITY_1:
    case activitiesGroupBy.MY_GROUP_ACTIVITY_2:
      groupKeyName = keyNames.KEY_NAME_ACTIVITY_FROM;
      break;
    default:
      // groupKeyName = keyNames.KEY_NAME_CUSTOMER_CREATED_BY;
      break;
  }

  let viewingFields: any = [];

  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }

  const handlePagingChange = (page: number, size: number) => {
    setPaging({ page, size });
  };

  const getMapColumns = () => {
    return columnRenderRemap(category);
  };

  const tableFields = useMemo(() => {
    let newFields: any[] = [];
    viewingFields.forEach((_ele: any) => {
      if (category == MENU_ACTIVITY && keyNames.KEY_NAME_ACTIVITY_STATUS == _ele.name) {
        return;
      }
      if (
        !_.includes(
          [keyNames.KEY_NAME_ACTIVITY_TYPE, keyNames.KEY_NAME_ACTIVITY_DIRECTION, keyNames.KEY_NAME_ACTIVITY_CREATED_AT],
          _ele.name
        )
      )
        newFields.push({
          ..._ele,
          enableSorting: true,
          width: _ele.keyName === 'photo' ? '100px' : _ele.keyName === 'subject' ? '30%' : 'auto'
        });
    });
    return newFields;
  }, [viewingFields, category]);

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
      ...makeTable8Columns(tableFields, getMapColumns(), { category }, [])
    ],
    [tableFields, category, checkedIds]
  );

  const pagingProps: ListPaginationProps = {
    pageTotal: paging?.totalPage || 1,
    pageCount: paging?.totalItems || 0,
    pageSize: !!cPaging?.size ? cPaging?.size : paging?.size ?? LIST_TABLE_PAGE_SIZE,
    pageIndex: paging?.currentPage || 1
  };

  //render table list
  const TableMemo = useMemo(() => {
    const listTableProps: ListTableProps = {
      rows: selectedGroupType === GroupType.ROWSPAN ? getConfigRowSpannedByField(configItemsList, groupKeyName, 'name') : itemsList || [],
      checkedIds: checkedIds,
      onRowChecked: onChecked,
      pagingProps,
      onPageChange: handlePagingChange,
      columns: selectedGroupType === GroupType.ROWSPAN ? configMovingColumnsByKey(tableColumns, groupKeyName) : tableColumns,
      onSortBy: (clName: any, isSorted: any) => {
        if (isSorted !== false) {
          let orderBy = isSorted === 'desc' ? DESC : ASC;
          setSort({ field: clName, orderBy: orderBy });
        }
      },
      isRowSpanned: selectedGroupType === GroupType.ROWSPAN
    };
    return <ListTable {...listTableProps} />;
  }, [itemsList, tableColumns, checkedIds, groupBy, isFieldGrouping]);

  //Table Group by keyName
  const renderTableGroupByKeyName = (keyName: string, keyOptionValue: string | null = null, keyOptionLabel: string | null = null) => {
    const defaultTableProps: ListTableProps = {
      rows: [],
      checkedIds: checkedIds,
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
      // isRowSpanned: false
    };

    return (
      <ListTableGrouping
        tableProps={defaultTableProps}
        data={configItemsListGroup}
        groupKey={keyName} //if data id object, need {value, label}
        groupKeyValue={keyOptionValue ? keyOptionValue : undefined}
        groupKeyLabel={keyOptionLabel ? keyOptionLabel : undefined}
      />
    );
  };

  const getTypeBody = (listType: ListType) => {
    switch (listType) {
      case ListType.GRID:
      case ListType.SPLIT:
        const listGridProps: ListGridProps = {
          rows: itemsList || [],
          checkedIds,
          onRowChecked: onChecked,
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
              return <ListGridCard isSplitMode={listType === ListType.SPLIT} {...props} category={category} />;
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
        return selectedGroupType === GroupType.ROWGROUP ? renderTableGroupByKeyName(groupKeyName) : TableMemo;
    }
  };

  const ListBodyMemo = useMemo(() => {
    return getTypeBody(listType);
  }, [itemsList, isSplitMode, fields, viewingFields, listType, checkedIds]);

  return <ListBody>{ListBodyMemo}</ListBody>;
};

export default Body;
