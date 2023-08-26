import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';

//base
import { MENU_PRODUCT, MENU_PRODUCT_PRODUCT } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { FilterInput, SortInput } from '@base/types/common';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ListType } from '@base/types/app';
import { ListContainer } from '@base/components/@hanbiro/List';
import { useListQueryKeys } from '@base/hooks/user-setting/useListQueryKeys';

//product
import { configFields, listLayoutColumns } from '@product/product/config/list-field/columns';
import { useProductMutation } from '@product/product/hooks/useProductMutation';
import { useProductList } from '@product/product/hooks/useProductList';

//local
import Header from './Header';
import Toolbar from './Toolbar';
import Body from './Body';
import BottomToolbar from './BottomToolbar';
import { isDeleteList } from './Helper';
import { DESC } from '@base/config/constant';
import useDevice from '@base/hooks/useDevice';
import { KEY_PRODUCT_NAME } from '@product/product/config/keyNames';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;

  // state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // recoil: pagelayout, setting columns
  const layoutKey: string = MENU_PRODUCT_PRODUCT;
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
  const { isMobile } = useDevice();
  const listType = isMobile ? ListType.GRID : cListType;

  // === fields, listQuerySchema ===
  const { listQuerySchema, fields, isDeleteGroup, nlistType } = useMemo(() => {
    let fields: any[] = [];
    let isDeleteGroup = isDeleteList(groupBy);
    let nlistType = listType == ListType.GRID || listType == ListType.SPLIT ? 'gridSplit' : 'list';
    let listQuerySchema = '';
    if (groupBy == 'all') {
      if (listLayoutData && listLayoutData.data) {
        fields = listLayoutData.data?.map((item: any) => {
          return {
            ...item,
            isDisabled: item?.keyName == KEY_PRODUCT_NAME ? true : false
          };
        });
      }
      // fields = listLayoutColumns?.[groupBy];
    } else {
      fields = listLayoutColumns?.[groupBy];
    }

    if (listType == ListType.GRID || listType == ListType.SPLIT) {
      fields = listLayoutColumns?.['gridSplitProduct'];
    }

    fields = fields?.map((_ele: any) => {
      return {
        ..._ele,
        isViewing: _ele?.defaultViewInList ?? false,
        enableSorting: false
      };
    });

    if (!_.isEmpty(fields)) {
      listQuerySchema = buildListSchema({ fields, configFields });
    }
    return { listQuerySchema, fields, isDeleteGroup, nlistType };
  }, [listLayoutData, groupBy, cListType, filterValues]);

  const deleteSort: SortInput = {
    field: 'deletedAt',
    orderBy: DESC
  };

  const { results: listData, refetch } = useProductList(
    listQuerySchema,
    {
      filter: {
        keyword: keyword ?? '',
        sort: isDeleteGroup ? deleteSort : sort,
        paging: paging,
        query: filterQuery
      } as FilterInput,
      opts: cListType
    },
    {}
  );

  const { listQueryKey } = useListQueryKeys(layoutKey);
  const { mDelete } = useProductMutation(listQueryKey);

  // === set default for settingColumns ===
  useEffect(() => {
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns([...fields]);
    }
  }, [fields, groupBy]);

  const handleOnChecked = (checkedIds: string[]) => {
    console.log('...PRODUCT.handleOnChecked...', checkedIds);
    setSelectedIds(checkedIds);
  };

  const handleOnDeleteCheckedRow = (ids: string[]) => {
    mDelete.mutate({ ids: ids });
    handleOnChecked([]);
  };

  useEffect(() => {
    if (fields?.length > 0) {
      setSettingColumns([...fields]);
    }
  }, [fields, groupBy]);

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
        category={MENU_PRODUCT}
        onRefresh={refetch}
        onDelete={!!selectedIds?.length ? () => handleOnDeleteCheckedRow(selectedIds) : undefined}
      />
    );
  }, [isSplitMode, fields, filterQuery, selectedIds, cListType]);

  const HeaderMemo = useMemo(() => {
    return (
      <Header
        isSplitMode={isSplitMode}
        onRefresh={refetch}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
      />
    );
  }, [listData, isSplitMode, listType, settingColumns, selectedIds, cListType]);

  const BodyMemo = useMemo(() => {
    return (
      <Body
        isSplitMode={isSplitMode}
        category={MENU_PRODUCT}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging ?? {}}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        refetch={refetch}
        onCancel={() => {
          handleOnChecked([]);
        }}
      />
    );
  }, [listData, filterQuery, fields, selectedIds, cListType]);

  const BottomToolbarMemo = useMemo(() => {
    return (
      <BottomToolbar
        isSplitMode={listType === ListType.SPLIT}
        listData={listData?.data || []}
        checkedIds={selectedIds}
        onCancel={() => handleOnChecked([])}
        refetch={refetch}
      />
    );
  }, [selectedIds, listData, listType, cListType]);

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
