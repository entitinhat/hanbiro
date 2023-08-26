import { useEffect, useMemo, useState } from 'react';
import PageToolbar from './Toolbar';
import PageHeader from './Header';
import PageBody from './Body';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { MENU_SETTING_CTA } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import { FilterInput } from '@base/types/common';
import { ToolbarMoreOptions } from '@settings/sites/desk/config/constants';
import { LabelValueIcon, ListType } from '@base/types/app';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { parseStringQuery } from '@settings/sites/utils/helper';
import { useMenuSites } from '@settings/sites/hooks/useMenuSites';
import BottomToolbar from './BottomToolbar';
import { Site } from '@settings/sites/types/site';
interface ListPageProps {
  isSplitMode: boolean;
  groupSite: Site;
}

const ListPage = (props: ListPageProps) => {
  const { isSplitMode, groupSite } = props;

  //State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  //---------------------------------------------------Setting----------------------------------
  const category = groupSite.menu;
  const group = groupSite.path;
  const title = groupSite.title;
  const configView = groupSite.configView;
  const parseFieldsList = groupSite.parseFieldsList;
  const canSorts: string[] = ['state', 'language', 'title', 'type', 'name', 'createdAt'];
  //------------------------------------------------------------------------------------------------------

  //--------------------------------------------------Get Data ----------------------------------------------
  const { filterValues, listType, keyword, sort, setSort, paging, filterQuery, setSettingColumns, settingColumns } =
    useListPageSettings(category);

  let { data: listLayoutData } = usePageLayoutByMenu(MENU_SETTING_CTA, 'list');
  listLayoutData = parseFieldsList(listLayoutData, group);

  const groupBy = filterValues?.groupBy;

  //console.log('listLayoutData', listLayoutData, group);

  const { queryString, fields, option } = useMemo(() => {
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
    let listQuerySchema = buildListSchema({ fields, configFields: configView });

    let queryString = `
    results {
      ${listQuerySchema}
    }
    paging {
      totalPage
      totalItems
      currentPage
    }`;
    let option = {
      keepPreviousData: true,
      enabled: listQuerySchema != 'id'
    };
    //console.log('fields', fields);
    return { fields, queryString, option };
  }, [listLayoutData, groupBy]);

  // list filters
  useEffect(() => {
    setSelectedIds([]);
  }, [category, filterQuery]);

  useEffect(() => {
    if (fields?.length > 0 && settingColumns.length === 0) {
      const newColumns: any[] = [];
      listLayoutData?.data?.map((_ele: any) => {
        newColumns.push({
          ..._ele,
          isViewing: _ele.defaultViewInList,
          disableSortBy: canSorts.indexOf(_ele.keyName) === -1 ? true : false
        });
      });
      setSettingColumns([...newColumns]);
    }
  }, [fields]);

  const filtersQuery: FilterInput = {
    keyword: keyword ?? '',
    sort: sort,
    paging: paging,
    query: parseStringQuery([groupSite.group, filterQuery].join(' '), '22779486-f43a-4530-b77f-31a932dd0a23')
  };
  const { data: listData, refetch } = useMenuSites(filtersQuery, queryString, option);
  //--------------------------------------------------------------------------------------------------------------

  const rowIds = listData?.data?.map((v) => v.id) ?? [];

  const allCheckingProps: AllCheckingProps = {
    rowIds,
    checkedIds: selectedIds,
    onToggle: (ids) => {
      setSelectedIds(ids);
    }
  };

  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  //----------------------------------------------Render-----------------------------------------------------------
  const PageToolbarMemo = useMemo(() => {
    return (
      <PageToolbar
        menu={groupSite.menu}
        isSplitMode={isSplitMode}
        category={category}
        onRefresh={refetch}
        categoryMenuProps={{
          items: [
            {
              value: group,
              label: groupSite.label,
              path: `/settings/sites/${group}`
            }
          ],
          selected: group ?? '',
          onClick: (category: string) => {
            // navigate(`/settings/${category.replace('_', '/')}`);
          }
        }}
        moreMenuProps={{
          items: ToolbarMoreOptions,
          onChange: (key: LabelValueIcon) => {}
        }}
        title={title}
        group={group}
      />
    );
  }, [isSplitMode, fields, filterQuery, category, selectedIds]);

  const PageHeaderMemo = useMemo(() => {
    return (
      <PageHeader
        isSplitMode={isSplitMode}
        category={category}
        onRefresh={refetch}
        moreMenuProps={{
          items: ToolbarMoreOptions,
          onChange: (key: any) => {}
        }}
        // allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
        groupSite={groupSite}
      />
    );
  }, [isSplitMode, filterQuery, category]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        group={group}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging}
        checkedIds={selectedIds}
        onChecked={handleOnChecked} //for table
        refetch={refetch}
        setSort={setSort}
      />
    );
  }, [listData, filterQuery, fields, category, selectedIds]);

  const BottomToolbarMemo = useMemo(() => {
    return <BottomToolbar filter={filtersQuery} checkedIds={selectedIds} onCancel={() => handleOnChecked([])} />;
  }, [selectedIds, category]);

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

export default ListPage;
