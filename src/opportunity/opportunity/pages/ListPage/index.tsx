import { useEffect, useMemo, useState } from 'react';

//third-party
import { useNavigate, useParams } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import _ from 'lodash';

//project
import useDevice from '@base/hooks/useDevice';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { MENU_OPPORTUNITY, MENU_OPPORTUNITY_OPPORTUNITY } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { ListType } from '@base/types/app';

//menu
import { useOpportunities } from '@opportunity/hooks/useOpportunities';
import { KEY_NAME_OPPORTUNITY_ID } from '@opportunity/config/keyNames';
import {
  OPPORTUNITY_GROUP_BY_PRODUCT,
  OPPORTUNITY_GROUP_BY_DELETED,
  FIELDS_GROUP_BY,
  HIDDEN_FIELDS_GROUP_BY,
  BASE_FIELDS
} from '@opportunity/config/list-field';
import { Opportunity } from '@opportunity/types/interfaces';
import * as keyNames from '@opportunity/config/keyNames';
import Toolbar from './Toolbar';
import Filter from './Filter';
import Body from './Body';
import FloatToolbar from './FloatToolbar';
import { isDeleteList } from './Helper';

interface ListPageProps {
  isSplitMode?: boolean;
}

const ListPage = ({ isSplitMode = false }: ListPageProps) => {
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const params = useParams();
  let layoutCategory = MENU_OPPORTUNITY; //router category

  //state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const { isMobile } = useDevice();
  //page setting
  const pageDataKey = MENU_OPPORTUNITY_OPPORTUNITY;
  const { filterValues, listType: cListType, settingColumns, setSettingColumns, getViewingFields } = useListPageSettings(pageDataKey);
  let listType = matchesSm ? ListType.GRID : cListType;
  const groupBy = filterValues?.groupBy;
  const isDeletedGroupBy = isDeleteList(groupBy);
  //hardcode showing fields by group by filter
  let groupByFields: string[] = [];
  Object.keys(FIELDS_GROUP_BY).map((_key: string) => {
    if (_key === groupBy) {
      groupByFields = FIELDS_GROUP_BY[_key];
    }
  });

  /*===================================== HOOK ===================================== */
  //get pagelayout
  const { data: listLayoutData } = usePageLayoutByMenu(pageDataKey, 'list');

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
      const groupbyViewingFields = getViewingFields(fields, groupBySettingColumns);
      const settingViewingFields = getViewingFields(fields, settingColumns);
      if (groupBy === OPPORTUNITY_GROUP_BY_DELETED) {
        viewingFields = groupbyViewingFields;
        //add more 2 fields: deletedAt, deletedBy to setting columns (similar to updatedBy and updatedAt)
        const deletedAt = settingColumns.find((_ele: any) => _ele.keyName === keyNames.KEY_NAME_OPPORTUNITY_UPDATED_AT);
        const deletedBy = settingColumns.find((_ele: any) => _ele.keyName === keyNames.KEY_NAME_OPPORTUNITY_UPDATED_BY);
        if (deletedAt) {
          viewingFields.push({
            ...deletedAt,
            keyName: keyNames.KEY_NAME_OPPORTUNITY_DELETED_AT,
            name: keyNames.KEY_NAME_OPPORTUNITY_DELETED_AT,
            languageKey: 'Deleted At',
            title: 'Deleted At',
            isViewing: true
          });
        }
        if (deletedBy) {
          viewingFields.push({
            ...deletedAt,
            keyName: keyNames.KEY_NAME_OPPORTUNITY_DELETED_BY,
            name: keyNames.KEY_NAME_OPPORTUNITY_DELETED_BY,
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
        const hiddenFieldsGroupBy = HIDDEN_FIELDS_GROUP_BY[groupBy];
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
      //console.log('allFields', allFields);
      setSettingColumns([...allFields]);
    }
  }, [listLayoutData, groupByFields]); //fields

  //get list data
  const { data: listData, isFetching: isDataFetching, refetch } = useOpportunities(viewingFields);

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
  const PageFilterMemo = useMemo(() => {
    return (
      <Filter
        isSplitMode={isSplitMode}
        category={layoutCategory}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
        onRefresh={refetch}
        //onCancel={() => handleOnChecked([])}
      />
    );
  }, [listData, layoutCategory, isSplitMode, listType, settingColumns, selectedIds]);

  //page body
  const PageBodyMemo = useMemo(() => {
    //convert product array to product single object
    let groupByProductData: any = [];
    listData?.data?.map((_ele: Opportunity) => {
      if (_ele[keyNames.KEY_NAME_OPPORTUNITY_PRODUCT] && _ele[keyNames.KEY_NAME_OPPORTUNITY_PRODUCT].length > 0) {
        _ele[keyNames.KEY_NAME_OPPORTUNITY_PRODUCT]?.map((_prod: any) => {
          const newEle = {
            ..._ele,
            [keyNames.KEY_NAME_OPPORTUNITY_PRODUCT]: { ..._prod }
          };
          groupByProductData.push(newEle);
        });
      } else {
        groupByProductData.push(_ele);
      }
    });
    //console.log('new data', groupByProductData);
    return (
      <Body
        isSplitMode={isSplitMode}
        category={layoutCategory}
        fields={fields || []}
        viewingFields={viewingFields}
        //itemsList={listData?.data || []}
        itemsList={
          groupBy === OPPORTUNITY_GROUP_BY_PRODUCT || groupBy === OPPORTUNITY_GROUP_BY_DELETED ? groupByProductData : listData?.data || []
        }
        paging={listData?.paging || {}}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        onReload={refetch}
      />
    );
  }, [isSplitMode, listData, fields, layoutCategory, selectedIds]);

  //float toolbar
  const FloatToolbarMemo = useMemo(() => {
    return (
      <FloatToolbar
        category={layoutCategory}
        checkedIds={selectedIds}
        itemsList={listData?.data || []}
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
      const url = `/${MENU_OPPORTUNITY}/${MENU_OPPORTUNITY}/${firstOrder[KEY_NAME_OPPORTUNITY_ID]}`;
      navigate(url);
    }
  }, [layoutCategory, listData]);

  //main render
  return (
    <ListContainer>
      {PageToolbarMemo}
      {PageFilterMemo}
      {PageBodyMemo}
      {!isDeletedGroupBy && FloatToolbarMemo}
    </ListContainer>
  );
};

export default ListPage;
