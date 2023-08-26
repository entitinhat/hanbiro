import { useEffect, useMemo, useState } from 'react';
import PageToolbar from './Toolbar';
import PageHeader from './Header';
import PageBody from './Body';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { LIST_STALE_TIME } from '@base/config/constant';
import { MENU_DESK_TICKET } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import { configFields, listLayoutColumns } from '@desk/ticket/config/list-field/columns';
import { FilterInput } from '@base/types/common';
import { LabelValueIcon, ListType } from '@base/types/app';
import { useTicketList } from '@desk/ticket/hooks/useTicketList';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import BottomToolbar from './BottomToolbar';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import * as keyNames from '@desk/ticket/config/keyNames';
import _ from 'lodash';
import { isDeleteList } from './Helper';
import useDevice from '@base/hooks/useDevice';
import { BASE_FIELDS } from '@desk/ticket/config/list-field';

interface ListPageProps {
  isSplitMode: boolean;
  isShowToolbar?: boolean;
}
const COLUMNS_NOT_SORTABLE = [keyNames.KEY_TICKET_ASSIGN_USER, keyNames.KEY_TICKET_CC_USERS, keyNames.KEY_TICKET_CLASSIFICATION];
const TicketListPage = (props: ListPageProps) => {
  const { isSplitMode, isShowToolbar = true } = props;
  const category = MENU_DESK_TICKET;

  const { filterValues, listType, settingColumns, filterQuery, keyword, sort, paging, setSettingColumns } = useListPageSettings(category);

  //write recoil

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { isMobile } = useDevice();

  const groupBy = isMobile ? 'all' : filterValues?.groupBy;
  const groupByDelete = isDeleteList(groupBy);

  const layoutMenu = MENU_DESK_TICKET;
  const { data: listLayoutData } = usePageLayoutByMenu(layoutMenu, 'list');
  const groupByAll = groupBy == 'all' || groupBy == 'my' || groupBy == 'myGroup' || groupByDelete;
  const { listQuerySchema, fields } = useMemo(() => {
    let fields = [];
    if (groupByAll) {
      if (listLayoutData && listLayoutData.data) {
        fields = listLayoutData.data;
      }
    } else {
      fields = listLayoutColumns?.[groupBy];
    }
    if (fields)
      fields = fields.map((_ele: any) => {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          //disableSortBy: _.includes(COLUMNS_NOT_SORTABLE, _ele.keyName) ? true : !_ele.sortable
          enableSorting: _.includes(COLUMNS_NOT_SORTABLE, _ele.keyName) ? false : _ele.sortable ?? true,
          isDisabled: BASE_FIELDS.includes(_ele.keyName)
        };
      });
    let listQuerySchema = buildListSchema({ fields, configFields });
    listQuerySchema = [listQuerySchema, 'isRead'].join('\n');
    return { fields, listQuerySchema };
  }, [listLayoutData, groupBy]);
  // list filters
  const filtersQuery: FilterInput = {
    keyword: keyword ?? '',
    // sort: sort,
    paging: paging,
    query: filterQuery
  };

  const { data: listData, refetch } = useTicketList(
    listQuerySchema,
    {
      filter: filtersQuery
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME,
      enabled: fields?.length > 0
    }
  );
  const columnsSettingProps: ColumnsSettingProps = {
    columns: settingColumns,
    onChange: (newColumns: ColumnSetting[]) => {
      const nColumns = newColumns.map((_ele: any) => {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          // disableSortBy: _.includes(COLUMNS_NOT_SORTABLE, _ele.keyName) ? true : !_ele.sortable
          enableSorting: _.includes(COLUMNS_NOT_SORTABLE, _ele.keyName) ? false : _ele.sortable ?? true
        };
      });
      setSettingColumns(nColumns);
    }
  };

  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  useEffect(() => {
    setSelectedIds([]);
  }, [category]);

  useEffect(() => {
    if (fields?.length > 0) {
      setSettingColumns([...fields]);
    }
  }, [fields, groupBy]);

  const rowIds = listData?.data?.map((v) => v.id) ?? [];
  const allCheckingProps: AllCheckingProps = {
    rowIds,
    checkedIds: selectedIds,
    onToggle: (ids) => {
      setSelectedIds(ids);
    }
  };
  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar isSplitMode={isSplitMode} category={category} onRefresh={refetch} />;
  }, [isSplitMode, fields, filterQuery, category, selectedIds]);

  const PageHeaderMemo = useMemo(() => {
    return (
      <PageHeader
        isSplitMode={isSplitMode}
        category={category}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT || isMobile ? allCheckingProps : undefined}
        onRefresh={refetch}
      />
    );
  }, [isSplitMode, listType, groupBy, settingColumns, isMobile, rowIds]);
  //================================Debug=======================
  // console.log('settingColumns', settingColumns);
  // console.log('filterQuery', filterQuery);
  // console.log('filterValues', filterValues);

  //================================End debug====================
  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        onCancel={() => handleOnChecked([])}
        onReload={refetch}
      />
    );
  }, [listData, filterQuery, fields, category, selectedIds, isMobile]);

  const BottomToolbarMemo = useMemo(() => {
    return (
      <BottomToolbar
        category={category}
        checkedIds={selectedIds}
        onCancel={() => handleOnChecked([])}
        isGroupByDeleted={groupByDelete}
        refetch={refetch}
      />
    );
  }, [selectedIds]);

  return (
    <>
      <ListContainer>
        {isShowToolbar && PageToolbarMemo}
        {PageHeaderMemo}
        {PageBodyMemo}
        {!groupByDelete && BottomToolbarMemo}
      </ListContainer>
    </>
  );
};

export default TicketListPage;
