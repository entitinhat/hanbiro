import { useEffect, useMemo, useState } from 'react';
import PageToolbar from './Toolbar';
import PageHeader from './Header';
import PageBody from './Body';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { LIST_STALE_TIME } from '@base/config/constant';
import { MENU_DESK_TICKET, MENU_SETTING_ASSIGNMENT_RULE, MENU_SETTING_CTA } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import { configFields, listLayoutColumns } from '@settings/assignment-rule/rule/config/list-field/columns';
import { getListQuery } from '@settings/assignment-rule/rule/services/graphql';
import { FilterInput } from '@base/types/common';
import { getQuery } from '@settings/assignment-rule/rule/pages/ListPage/Helper';
import { TicketToolbarMoreOptions } from '@settings/assignment-rule/rule/config/constants';
import { LabelValueIcon, ListType } from '@base/types/app';
import { useAssignmentRuleList } from '@settings/assignment-rule/rule/hooks/useAssignmentRuleList';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { MenuData } from '@base/types/app';
import { parseFieldsList } from '../MainPage/Helper';
import BottomToolbar from './BottomToolbar';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';

interface ListPageProps {
  isSplitMode: boolean;
}

const TicketListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;
  const category = MENU_SETTING_ASSIGNMENT_RULE;
  const { filterValues, listType, settingColumns, setSettingColumns, keyword, sort, paging, filterQuery } =
    useListPageSettings(MENU_SETTING_ASSIGNMENT_RULE);

  //write recoil

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [tabs, setTabs] = useState("module=AR_MODULE_DESK");
  const layoutMenu = MENU_SETTING_CTA;
  const groupBy = filterValues?.groupBy;

  let { data: listLayoutData } = usePageLayoutByMenu(layoutMenu, 'list');
  //parseFieldsList
  listLayoutData = parseFieldsList(listLayoutData);
  // listLayoutData = {};
  let viewingFields: any = [];
  if (settingColumns?.length > 0) {
    viewingFields = settingColumns.filter((_ele: any) => _ele.isViewing);
  }

  const { listFullQuery, fields } = useMemo(() => {
    let fields = [];
    if (listLayoutData && listLayoutData.data) {
      fields = listLayoutData.data;
    }
    let listQuerySchema = buildListSchema({ fields, configFields });

    const listFullQuery = getListQuery(listQuerySchema);
    return { fields, listFullQuery };
  }, [listLayoutData, groupBy]);
  // console.log('viewingFields: ', viewingFields)
  useEffect(() => {
    if (fields?.length > 0 && settingColumns.length === 0) {
      const newColumns = fields.map((_ele: any) => {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          disableSortBy: !_ele.sortable
        };
      });
      setSettingColumns([...newColumns]);
    }
  }, [fields]);

  // list filters

  useEffect(() => {
    setSelectedIds([]);
  }, [category, filterQuery]);

  const filtersQuery: FilterInput = {
    keyword: keyword ?? '',
    sort: sort,
    paging: paging,
    query: filterQuery + ' ' + tabs,
    // filters
  };

  const { data, refetch } = useAssignmentRuleList(
    listFullQuery,
    {
      filter: filtersQuery
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME,
      enabled: fields?.length > 0
    }
  );
  console.log('data: ', data)
  console.log('filterQuery: ', filterQuery + tabs)
  const columnsSettingProps: ColumnsSettingProps = {
    columns: settingColumns,
    onChange: (newColumns: ColumnSetting[]) => {
      console.log('columnsSettingProps -> onChange', settingColumns, newColumns);
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

  const handleCheckTableItem = (checkedValue: any[]) => {
    setSelectedIds(checkedValue);
  };
  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  const PageToolbarMemo = useMemo(() => {
    return (
      <PageToolbar
        isSplitMode={isSplitMode}
        category={category}
        onRefresh={refetch}
        moreMenuProps={{
          items: TicketToolbarMoreOptions,
          onChange: (key: LabelValueIcon) => { }
        }}
      />
    );
  }, [isSplitMode, category, viewingFields, data, selectedIds]);

  const PageHeaderMemo = useMemo(() => {
    const rowIds = data?.data?.map((v) => v.id) ?? [];
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
        category={category}
        onRefresh={refetch}
        moreMenuProps={{
          items: TicketToolbarMoreOptions,
          onChange: (key: any) => { }
        }}
        allCheckingProps={listType === ListType.SPLIT ? allCheckingProps : undefined}
        columnsSettingProps={columnsSettingProps}
      />
    );
  }, [isSplitMode, category, viewingFields, data, selectedIds]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        fields={viewingFields || []}
        itemsList={data?.data ?? []}
        paging={data?.paging}
        checkedIds={selectedIds}
        onChecked={handleCheckTableItem} //for table
        //refetch={refetch}
        tabs={tabs}
        onChangeTab={setTabs}
      />
    );
  }, [data, viewingFields, isSplitMode]);


  const BottomToolbarMemo = useMemo(() => {
    return <BottomToolbar checkedIds={selectedIds} onCancel={() => handleOnChecked([])} />;
  }, [selectedIds]);
  return (
    <>
      <ListContainer>
        {PageToolbarMemo}
        {PageHeaderMemo}
        {PageBodyMemo}
        {BottomToolbarMemo}
      </ListContainer>
    </>
  );
};

export default TicketListPage;