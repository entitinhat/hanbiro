import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';

import { MENU_SALES, MENU_LEAD } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ListType } from '@base/types/app';
import { ListContainer } from '@base/components/@hanbiro/List';
import useDevice from '@base/hooks/useDevice';

import { listLayoutColumns, configFields } from '@lead/config/list-field/columns';
import * as keyNames from '@lead/config/keyNames';
import { useGetLeads } from '@lead/hooks/useGetLeads';
import Toolbar from './Toolbar';
import Header from './Header';
import Body from './Body';
import BottomToolbar from './BottomToolbar';
import { isDeleteList } from './Helper';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;
  const layoutKey: string = `${MENU_SALES}_${MENU_LEAD}`;

  // state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const params = useParams();
  const navigate = useNavigate();
  const { isMobile } = useDevice();

  // recoil: pagelayout, setting columns
  const { filterValues, listType, settingColumns, keyword, sort, paging, filterQuery, setSettingColumns } = useListPageSettings(layoutKey);
  const { data: listLayoutData } = usePageLayoutByMenu(layoutKey, 'list');

  const groupBy = filterValues?.groupBy;
  const groupByAll = groupBy == 'all';
  const groupByDelete = isDeleteList(groupBy);

  // === fields, listQuerySchema ===
  const COLUMNS_NOT_SORTABLE = [''];
  const { listQuerySchema, fields } = useMemo(() => {
    let fields: any[] = [];
    if (listLayoutData && listLayoutData.data) {
      if (groupByAll) {
        fields = listLayoutData.data; // page-layout
        // fields = listLayoutColumns?.[groupBy]; // fixed
      } else {
        fields = listLayoutColumns?.[groupBy];
      }
    }
    if (listType == ListType.GRID || listType == ListType.SPLIT) {
      fields = listLayoutColumns?.['gridSplit'];
    }

    let listQuerySchema = '';
    fields = fields?.map((_ele: any) => {
      if (_ele?.keyName) {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          disableSortBy: false
          // disableSortBy: !_ele.sortable
        };
      }
    });

    // if (!_.isEmpty(fields)) {
    // listQuerySchema = buildListSchema({ fields, configFields });
    // }
    return { listQuerySchema, fields };
  }, [listLayoutData, groupBy, listType]);

  const { data: listData, isFetching: isDataFetching, refetch } = useGetLeads(layoutKey, fields);

  console.log('listData', listData);
  

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

  // const handleOnDeleteCheckedRow = (ids: string[]) => {
  //   mDelete.mutate({ ids: ids });
  //   handleOnChecked([]);
  // };

  useEffect(() => {
    if (fields?.length > 0) {
      setSettingColumns([...fields]);
    }
  }, [fields]);

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
        category={MENU_LEAD}
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
        allCheckingProps={listType === ListType.GRID || isSplitMode || isMobile ? allCheckingProps : undefined}
        checkedIds={allCheckingProps.checkedIds}
        totalItem={listData?.paging?.totalItems}
        onCancel={() => {
          handleOnChecked([]);
        }}
      />
    );
  }, [listData, isSplitMode, listType, settingColumns, selectedIds]);

  const BodyMemo = useMemo(() => {
    return (
      <Body
        isSplitMode={isSplitMode}
        category={MENU_LEAD}
        fields={listType === ListType.LIST ? fields?.filter((field: any) => field?.keyName  != keyNames.KEY_LEAD_PRIORITIZE) : fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging ?? {}}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        onCancel={() => {
          handleOnChecked([]);
        }}
        refetch={refetch}
        isPrioritize={ settingColumns?.find((field: any) => field?.keyName  == keyNames.KEY_LEAD_PRIORITIZE)?.isViewing || false }
      />
    );
  }, [listData, filterQuery, fields, selectedIds, isSplitMode, settingColumns]);

  const BottomToolbarMemo = useMemo(() => {
    return (
      <BottomToolbar
        isSplitMode={listType === ListType.SPLIT}
        itemsList={listData?.data || []}
        checkedIds={selectedIds}
        onCancel={() => handleOnChecked([])}
        onReload={refetch}
      />
    );
  }, [selectedIds, listData, listType]);

  // if first load and split = true, go to first/undefined item view, router
  // useEffect(() => {
  //   if (params?.id === undefined && isSplitMode) {
  //     const url = `/${MENU_LEAD}/id`;
  //     navigate(url);
  //   }
  // }, [isSplitMode]);

  return (
    <ListContainer>
      {ToolbarMemo}
      {HeaderMemo}
      {BodyMemo}
      {!groupByDelete && BottomToolbarMemo}
    </ListContainer>
  );
};

export default ListPage;
