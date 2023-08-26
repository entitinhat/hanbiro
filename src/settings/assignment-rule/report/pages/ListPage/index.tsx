import { useEffect, useMemo, useState } from 'react';
import PageToolbar from './Toolbar';
import PageHeader from './Header';
import PageBody from './Body';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { LIST_STALE_TIME } from '@base/config/constant';
import { MENU_DESK_TICKET, MENU_SETTING_ASSIGNMENT_REPORT, MENU_SETTING_ASSIGNMENT_RULE, MENU_SETTING_CTA } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import { configFields, listLayoutColumns } from '@settings/assignment-rule/rule/config/list-field/columns';
import { getListQuery } from '@settings/assignment-rule/rule/services/graphql';
import { FilterInput } from '@base/types/common';
import { getQuery } from '@settings/assignment-rule/rule/pages/ListPage/Helper';
import { TicketToolbarMoreOptions } from '@settings/assignment-rule/rule/config/constants';
import { LabelValueIcon } from '@base/types/app';
import { useAssignmentRuleList } from '@settings/assignment-rule/rule/hooks/useAssignmentRuleList';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { MenuData } from '@base/types/app';
import { parseFieldsList } from '../MainPage/Helper';

interface ListPageProps {
  isSplitMode: boolean;
}

const TicketListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;
  const category = MENU_SETTING_ASSIGNMENT_REPORT;
  const { filterValues, listType, settingColumns, setSettingColumns, keyword, sort, paging, filterQuery } =
    useListPageSettings(MENU_SETTING_ASSIGNMENT_REPORT);

  //write recoil

  const layoutMenu = MENU_SETTING_CTA;
  const groupBy = filterValues?.groupBy;

  let { data: listLayoutData } = usePageLayoutByMenu(layoutMenu, 'list');
  //parseFieldsList
  listLayoutData = parseFieldsList(listLayoutData);

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
  console.log('fields', fields);
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
  const filtersQuery: FilterInput = {
    keyword: keyword ?? '',
    sort: sort,
    paging: paging,
    query: filterQuery
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
  console.log('>>>>>>>>>>> data', data);

  const PageToolbarMemo = useMemo(() => {
    return (
      <PageToolbar
        isSplitMode={isSplitMode}
        category={category}
        onRefresh={refetch}
        moreMenuProps={{
          items: TicketToolbarMoreOptions,
          onChange: (key: LabelValueIcon) => {}
        }}
      />
    );
  }, [isSplitMode, category, viewingFields, data]);

  const PageHeaderMemo = useMemo(() => {
    return (
      <PageHeader
        isSplitMode={isSplitMode}
        category={category}
        onRefresh={refetch}
        moreMenuProps={{
          items: TicketToolbarMoreOptions,
          onChange: (key: any) => {}
        }}
      />
    );
  }, [isSplitMode, category, viewingFields, data]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        fields={viewingFields || []}
        itemsList={data?.data ?? []}
        paging={data?.paging}
        refetch={refetch}
      />
    );
  }, [data, viewingFields, isSplitMode]);

  return (
    <>
      <ListContainer>
        {PageToolbarMemo}
        {PageHeaderMemo}
        {PageBodyMemo}
      </ListContainer>
    </>
  );
};

export default TicketListPage;
