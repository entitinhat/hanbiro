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
import ListBottomToolbar from '@settings/digital/survey/containers/ListBottomToolbar';
import { useSurveys } from '@settings/digital/survey/hooks/useSurveys';

//local
import PageHeader from './Header';
import PageToolbar from './Toolbar';
import PageBody from './Body';

interface ListPageProps {
  isSplitMode?: boolean;
}

const ListPage = ({ isSplitMode = false }: ListPageProps) => {
  //router
  //const params = useParams();
  let layoutCategory = 'survey'; //router category

  //state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  //const navigate = useNavigate();

  //get page setting
  const pageDataKey = `setting_${layoutCategory}`;
  const { filterValues, listType, settingColumns, setSettingColumns, getViewingFields } = useListPageSettings(pageDataKey);
  //console.log('filterValues', filterValues);
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
  // let viewingFields: any = [];
  // if (fields?.length > 0) {
  //   viewingFields = getViewingFields(fields, settingColumns);
  // }

  //get list data
  const { data: listData, isFetching: isDataFetching, refetch } = useSurveys(fields);
  //console.log('resultsPost', listData);

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
    return (
      <PageToolbar
        isSplitMode={isSplitMode}
        category={layoutCategory}
        onRefresh={refetch}
        onDelete={!!selectedIds?.length ? () => handleOnDeleteCheckedRow(selectedIds) : undefined}
      />
    );
  }, [isSplitMode, fields, layoutCategory, selectedIds]);

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
        columnsSettingProps={undefined}
        //allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
        // moreMenuProps={{
        //   items: CUSTOMER_TOOLBAR_MORE_OPTIONS,
        //   onChange: (key: LabelValueIcon) => { console.log('more toolbar key selected', key) }
        // }}
        onRefresh={refetch}
      />
    );
  }, [isSplitMode, layoutCategory, fields, listData, selectedIds]);

  //body
  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={layoutCategory}
        fields={fields}
        itemsList={listData?.data || []}
        paging={listData?.paging}
        selectedIds={selectedIds}
        onChecked={handleOnChecked} //for table
        //onGridChecked={setSelectedIds} //for grid
      />
    );
  }, [isSplitMode, layoutCategory, listData, fields, selectedIds]);

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
