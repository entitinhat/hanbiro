import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

import { MENU_ITEM, MENU_PRODUCT_ITEM } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import { DESC, LIST_STALE_TIME } from '@base/config/constant';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { FilterInput, SortInput } from '@base/types/common';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ListType } from '@base/types/app';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { ListContainer } from '@base/components/@hanbiro/List';
import { listLayoutColumns, configFields, disabledColumns } from '@product/item/config/list-field/columns';
import { useItemList } from '@product/item/hooks/useItemList';
import { useProductMutation } from '@product/product/hooks/useProductMutation';

import Toolbar from './Toolbar';
import Header from './Header';
import Body from './Body';
import BottomToolbar from './BottomToolbar';
import useDevice from '@base/hooks/useDevice';
import { isDeleteList } from './Helper';
import { RESTORE_SCHEMA } from '@base/utils/helpers/schema';
import { useItemMutation } from '@product/item/hooks/useItemMutation';
interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;

  // state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // recoil: pagelayout, setting columns
  const layoutKey: string = MENU_PRODUCT_ITEM;
  const { data: listLayoutData } = usePageLayoutByMenu(layoutKey, 'list');
  const {
    filterValues,
    listType: cListType,
    settingColumns,
    keyword,
    sort,
    paging,
    filterQuery,
    setListType,
    setSettingColumns
  } = useListPageSettings(layoutKey);

  const groupBy = filterValues?.groupBy;
  const groupByAll = groupBy == 'all';
  const groupByDelete = groupBy == 'deletedItem';
  const groupByPerProd = groupBy == 'itemPerProduct1';
  const { isMobile } = useDevice();
  const listType = isMobile ? ListType.GRID : cListType;

  // === fields, listQuerySchema ===
  const COLUMNS_NOT_SORTABLE = [''];
  const deleteSort: SortInput = {
    field: 'deletedAt',
    orderBy: DESC
  };
  const { listQuerySchema, fields, isDeleteGroup, nlistType } = useMemo(() => {
    let fields: any[] = [];
    let isDeleteGroup = isDeleteList(groupBy);
    let nlistType = listType == ListType.GRID || listType == ListType.SPLIT ? 'gridSplit' : 'list';
    if (groupByAll) {
      if (listLayoutData && listLayoutData.data) {
        fields = listLayoutData.data;
      }
    } else {
      fields = listLayoutColumns?.[groupBy];
    }

    if (listType == ListType.GRID || listType == ListType.SPLIT) {
      fields = listLayoutColumns?.['gridSplitItem'];
    }

    let listQuerySchema = '';
    fields = fields.map((_ele: any) => {
      if (_ele?.keyName) {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          disableSortBy: !_ele.sortable,
          isDisabled: disabledColumns.includes(_ele?.keyName)
        };
      }
    });

    if (!_.isEmpty(fields)) {
      listQuerySchema = buildListSchema({ fields, configFields });
    }

    listQuerySchema = [listQuerySchema, 'isRead', RESTORE_SCHEMA].join('\n');
    return { listQuerySchema, fields, isDeleteGroup, nlistType };
  }, [listLayoutData, groupBy, listType]);

  // === hook: get list data ===
  const { results: listData, refetch } = useItemList(
    listQuerySchema,
    {
      filter: {
        keyword: keyword ?? '',
        sort: isDeleteGroup ? deleteSort : sort,
        paging: paging,
        query: filterQuery
      } as FilterInput,
      listType: nlistType
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME,
      enabled: !!fields?.length
    }
  );

  const { listQueryKey } = useListQueryKeys(layoutKey);

  const { mDelete } = useItemMutation([...listQueryKey, nlistType]);

  const columnsSettingProps: ColumnsSettingProps = {
    columns: settingColumns,
    onChange: (newColumns: ColumnSetting[]) => {
      const nColumns = newColumns.map((_ele: any) => {
        if (_ele?.keyName) {
          return {
            ..._ele,
            isViewing: _ele?.defaultViewInList
          };
        }
      });
      setSettingColumns(nColumns);
    }
  };

  // === set default for settingColumns ===
  useEffect(() => {
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns([...fields]);
    }
  }, [fields]);

  const handleOnChecked = (checkedIds: string[]) => {
    console.log('...ITEM.handleOnChecked...', checkedIds);
    setSelectedIds(checkedIds);
  };

  const handleOnDeleteCheckedRow = (ids: string[]) => {
    mDelete.mutate({ ids: ids });
    handleOnChecked([]);
  };

  useEffect(() => {
    if (!isDeleteGroup) {
      handleOnChecked([]);
    }
  }, [isDeleteGroup]);

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

  const ToolbarMemo = useMemo(() => {
    return (
      <Toolbar
        isSplitMode={isSplitMode}
        category={MENU_ITEM}
        onRefresh={refetch}
        onDelete={!!selectedIds?.length ? () => handleOnDeleteCheckedRow(selectedIds) : undefined}
      />
    );
  }, [isSplitMode, fields, filterQuery, selectedIds]);

  const HeaderMemo = useMemo(() => {
    return (
      <Header
        isSplitMode={isSplitMode}
        onRefresh={refetch}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
      />
    );
  }, [listData, isSplitMode, listType, settingColumns, selectedIds]);

  const BodyMemo = useMemo(() => {
    return (
      <Body
        isSplitMode={isSplitMode}
        category={MENU_ITEM}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging ?? {}}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        refetch={refetch}
        onCancel={() => handleOnChecked([])}
        isRowSpanned={groupByPerProd}
      />
    );
  }, [listData, filterQuery, fields, selectedIds, isSplitMode]);

  const BottomToolbarMemo = useMemo(() => {
    return (
      <BottomToolbar
        nlistType={nlistType}
        listData={listData?.data || []}
        checkedIds={selectedIds}
        onCancel={() => handleOnChecked([])}
        refetch={refetch}
      />
    );
  }, [selectedIds, listData, nlistType]);

  //==============================================================DEBUG=====================================================================
  console.log('RENDERING...');
  //=======================================================================================================================================
  return (
    <ListContainer>
      {ToolbarMemo}
      {HeaderMemo}
      {BodyMemo}
      {!isDeleteGroup && BottomToolbarMemo}
    </ListContainer>
  );
};

export default ListPage;
