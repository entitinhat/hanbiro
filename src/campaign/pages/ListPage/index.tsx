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
import { MENU_CAMPAIGN } from '@base/config/menus';
import { ListType } from '@base/types/app';
import useDevice from '@base/hooks/useDevice';

//menu
import { KEY_CAMPAIGN_CATEGORY, KEY_CAMPAIGN_ID } from '@campaign/config/keyNames';
import { useCampaigns } from '@campaign/hooks/useCampaigns';
import { isDeleteList } from '@campaign/pages/ListPage/Helper';
import { listLayoutColumns } from '@campaign/config/list-field/columns';
import {
  CAMPAIGN_CATEGORY_ALL,
  CAMPAIGN_CATEGORY_EMAIL,
  CAMPAIGN_CATEGORY_SMS,
  CAMPAIGN_CATEGOTY_ENUM_EMAIL
} from '@campaign/config/constants';

//local
import Header from './Header';
import Toolbar from './Toolbar';
import Body from './Body';
import FloatToolbar from './FloatToolbar';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = ({ isSplitMode }: ListPageProps) => {
  //router
  const params = useParams();
  let layoutCategory = CAMPAIGN_CATEGORY_EMAIL; //router category
  const matchAll = useMatch('/campaign/all/*');
  const matchEmail = useMatch('/campaign/email/*');
  const matchSms = useMatch('/campaign/sms/*');
  if (matchAll) {
    layoutCategory = CAMPAIGN_CATEGORY_ALL;
  }
  if (matchEmail) {
    layoutCategory = CAMPAIGN_CATEGORY_EMAIL;
  }
  if (matchSms) {
    layoutCategory = CAMPAIGN_CATEGORY_SMS;
  }

  //state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  //get page setting
  const pageDataKey = `${MENU_CAMPAIGN}_${layoutCategory}`;
  const { filterValues, listType, settingColumns, setSettingColumns, getViewingFields } = useListPageSettings(pageDataKey);
  const groupBy = filterValues?.groupBy;
  const isDeletedGroupBy = isDeleteList(filterValues?.groupBy);

  /*===================================== HOOK ===================================== */
  //get pagelayout
  let { data: listLayoutData, isLoading: isLayoutLoading } = usePageLayoutByMenu(pageDataKey, 'list');

  //get pagelayout columns
  const { fields, viewingFields } = useMemo(() => {
    let fields = [];
    if (listLayoutData && listLayoutData.data) {
      if (isDeletedGroupBy) {
        fields = [...listLayoutData.data]; //...listLayoutColumns?.[groupBy] --> WHY USE THIS!?
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

    //fields for build schema
    let viewingFields: any = [];
    if (fields?.length > 0) {
      viewingFields = getViewingFields(fields, settingColumns);
    }

    return { fields, viewingFields };
  }, [listLayoutData, isDeletedGroupBy, groupBy]); //groupBy

  useEffect(() => {
    // set default for settingColumns
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns([...fields]);
    }
  }, [fields, groupBy]);

  //get list data
  const { data: listData, isFetching: isDataFetching, refetch } = useCampaigns(layoutCategory, viewingFields);

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

  //all record ids of current page
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
      <Toolbar
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
      <Header
        isSplitMode={isSplitMode}
        category={layoutCategory}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT || isMobile ? allCheckingProps : undefined}
        // moreMenuProps={{
        //   items: CUSTOMER_TOOLBAR_MORE_OPTIONS,
        //   onChange: (key: LabelValueIcon) => { console.log('more toolbar key selected', key) }
        // }}
        onRefresh={refetch}
        onCancel={() => handleOnChecked([])}
      />
    );
  }, [isSplitMode, layoutCategory, listData, selectedIds, settingColumns]);

  //body
  const PageBodyMemo = useMemo(() => {
    return (
      <Body
        isSplitMode={isSplitMode}
        category={layoutCategory}
        fields={fields} //viewingFields
        itemsList={listData?.data || []}
        paging={listData?.paging}
        selectedIds={selectedIds}
        onChecked={handleOnChecked} //for table
        //onGridChecked={setSelectedIds} //for grid
        onCancel={() => handleOnChecked([])}
      />
    );
  }, [isSplitMode, layoutCategory, listData, fields, selectedIds]);

  //float toolbar
  const FloatToolbarMemo = useMemo(() => {
    return (
      <FloatToolbar
        category={layoutCategory}
        checkedIds={selectedIds}
        itemsList={listData?.data || []}
        //onClick={handleFloatBarClick}
        onCancel={() => handleOnChecked([])}
        onReload={refetch}
        isGroupByDeleted={isDeletedGroupBy}
      />
    );
  }, [listData, selectedIds]);

  //track get list and go to first order view
  useEffect(() => {
    //if first load and split = true, go to first item view, router
    if (params?.id === undefined && isSplitMode && listData?.data) {
      const [firstOrder] = listData.data;
      let custCategory =
        firstOrder[KEY_CAMPAIGN_CATEGORY] === CAMPAIGN_CATEGOTY_ENUM_EMAIL ? CAMPAIGN_CATEGORY_EMAIL : CAMPAIGN_CATEGORY_SMS;
      const url =
        layoutCategory === CAMPAIGN_CATEGORY_ALL
          ? `/${MENU_CAMPAIGN}/${layoutCategory}/${firstOrder[KEY_CAMPAIGN_ID]}/${custCategory}`
          : `/${MENU_CAMPAIGN}/${layoutCategory}/${firstOrder[KEY_CAMPAIGN_ID]}`;
      navigate(url);
    }
  }, [layoutCategory, listData]);

  //main
  return (
    <ListContainer>
      {PageToolbarMemo}
      {PageHeaderMemo}
      {PageBodyMemo}
      {!isDeletedGroupBy && FloatToolbarMemo}
    </ListContainer>
  );
};

export default ListPage;
