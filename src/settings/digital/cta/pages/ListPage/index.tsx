import { ListContainer } from '@base/components/@hanbiro/List';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { MENU_SETTING, MENU_SETTING_CTA } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { default as configFields } from '@settings/digital/cta/config/view-field';
import { ListType } from '@base/types/app';
import { ColumnSetting } from '@base/types/setting';
import { buildListSchema } from '@base/utils/helpers/schema';
import { useEffect, useMemo, useState } from 'react';
import CtaListBottomToolbar from '../../containers/CtaListBottomToolbar';
import { useCtaList } from '../../hooks/useCtas';
import PageBody from './PageBody';
import PageHeader from './PageHeader';
import CtaPageToolbar from './PageToolBar';
import _ from 'lodash';
import { FilterInput } from '@base/types/common';
import { LIST_STALE_TIME } from '@base/config/constant';

interface CtaListPageProps {
  isSplitMode: boolean;
}

const CtaListPage = (props: CtaListPageProps) => {
  const { isSplitMode } = props;

  //router
  let layoutCategory = 'cta';

  //state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  //get page setting
  const pageDataKey = MENU_SETTING_CTA;
  const { filterValues, listType, settingColumns, keyword, sort, paging, filterQuery, setSettingColumns, getViewingFields } =
    useListPageSettings(pageDataKey);
  const groupBy = filterValues?.groupBy;

  /*===================================== HOOK ===================================== */

  let { data: listLayoutData, isLoading: isLayoutLoading } = usePageLayoutByMenu(pageDataKey, 'list');

  //get pagelayout columns
  const { listQuerySchema, fields } = useMemo(() => {
    let fields = [];
    let listQuerySchema = '';
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

    if (!_.isEmpty(fields)) {
      listQuerySchema = buildListSchema({ fields, configFields });
    }
    return { listQuerySchema, fields };
  }, [listLayoutData, groupBy]);

  //fields for build schema
  let viewingFields: any = [];
  if (fields?.length > 0) {
    viewingFields = getViewingFields(fields, settingColumns);
  }

  // get list data
  const { results: listData, refetch } = useCtaList(
    listQuerySchema,
    {
      filter: {
        keyword: keyword ?? '',
        sort: sort,
        paging: paging,
        query: filterQuery
      } as FilterInput
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME,
      enabled: !!fields?.length
    }
  );

  //check rows
  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };
  /** ============================ RENDER ================================ */
  //toolbar
  const PageToolbarMemo = useMemo(() => {
    return (
      <CtaPageToolbar
        isSplitMode={isSplitMode}
        category={layoutCategory}
        onRefresh={refetch}
        // onDelete={!!selectedIds?.length ? () => handleOnDeleteCheckedRow(selectedIds) : undefined}
      />
    );
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

    const rowIds = listData?.data?.map((v: any) => v.id) ?? [];
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
      />
    );
  }, [isSplitMode, layoutCategory, listData, viewingFields, selectedIds]);

  //float toolbar
  const FloatToolbarMemo = useMemo(() => {
    return (
      <CtaListBottomToolbar
        isSplitMode={isSplitMode}
        category={layoutCategory}
        checkedIds={selectedIds}
        itemsList={listData?.data || []}
        onCancel={() => handleOnChecked([])}
        onReload={refetch}
      />
    );
  }, [selectedIds, listData]);

  return (
    <ListContainer>
      {PageToolbarMemo}
      {PageHeaderMemo}
      {PageBodyMemo}
      {FloatToolbarMemo}
    </ListContainer>
  );
};

export default CtaListPage;
