import React, { useState, useMemo, useEffect } from 'react';

//third-party
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';

//project
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListContainer } from '@base/components/@hanbiro/List';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ListType } from '@base/types/app';

//menu
import ListBottomToolbar from '@settings/digital/ticket-form/containers/ListBottomToolbar';
import { useTicketForms } from '@settings/digital/ticket-form/hooks/useTicketForms';

//local
import PageHeader from './Header';
import PageToolbar from './Toolbar';
import PageBody from './Body';
import { MENU_SETTING_TICKET_FORM } from '@base/config/menus';
import { MENU_SETTING } from '@base/config/menus';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;
  //router
  let layoutCategory = 'ticket_form'; //router category

  //state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  //get page setting
  const pageDataKey = `${MENU_SETTING}_${layoutCategory}`;
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

  //set default viewing columns
  useEffect(() => {
    // set default for settingColumns
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns([...fields]);
    }
  }, [fields]);

  //fields for build schema

  // console.log('settingColumns: ', settingColumns);
  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }
  // console.log('viewingFields: ', viewingFields);
  // console.log(viewingFields);

  //get list data
  const { data: listData, isFetching: isDataFetching, refetch } = useTicketForms(pageDataKey, viewingFields);
  // console.log('listData', listData);

  //check rows
  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  //delete selected rows
  const handleOnDeleteCheckedRow = (ids: string[]) => {
    //mDelete({ ids });
    handleOnChecked([]);
  };

  /** ============================ RENDER ================================ */
  //toolbar
  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar isSplitMode={isSplitMode} category="form" onRefresh={refetch} />;
  }, [isSplitMode, viewingFields, layoutCategory, selectedIds]);

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
        category={layoutCategory}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
        onRefresh={refetch}
      />
    );
  }, [isSplitMode, layoutCategory, viewingFields, listData, selectedIds]);

  console.log('viewingFields: ', viewingFields);
  //body
  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={layoutCategory}
        fields={viewingFields}
        itemsList={listData?.data || []}
        paging={listData?.paging}
        selectedIds={selectedIds}
        onChecked={handleOnChecked} //for table
        //onGridChecked={setSelectedIds} //for grid
      />
    );
  }, [isSplitMode, layoutCategory, listData, viewingFields, selectedIds]);

  //float toolbar
  const FloatToolbarMemo = useMemo(() => {
    return (
      <ListBottomToolbar
        category={layoutCategory}
        checkedIds={selectedIds}
        itemsList={listData?.data || []}
        onCancel={() => handleOnChecked([])}
        onReload={refetch}
      />
    );
  }, [selectedIds, listData]);

  //main
  return (
    <ListContainer>
      {PageToolbarMemo}
      {PageHeaderMemo}
      {PageBodyMemo}
      {FloatToolbarMemo}
    </ListContainer>
  );
};

export default ListPage;
