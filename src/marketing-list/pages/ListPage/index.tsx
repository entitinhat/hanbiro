import React, { useState, useMemo, useEffect } from 'react';

//third-party
import _ from 'lodash';
import { useMatch, useNavigate, useParams } from 'react-router-dom';

//project
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListContainer } from '@base/components/@hanbiro/List';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { MENU_CUSTOMER } from '@base/config/menus';
import { ListType } from '@base/types/app';
import { isDeleteList } from '@marketing-list/pages/ListPage/Helper';
import { listLayoutColumns } from '@marketing-list/config/list-field/columns';

//menu
import { useMarketingLists } from '@marketing-list/hooks/useMarketingLists';
import ListBottomToolbar from '@marketing-list/containers/ListBottomToolbar';

//local
import PageHeader from './Header';
import PageToolbar from './Toolbar';
import PageBody from './Body';
import useDevice from '@base/hooks/useDevice';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = ({ isSplitMode }: ListPageProps) => {
  //router
  const params = useParams();
  let layoutCategory = 'marketing_list'; //router category

  //state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  //get page setting
  const pageDataKey = `${MENU_CUSTOMER}_${layoutCategory}`;
  const { filterValues, listType, settingColumns, setSettingColumns, getViewingFields } = useListPageSettings(pageDataKey);
  const groupBy = filterValues?.groupBy;
  const groupByDelete = isDeleteList(filterValues?.groupBy);
  /*===================================== HOOK ===================================== */
  //get pagelayout
  let { data: listLayoutData, isLoading: isLayoutLoading } = usePageLayoutByMenu(pageDataKey, 'list');
  console.log('listLayoutData: ', listLayoutData);

  //get pagelayout columns
  const { fields, viewingFields } = useMemo(() => {
    let fields = [];
    if (listLayoutData && listLayoutData.data) {
      if (groupByDelete) {
        fields = [...listLayoutData.data, ...listLayoutColumns?.[groupBy]];
      } else {
        fields = listLayoutData.data;
      }
    }

    fields = fields.map((_ele: any) => {
      return {
        ..._ele,
        isViewing: _ele.defaultViewInList,
        disableSortBy: !_ele.sortable
      };
    });

    // fields for build schema
    let viewingFields: any = [...fields];
    // if (fields?.length > 0) {
    //   viewingFields = getViewingFields(fields, settingColumns);
    // }

    return { fields, viewingFields };
  }, [listLayoutData, groupByDelete, groupBy]); //groupBy

  useEffect(() => {
    // set default for settingColumns
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns([...fields]);
    }
  }, [fields, groupBy]);

  //get list data
  const { data: listData, isFetching: isDataFetching, refetch } = useMarketingLists(layoutCategory, viewingFields);

  //check rows
  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  //delete selected rows
  const handleOnDeleteCheckedRow = (ids: string[]) => {
    //mDelete({ ids });
    handleOnChecked([]);
  };

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

  /** ============================ RENDER ================================ */
  //toolbar
  const PageToolbarMemo = useMemo(() => {
    return (
      <PageToolbar
        isSplitMode={isSplitMode}
        category={layoutCategory}
        onRefresh={refetch}
        onDelete={!!selectedIds?.length ? () => handleOnDeleteCheckedRow(selectedIds) : undefined}
      />
    );
  }, [isSplitMode, layoutCategory, selectedIds]);

  //header
  const PageHeaderMemo = useMemo(() => {
    return (
      <PageHeader
        isSplitMode={isSplitMode}
        category={layoutCategory}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT || isMobile ? allCheckingProps : undefined}
        onRefresh={refetch}
        //onChange={handleOnChange}
        groupBy={groupBy}
      />
    );
  }, [isSplitMode, layoutCategory, listData, selectedIds, settingColumns, groupBy]);

  //body
  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={layoutCategory}
        fields={fields} //viewingFields
        itemsList={listData?.data || []}
        // itemsList={isDeleteList(groupBy) ? marketing_delete_list_dummy_data || [] : marketing_dummy_data || []}
        paging={listData?.paging}
        selectedIds={selectedIds}
        onChecked={handleOnChecked} //for table
        //onGridChecked={setSelectedIds} //for grid
        groupBy={groupBy}
      />
    );
  }, [isSplitMode, layoutCategory, listData, fields, selectedIds, groupBy]);

  //float toolbar
  const FloatToolbarMemo = useMemo(() => {
    return (
      <ListBottomToolbar
        category={layoutCategory}
        checkedIds={selectedIds}
        itemsList={listData?.data || []}
        //onClick={handleFloatBarClick}
        onCancel={() => handleOnChecked([])}
        onReload={refetch}
        isGroupByDeleted={groupByDelete}
      />
    );
  }, [listData, selectedIds]);

  //track get list and go to first order view
  // useEffect(() => {
  //   //if first load and split = true, go to first item view, router
  //   if (params?.id === undefined && isSplitMode && listData?.data) {
  //     const [firstOrder] = listData.data;
  //     let custCategory = firstOrder[KEY_NAME_CUSTOMER_CATEGORY] === 'CATEGORY_ACCOUNT' ? 'account' : 'contact';
  //     const url =
  //       layoutCategory === 'all'
  //         ? `/${MENU_CUSTOMER}/${layoutCategory}/${firstOrder[KEY_NAME_CUSTOMER_ID]}/${custCategory}`
  //         : `/${MENU_CUSTOMER}/${layoutCategory}/${firstOrder[KEY_NAME_CUSTOMER_ID]}`;
  //     navigate(url);
  //   }
  // }, [layoutCategory, listData]);

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
