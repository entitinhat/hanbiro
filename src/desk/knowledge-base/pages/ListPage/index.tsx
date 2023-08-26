import { useEffect, useMemo, useState } from 'react';
import PageToolbar from './Toolbar';
import PageHeader from './Header';
import PageBody from './Body';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { LIST_STALE_TIME } from '@base/config/constant';
import { MENU_DESK_KNOWLEDGE } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import { configFields, listLayoutColumns } from '@desk/knowledge-base/config/list-field/columns';
import { FilterInput } from '@base/types/common';
import { KnowledgeBaseToolbarMoreOptions } from '@desk/knowledge-base/config/constants';
import { LabelValueIcon, ListType } from '@base/types/app';
import { useKnowledgeBaseList } from '@desk/knowledge-base/hooks/useKnowledgeBaseList';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import BottomToolbar from './BottomToolbar';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { getParseFilterQuery } from './Helper';
import { useRecoilState } from 'recoil';
import { authAtom } from '@base/store/atoms/auth';
import useDevice from '@base/hooks/useDevice';
const USER_ID = '22779486-f43a-4530-b77f-31a932dd0a23';
import { isDeleteList } from './Helper';
import ViewPage from '../ViewPage';
import { useParams } from 'react-router-dom';
interface ListPageProps {
  isSplitMode: boolean;
}

const KnowledgeListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;
  const category = MENU_DESK_KNOWLEDGE;
  const params = useParams();
  const isViewMode = (params?.id as string) ? true : false;

  const { filterValues, listType, settingColumns, keyword, sort, paging, filterQuery, setSettingColumns } = useListPageSettings(category);

  //write recoil
  const [auth] = useRecoilState(authAtom);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [categoryFolder, setCategoryFolder] = useState<{
    category: string;
    folder: string;
  }>({
    category: '',
    folder: ''
  });

  const groupBy = filterValues?.groupBy;
  const groupByDelete = isDeleteList(groupBy);
  const layoutMenu = MENU_DESK_KNOWLEDGE;
  const { isMobile } = useDevice();
  const { data: listLayoutData } = usePageLayoutByMenu(layoutMenu, 'list');

  const { listQuerySchema, fields } = useMemo(() => {
    const isGroupByAll = groupBy == 'all' || groupBy == 'my' || groupBy == 'myGroup';
    let fields = [];

    if (isGroupByAll) {
      if (listLayoutData && listLayoutData.data) {
        fields = listLayoutData.data;
      }
    } else {
      fields = listLayoutColumns?.[groupBy];
    }

    fields = fields.map((_ele: any) => {
      if (isGroupByAll) {
        const newFields = listLayoutColumns?.[groupBy].find((_field: any) => _field.keyName == _ele.keyName);
        if (newFields) {
          return {
            ...newFields,
            isViewing: newFields.defaultViewInList,
            defaultViewInList: newFields.defaultViewInList,
            disableSortBy: !newFields.sortable
          };
        }
        return {
          ..._ele,
          isViewing: false,
          defaultViewInList: false,
          disableSortBy: !_ele.sortable
        };
      }
      return {
        ..._ele,
        isViewing: _ele.defaultViewInList,
        defaultViewInList: _ele.defaultViewInList,
        disableSortBy: !_ele.sortable
      };
    });
    let listQuerySchema = buildListSchema({
      fields: [...fields, { keyName: 'isPublish' }],
      configFields,
      ignore: ['categoryFolder']
    });
    listQuerySchema = [listQuerySchema, 'isRead'].join('\n');
    return { fields, listQuerySchema };
  }, [listLayoutData, groupBy]);
  // list filters
  const filtersQuery: FilterInput = {
    keyword: keyword ?? '',
    sort: sort,
    paging: paging,
    query: getParseFilterQuery(filterQuery, categoryFolder.category, categoryFolder.folder, auth.user?.id ?? USER_ID)
  };

  const { data: listData, refetch } = useKnowledgeBaseList(
    listQuerySchema,
    {
      filter: filtersQuery
    },
    {
      staleTime: LIST_STALE_TIME,

      enabled: fields?.length > 0
    }
  );
  const rowIds = listData?.data?.map((v) => v.id) ?? [];
  const allCheckingProps: AllCheckingProps = {
    rowIds,
    checkedIds: selectedIds,
    onToggle: (ids) => {
      setSelectedIds(ids);
    }
  };
  const columnsSettingProps: ColumnsSettingProps = {
    columns: settingColumns,
    onChange: (newColumns: ColumnSetting[]) => {
      const nColumns = newColumns.map((_ele: any) => {
        return {
          ..._ele,
          isViewing: _ele.defaultViewInList,
          defaultViewInList: _ele.defaultViewInList,
          disableSortBy: !_ele.sortable
        };
      });
      setSettingColumns(nColumns);
    }
  };

  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };
  const handleChangeCategoryFolder = (folder: string, category: string) => {
    if (!folder) {
      setCategoryFolder({
        category,
        folder: ''
      });
    } else {
      setCategoryFolder({
        folder,
        category
      });
    }
  };

  useEffect(() => {
    setSelectedIds([]);
  }, [category, filterQuery]);

  useEffect(() => {
    if (fields?.length > 0) {
      setSettingColumns([...fields]);
    }
  }, [fields, groupBy]);
  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar isSplitMode={isSplitMode} category={category} onRefresh={refetch} />;
  }, [isSplitMode, fields, filterQuery, category, selectedIds]);

  const PageHeaderMemo = useMemo(() => {
    return (
      <PageHeader
        isSplitMode={isSplitMode}
        listType={listType}
        category={category}
        onRefresh={refetch}
        moreMenuProps={{
          items: KnowledgeBaseToolbarMoreOptions,
          onChange: (key: any) => {}
        }}
        columnsSettingProps={columnsSettingProps}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT || isMobile ? allCheckingProps : undefined}
      />
    );
  }, [isSplitMode, filterQuery, groupBy, settingColumns, allCheckingProps]);

  const PageBodyMemo = useMemo(() => {
    const id = auth?.user?.id ?? '';
    const role = ''; //auth?.user?.role ?? '';
    return (
      <PageBody
        isSplitMode={isSplitMode}
        isViewMode={isViewMode}
        category={category}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        refetch={refetch}
        handleChangeCategoryFolder={handleChangeCategoryFolder}
        onCancel={() => handleOnChecked([])}
        user={{
          id,
          role
        }}
      />
    );
  }, [listData, filterQuery, fields, category, selectedIds, settingColumns, isViewMode]);

  const BottomToolbarMemo = useMemo(() => {
    return (
      <BottomToolbar checkedIds={selectedIds} onCancel={() => handleOnChecked([])} isGroupByDeleted={groupByDelete} refetch={refetch} />
    );
  }, [selectedIds]);
  return (
    <>
      <ListContainer>
        {PageToolbarMemo}
        {PageHeaderMemo}
        {PageBodyMemo}
        {!groupByDelete && BottomToolbarMemo}
      </ListContainer>
    </>
  );
};

export default KnowledgeListPage;
