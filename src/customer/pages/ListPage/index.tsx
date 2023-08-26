import React, { useState, useMemo, useEffect } from 'react';

//third-party
import _ from 'lodash';
import { useMatch, useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

//project
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ListContainer } from '@base/components/@hanbiro/List';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { MENU_CUSTOMER } from '@base/config/menus';
import { ListType } from '@base/types/app';
//import { listLayoutColumns } from '@customer/config/list-field/columns';
import useDevice from '@base/hooks/useDevice';

//menu
import { KEY_NAME_CUSTOMER_CATEGORY, KEY_NAME_CUSTOMER_ID } from '@customer/config/keyNames';
import { useCustomers } from '@customer/hooks/useCustomers';
import * as keyNames from '@customer/config/keyNames';
import { isDeleteList } from '@customer/pages/ListPage/Helper';
import { CUSTOMER_CATEGORY_ACCOUNT, CUSTOMER_CATEGORY_ALL, CUSTOMER_CATEGORY_CONTACT } from '@customer/config/constants';
import { BASE_FIELDS, CUSTOMER_GROUP_BY_DELETED, FIELDS_GROUP_BY, HIDDEN_FIELDS_GROUP_BY } from '@customer/config/list-field';

//local
import PageFilter from './Filter';
import PageToolbar from './Toolbar';
import PageBody from './Body';
import FloatToolbar from './FloatToolbar';

interface ListPageProps {
  isSplitMode: boolean;
}

const ListPage = ({ isSplitMode }: ListPageProps) => {
  //hooks
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  //router
  const params = useParams();
  let layoutCategory = CUSTOMER_CATEGORY_ACCOUNT; //router category
  const matchAll = useMatch('/customer/all/*');
  const matchAccount = useMatch('/customer/account/*');
  const matchContact = useMatch('/customer/contact/*');
  if (matchAll) {
    layoutCategory = CUSTOMER_CATEGORY_ALL;
  }
  if (matchAccount) {
    layoutCategory = CUSTOMER_CATEGORY_ACCOUNT;
  }
  if (matchContact) {
    layoutCategory = CUSTOMER_CATEGORY_CONTACT;
  }
  //state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  //get page setting
  const pageDataKey = `${MENU_CUSTOMER}_${layoutCategory}`;
  const { filterValues, listType: cListType, settingColumns, setSettingColumns, getViewingFields } = useListPageSettings(pageDataKey);
  let listType = matchesSm ? ListType.GRID : cListType;
  const groupBy = filterValues?.groupBy;
  const isDeletedGroupBy = isDeleteList(groupBy);
  //hardcode showing fields by group by filter
  let groupByFields: string[] = [];
  const FIELDS_GROUP_BY_CATEGORY = FIELDS_GROUP_BY[layoutCategory];
  Object.keys(FIELDS_GROUP_BY_CATEGORY).map((_key: string) => {
    if (_key === groupBy) {
      groupByFields = FIELDS_GROUP_BY_CATEGORY[_key];
    }
  });

  /*===================================== HOOK ===================================== */
  //get pagelayout
  let { data: listLayoutData, isLoading: isLayoutLoading } = usePageLayoutByMenu(pageDataKey, 'list');

  //get pagelayout columns
  const { fields, viewingFields } = useMemo(() => {
    let fields: any = [];
    if (listLayoutData && listLayoutData.data) {
      fields = [...listLayoutData.data];
    }
    fields = fields.map((_ele: any) => {
      return {
        ..._ele,
        isViewing: _ele.defaultViewInList,
        disableSortBy: !_ele.sortable
      };
    });

    //select showing fields on list
    let viewingFields: any = [];
    if (fields?.length > 0) {
      const groupBySettingColumns = settingColumns.map((_ele: any) => {
        return {
          ..._ele,
          isViewing: groupByFields.includes(_ele.keyName)
        };
      });
      const groupbyViewingFields = getViewingFields(fields, groupBySettingColumns); //hard-code config
      const settingViewingFields = getViewingFields(fields, settingColumns); //pagelayout config
      if (groupBy === CUSTOMER_GROUP_BY_DELETED) {
        viewingFields = groupbyViewingFields;
        //add more 2 fields: deletedAt, deletedBy to setting columns (similar to updatedBy and updatedAt)
        const deletedAt = settingColumns.find((_ele: any) => _ele.keyName === keyNames.KEY_NAME_CUSTOMER_UPDATED_AT);
        const deletedBy = settingColumns.find((_ele: any) => _ele.keyName === keyNames.KEY_NAME_CUSTOMER_UPDATED_BY);
        if (deletedAt) {
          viewingFields.push({
            ...deletedAt,
            keyName: keyNames.KEY_NAME_CUSTOMER_DELETED_AT,
            name: keyNames.KEY_NAME_CUSTOMER_DELETED_AT,
            languageKey: 'Deleted At',
            title: 'Deleted At',
            isViewing: true
          });
        }
        if (deletedBy) {
          viewingFields.push({
            ...deletedAt,
            keyName: keyNames.KEY_NAME_CUSTOMER_DELETED_BY,
            name: keyNames.KEY_NAME_CUSTOMER_DELETED_BY,
            languageKey: 'Deleted By',
            title: 'Deleted By',
            isViewing: true
          });
        }
      } else {
        const diffFields = settingViewingFields.filter(
          (_ele1: any) => !groupbyViewingFields.map((_ele2: any) => _ele2.keyName).includes(_ele1.keyName)
        );
        viewingFields = groupByFields.length > 0 ? [...diffFields, ...groupbyViewingFields] : settingViewingFields;
        //hide fields if existing in config
        const hiddenFieldsGroupBy = HIDDEN_FIELDS_GROUP_BY[layoutCategory][groupBy];
        if (hiddenFieldsGroupBy && hiddenFieldsGroupBy.length > 0) {
          viewingFields = viewingFields.filter((_ele: any) => !hiddenFieldsGroupBy.includes(_ele.keyName));
        }
      }
    }
    return { fields, viewingFields };
  }, [listLayoutData, isDeletedGroupBy, groupBy, settingColumns]);

  //set setting columns
  useEffect(() => {
    // if (fields?.length > 0) {
    //   const settingColumnKeys = settingColumns.map((_ele: any) => _ele.keyName);
    //   const fieldKeys = fields.map((_ele: any) => _ele.keyName);
    //   if (settingColumns.length === 0 || settingColumnKeys.join(',') !== fieldKeys.join(',')) {
    //     setSettingColumns([...fields]);
    //   }
    // }
    if (listLayoutData && listLayoutData.data) {
      let allFields: any = [...listLayoutData.data];
      allFields = allFields.map((_ele: any) => {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList || groupByFields.includes(_ele.keyName),
          defaultViewInList: _ele.defaultViewInList || groupByFields.includes(_ele.keyName), //reset default view
          disableSortBy: !_ele.sortable,
          isDisabled: BASE_FIELDS.includes(_ele.keyName)
        };
      });
      setSettingColumns([...allFields]);
    }
  }, [listLayoutData, groupByFields]); //fields

  //get list data
  const { data: listData, isFetching: isDataFetching, refetch } = useCustomers(layoutCategory, viewingFields);

  //check rows
  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  //delete selected rows
  const handleOnDeleteCheckedRow = (ids: string[]) => {
    handleOnChecked([]);
  };

  //change field to show
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
      <PageFilter
        isSplitMode={isSplitMode}
        category={layoutCategory}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT || isMobile ? allCheckingProps : undefined}
        onRefresh={refetch}
      />
    );
  }, [isSplitMode, layoutCategory, listData, selectedIds, settingColumns, groupBy]);

  //body
  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={layoutCategory}
        fields={fields} //all
        viewingFields={viewingFields}
        itemsList={listData?.data || []}
        paging={listData?.paging}
        selectedIds={selectedIds}
        onChecked={handleOnChecked} //for table
        onReload={refetch}
        onCancel={() => handleOnChecked([])}
      />
    );
  }, [isSplitMode, layoutCategory, listData, fields, selectedIds, groupBy]);

  //float toolbar
  const FloatToolbarMemo = useMemo(() => {
    return (
      <FloatToolbar
        category={layoutCategory}
        checkedIds={selectedIds}
        itemsList={listData?.data || []}
        isGroupByDeleted={isDeletedGroupBy}
        onCancel={() => handleOnChecked([])}
        onReload={refetch}
      />
    );
  }, [listData, selectedIds]);

  //track get list and go to first order view
  useEffect(() => {
    //if first load and split = true, go to first item view, router
    if (params?.id === undefined && isSplitMode && listData?.data) {
      const [firstOrder] = listData.data;
      let custCategory =
        firstOrder[KEY_NAME_CUSTOMER_CATEGORY] === 'CATEGORY_ACCOUNT' ? CUSTOMER_CATEGORY_ACCOUNT : CUSTOMER_CATEGORY_CONTACT;
      const url =
        layoutCategory === CUSTOMER_CATEGORY_ALL
          ? `/${MENU_CUSTOMER}/${layoutCategory}/${firstOrder[KEY_NAME_CUSTOMER_ID]}/${custCategory}`
          : `/${MENU_CUSTOMER}/${layoutCategory}/${firstOrder[KEY_NAME_CUSTOMER_ID]}`;
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
