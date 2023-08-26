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
import { getTableType, isDeleteList } from '@blocklist/pages/ListPage/Helper';
import { listLayoutColumns } from '@blocklist/config/list-field/columns';

//menu
import { KEY_NAME_CUSTOMER_CATEGORY, KEY_NAME_CUSTOMER_ID } from '@blocklist/config/keyNames';
import ListBottomToolbar from '@blocklist/containers/ListBottomToolbar';

//local
import PageHeader from './Header';
import PageToolbar from './Toolbar';
import PageBody from './Body';
import useDevice from '@base/hooks/useDevice';
import { block_dummy_data } from './dummy-data';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = ({ isSplitMode }: ListPageProps) => {
  //router
  let layoutCategory = 'block_list'; //router category

  //state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { isMobile } = useDevice();
  //get page setting
  const pageDataKey = `${MENU_CUSTOMER}_${layoutCategory}`;
  const { filterValues, listType, settingColumns, setSettingColumns } = useListPageSettings(pageDataKey);
  const groupBy = filterValues?.groupBy;
  const groupByDelete = isDeleteList(filterValues?.groupBy);
  const BlockList = ['allBlocks', , 'myBlockList', 'myGroupBlockList', 'blockListperCampaign', 'blockListperCustomer'];
  const groupByBlockList = BlockList.includes(groupBy);
  /*===================================== HOOK ===================================== */
  //get pagelayout
  let { data: listLayoutData, isLoading: isLayoutLoading } = usePageLayoutByMenu(pageDataKey, 'list');
  console.log('listLayoutData: ', listLayoutData);

  //get pagelayout columns
  const { fields } = useMemo(() => {
    let fields = [];
    if (listLayoutData && listLayoutData.data) {
      fields = listLayoutData.data;
    }

    fields = fields.map((_ele: any) => {
      return {
        ..._ele,
        isViewing: true,
        disableSortBy: !_ele.sortable
      };
    });

    return { fields };
  }, [listLayoutData, groupByDelete, groupBy, groupByBlockList]); //groupBy

  useEffect(() => {
    // set default for settingColumns
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns([...fields]);
    }
  }, [fields, groupBy]);

  //get list data
  // const { data: listData, isFetching: isDataFetching, refetch } = useCustomers('customer_account', []);
  const listData: any = [];
  const refetch = () => {};

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

  const rowIds = listData?.data?.map((v: any) => v.id) ?? [];
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
        // moreMenuProps={{
        //   items: CUSTOMER_TOOLBAR_MORE_OPTIONS,
        //   onChange: (key: LabelValueIcon) => { console.log('more toolbar key selected', key) }
        // }}
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
        // itemsList={listData?.data}
        itemsList={block_dummy_data || []}
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
