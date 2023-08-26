import React, { useState, useMemo, useEffect } from 'react';

//third-party
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';

//material
import Box from '@mui/material/Box';

//project
import { MENU_SETTING_LANDINGPAGE } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListContainer } from '@base/components/@hanbiro/List';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ListType } from '@base/types/app';

//menu
import { useLandingPages } from '@settings/digital/landing-page/hooks/useLandingPages';
import ListBottomToolbar from '@settings/digital/landing-page/containers/ListBottomToolBar';

//local
import PageHeader from './Header';
import PageToolbar from './Toolbar';
import PageBody from './Body';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = ({ isSplitMode }: ListPageProps) => {
  //router
  let routerCategory = 'landing-page'; //router category

  //state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  //get page setting

  const pageDataKey = MENU_SETTING_LANDINGPAGE;
  const { filterValues, listType, settingColumns, setSettingColumns, getViewingFields } = useListPageSettings(pageDataKey);
  const groupBy = filterValues?.groupBy;

  /*===================================== HOOK ===================================== */
  //get pagelayout
  let { data: listLayoutData, isLoading: isLayoutLoading } = usePageLayoutByMenu(pageDataKey, 'list');

  //get pagelayout columns
  const { fields } = useMemo(() => {
    let fields = [];
    if (listLayoutData && listLayoutData.data) {
      fields = listLayoutData.data;
    }
    fields = fields.map((_ele: any) => {
      return {
        ..._ele,
        isViewing: _ele.defaultViewInList,
        disableSortBy: !_ele.sortable
      };
    });
    return { fields };
  }, [listLayoutData, groupBy]);

  useEffect(() => {
    // set default for settingColumns
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns([...fields]);
    }
  }, [fields]);

  //fields for build schema
  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }

  //get list data for ListView
  // const { data: listData, isFetching: isDataFetching, refetch } = useLandingPages(pageDataKey, viewingFields);
  const { data: listData, isFetching: isDataFetching, refetch } = useLandingPages(pageDataKey, fields);

  //check rows
  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  //delete selected rows
  const handleOnDeleteCheckedRow = (ids: string[]) => {
    handleOnChecked([]);
  };

  /** ============================ RENDER ================================ */
  //toolbar
  const PageToolbarMemo = useMemo(() => {
    return (
      <PageToolbar
        isSplitMode={isSplitMode}
        category={routerCategory}
        onRefresh={refetch}
        onDelete={!!selectedIds?.length ? () => handleOnDeleteCheckedRow(selectedIds) : undefined}
        viewConfig={viewingFields}
        // templateGroup={'email'}
        // groupTemplate={{}}
      />
    );
  }, [isSplitMode, viewingFields, routerCategory, selectedIds]);

  //header
  const PageHeaderMemo = useMemo(() => {
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

    return (
      <PageHeader
        isSplitMode={isSplitMode}
        category={routerCategory}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
        onRefresh={refetch}
      />
    );
  }, [isSplitMode, routerCategory, viewingFields, listData, selectedIds]);

  //body
  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={routerCategory}
        fields={viewingFields}
        itemsList={listData?.data || []}
        itemsListSplitView={listData?.data || []}
        paging={listData?.paging}
        selectedIds={selectedIds}
        onChecked={handleOnChecked} //for table
        onRefresh={refetch}
        //onGridChecked={setSelectedIds} //for grid
      />
    );
  }, [isSplitMode, routerCategory, listData, viewingFields, selectedIds]);

  //float toolbar
  const FloatToolbarMemo = useMemo(() => {
    return (
      <ListBottomToolbar
        category={routerCategory}
        checkedIds={selectedIds}
        itemsList={listData?.data || []}
        onCancel={() => handleOnChecked([])}
        onReload={refetch}
        //onClick={handleFloatBarClick}
      />
    );
  }, [selectedIds, listData]);

  //main
  return (
    // <Box sx={{ pb: '40px', overflow: 'auto' }}>
    <ListContainer>
      {PageToolbarMemo}
      {PageHeaderMemo}
      {PageBodyMemo}
      {FloatToolbarMemo}
    </ListContainer>
    // </Box>
  );
};

export default ListPage;
