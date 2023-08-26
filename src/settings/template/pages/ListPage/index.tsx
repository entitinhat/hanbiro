import { useEffect, useMemo, useRef, useState } from 'react';
import PageToolbar from './Toolbar';
import PageHeader from './Header';
import PageBody from './Body';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { MENU_QUOTE, MENU_SETTING_CTA } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import { FilterInput } from '@base/types/common';
import { KnowledgeBaseToolbarMoreOptions } from '@desk/knowledge-base/config/constants';
import { LabelValueIcon, ListType } from '@base/types/app';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { parseStringQuery } from '@settings/template/utils/helper';
import { useMenuTemplates } from '@settings/template/hooks/useMenuTemplates';
import BottomToolbar from './BottomToolbar';
import { Template } from '@settings/template/types/template';
import * as keyNames from '@settings/template/config/key-names';

import { useRecoilState } from 'recoil';

import { authAtom } from '@base/store/atoms/auth';
import { USER_ID } from '@settings/template/config/constants';
import { useTranslation } from 'react-i18next';
interface ListPageProps {
  isSplitMode: boolean;
  groupTemplate: Template;
}
const COLUMNS_SORTABLE = [keyNames.KEY_MENU_TEMPLATE_TYPE, keyNames.KEY_MENU_TEMPLATE_SUB_TYPE, keyNames.KEY_MENU_TEMPLATE_SUBJECT];

const ListPage = (props: ListPageProps) => {
  const { isSplitMode, groupTemplate } = props;

  //State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { t } = useTranslation();
  //---------------------------------------------------Setting----------------------------------
  const category = groupTemplate.menu;
  const templateGroup = groupTemplate.path;
  const title = groupTemplate.title;
  const configView = groupTemplate.configView;
  const parseFieldsList = groupTemplate.parseFieldsList;
  //------------------------------------------------------------------------------------------------------

  //--------------------------------------------------Get Data ----------------------------------------------
  const { filterValues, setFilter, listType, keyword, sort, setSort, paging, filterQuery, setSettingColumns, settingColumns, setPaging } =
    useListPageSettings(category);
  const [auth] = useRecoilState(authAtom);
  let { data: listLayoutData } = usePageLayoutByMenu(MENU_SETTING_CTA, 'list');
  listLayoutData = parseFieldsList(listLayoutData, templateGroup);
  //fix reset paging when changing filter
  useEffect(() => {
    setPaging({
      page: 1,
      size: 10
    });
  }, [filterQuery]);
  //console.log('listLayoutData', listLayoutData, templateGroup);

  const { queryString, fields, option } = useMemo(() => {
    let fields = [];
    if (listLayoutData && listLayoutData.data) {
      fields = listLayoutData.data;
    }
    fields = fields.map((_ele: any) => {
      return {
        ..._ele,
        isViewing: _ele.defaultViewInList,
        enableSorting: COLUMNS_SORTABLE.includes(_ele.keyName) ? true : false
      };
    });
    let listQuerySchema = buildListSchema({ fields, configView });
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
  }, [listLayoutData]);

  const filtersQuery: FilterInput = {
    keyword: keyword ?? '',
    sort: sort,
    paging: paging,
    query: parseStringQuery([groupTemplate.group, filterQuery].join(' '), auth.user?.id ?? USER_ID)
  };

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
          enableSorting: COLUMNS_SORTABLE.includes(_ele.keyName) ? true : false
        });
      });
      const listCopy = [...newColumns];
      const movedItem = listCopy.find((item) => item.keyName == 'subType');
      const listRemoved = listCopy.filter((item) => item.keyName != 'subType');
      if (movedItem) listRemoved.splice(1, 0, movedItem);
      setSettingColumns([...listRemoved]);
    }
  }, [fields]);

  const { data: listData, refetch, isLoading, isFetching } = useMenuTemplates(filtersQuery, queryString, option);
  //--------------------------------------------------------------------------------------------------------------

  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  //----------------------------------------------Render-----------------------------------------------------------
  const PageToolbarMemo = useMemo(() => {
    const menu = groupTemplate.path == 'knowledgebase' ? 'desk' : groupTemplate.path;
    return (
      <PageToolbar
        menu={menu}
        isSplitMode={isSplitMode}
        category={category}
        onRefresh={refetch}
        categoryMenuProps={{
          items: [
            {
              value: templateGroup,
              label: t(`ncrm_setting_template_${groupTemplate.path}`),
              path: `/settings/template/${templateGroup}`
            }
          ],
          selected: templateGroup ?? '',
          onClick: (category: string) => {
            // navigate(`/settings/${category.replace('_', '/')}`);
          },
          mainIconProps: {
            icon: menu === MENU_QUOTE ? 'quotes' : menu
          }
        }}
        moreMenuProps={{
          items: KnowledgeBaseToolbarMoreOptions,
          onChange: (key: LabelValueIcon) => {}
        }}
        title={title}
        templateGroup={templateGroup}
        viewConfig={configView}
        groupTemplate={groupTemplate.group}
      />
    );
  }, [isSplitMode, fields, filterQuery, category, selectedIds]);

  const PageHeaderMemo = useMemo(() => {
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
        category={category}
        onRefresh={refetch}
        moreMenuProps={{
          items: KnowledgeBaseToolbarMoreOptions,
          onChange: (key: any) => {}
        }}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
        groupTemplate={groupTemplate}
      />
    );
  }, [isSplitMode, filterQuery, category]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        templateGroup={templateGroup}
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
    return (
      <BottomToolbar
        category={category}
        groupTemplate={groupTemplate.group}
        checkedIds={selectedIds}
        onCancel={() => handleOnChecked([])}
      />
    );
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
