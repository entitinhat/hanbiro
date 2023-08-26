import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

// project import
import { DESC } from '@base/config/constant';
import { MENU_PRODUCT_UNIT, MENU_UNIT } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import { LIST_STALE_TIME } from '@base/config/constant';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { FilterInput } from '@base/types/common';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ListType } from '@base/types/app';
import { ListContainer } from '@base/components/@hanbiro/List';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';
import { 
  listLayoutColumns, 
  configFields 
} from '@product/unit/config/list-field/columns';
import { useItemList } from '@product/item/hooks/useItemList';

// menu import
import { useBaseUnitList } from '@product/unit/hooks/useBaseUnitList';
// import { default as configFields } from '@product/unit/config/view-field';

import Toolbar from './Toolbar';
import Header from './Header';
import Body from './Body';
import BottomToolbar from './BottomToolbar';
import useDevice from '@base/hooks/useDevice';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;

  // state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // recoil: pagelayout, setting columns
  const layoutKey: string = MENU_PRODUCT_UNIT;
  const { data: listLayoutData } = usePageLayoutByMenu(layoutKey, 'list');
  const {
    filterValues,
    listType: cListType,
    settingColumns,
    keyword,
    sort,
    paging,
    filterQuery,
    setSettingColumns
  } = useListPageSettings(layoutKey);
  const groupBy = filterValues?.groupBy;
  const groupByProdPerUnit = groupBy == 'prodPerUnit';
  const { isMobile } = useDevice();
  const listType = isMobile ? ListType.GRID : cListType;
  // === fields, listQuerySchema ===
  const { listQuerySchema, fields } = useMemo(() => {
    let fields: any[] = [];
    fields = listLayoutColumns?.[groupBy];

    let listQuerySchema = '';
    fields = fields.map((_ele: any) => {
      if (_ele?.keyName) {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          disableSortBy: !_ele.sortable
        };
      }
    });

    if (!_.isEmpty(fields)) {
      const customSchema = `createdAt
        createdBy{
          id
          name
          fullName
        }
      `;
      listQuerySchema = buildListSchema({ fields, configFields, ignore: [], customSchema });
    }
    listQuerySchema = [listQuerySchema,'isRead'].join("\n")
    return { listQuerySchema, fields };
  }, [listLayoutData, groupBy]);

  // === hook: get list data ===
  const { results: listData, refetch } = groupByProdPerUnit ?
  useItemList(
        listQuerySchema,
        {
          filter: {
            keyword: keyword ?? '',
            sort: {
              field : "unitId",
              orderBy: DESC
            },
            paging: paging,
            query: filterQuery?.replace(`groupBy="prodPerUnit"`,`groupBy="all"`) // replace to call API of ITEM list
          } as FilterInput
        },
        {
          keepPreviousData: true,
          staleTime: LIST_STALE_TIME,
          enabled: !!fields?.length
        }
      )
  : 
  useBaseUnitList(
        listQuerySchema,
        {
          filter: {
            keyword: keyword ?? '',
            sort: sort,
            paging: paging,
            query: filterQuery
          } as FilterInput
        },
        {
          keepPreviousData: true,
          staleTime: LIST_STALE_TIME,
          enabled: !!fields?.length
        }
      );

      console.log('listDataUnit', listData);
      

  // const { listQueryKey } = useListQueryKeys(layoutKey);
  // const { mDelete } = useProductMutation(listQueryKey);

  // === set default for settingColumns ===
  useEffect(() => {
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns([...fields]);
    }
  }, [fields]);

  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  // const handleOnDeleteCheckedRow = (ids: string[]) => {
  //   mDelete.mutate({ ids: ids });
  //   handleOnChecked([]);
  // };

  const columnsSettingProps: ColumnsSettingProps = {
    columns: settingColumns,
    onChange: (newColumns: ColumnSetting[]) => {
      const nColumns = newColumns.map((_ele: any) => {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          disableSortBy: !_ele.sortable
        };
      });
      setSettingColumns([...nColumns]);
    }
  };

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
        category={MENU_UNIT}
        onRefresh={refetch}
        // onDelete={!!selectedIds?.length ? () => handleOnDeleteCheckedRow(selectedIds) : undefined}
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
        category={MENU_UNIT}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging ?? {}}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        refetch={refetch}
        isRowSpanned={groupByProdPerUnit}
      />
    );
  }, [listData, filterQuery, fields, selectedIds]);

  const BottomToolbarMemo = useMemo(() => {
    return <BottomToolbar checkedIds={selectedIds} onCancel={() => handleOnChecked([])} refetch={refetch} />;
  }, [selectedIds, listData]);

  return (
    <ListContainer>
      {ToolbarMemo}
      {HeaderMemo}
      {BodyMemo}
      {BottomToolbarMemo}
    </ListContainer>
  );
};

export default ListPage;
