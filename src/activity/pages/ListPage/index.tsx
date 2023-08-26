import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { configFields, listLayoutColumns } from '@activity/config/list-field/column';
import ListBottomToolbar from '@activity/containers/ListBottomToolbar';
import { useActivityDelete } from '@activity/hooks/useActivityDelete';
import { useActivityList } from '@activity/hooks/useActivityList';
import { getQuery, isDeleteList } from '@activity/pages/ListPage/Helper';
import { activityListQueryAtom } from '@activity/store/atoms';
import Icon from '@base/assets/icons/svg-icons';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { MENU_ACTIVITY, MENU_MYWORK } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { LabelValueIcon, ListType } from '@base/types/app';
import { ColumnSetting } from '@base/types/setting';
import { buildListSchema } from '@base/utils/helpers/schema';
import { DeleteOutlined } from '@mui/icons-material';
import { useMediaQuery, useTheme } from '@mui/material';

import PageBody from './Body';
import PageHeader from './Header';
import PageToolbar from './Toolbar';
import { BASE_FIELDS } from '@activity/config/list-field';

export const ActivityToolbarMoreOptions: LabelValueIcon[] = [
  /*{
    label: 'ncrm_activity_import',
    value: 'import',
    icon: Icon('upload_cloud')
  },*/
  {
    label: 'ncrm_activity_export',
    value: 'export',
    icon: Icon('download')
  }
  // {
  //   label: 'ncrm_activity_restore',
  //   value: 'restore',
  //   icon: <RestoreFromTrashRounded fontSize="small" />
  // },
  // {
  //   label: 'ncrm_activity_delete_all',
  //   value: 'delete_all',
  //   icon: <Delete fontSize="small" />
  // }
];

export const DeleteOptions: LabelValueIcon[] = [
  ...ActivityToolbarMoreOptions,
  {
    label: 'ncrm_common_btn_empty',
    value: 'EMPTY',
    icon: <DeleteOutlined fontSize="small" />
  }
];

interface ListPageProps {
  isSplitMode: boolean;
}

const ActivityListPage = ({ isSplitMode }: ListPageProps) => {
  const theme = useTheme();

  const { category = MENU_MYWORK } = useParams();
  const pageDataKey = `${MENU_ACTIVITY}_${category}`;
  const { listType: cListType, settingColumns, setSettingColumns, filterValues, filtersQuery } = useListPageSettings(pageDataKey, getQuery);
  const setListQuery = useSetRecoilState(activityListQueryAtom);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    setSelectedIds([]);
  }, [category]);

  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  let listType = matchesSm ? ListType.GRID : cListType;

  const groupBy = filterValues?.groupBy;
  const isDeleteGroup = isDeleteList(groupBy);

  const { mutationDelete: mDelete } = useActivityDelete();
  const { data: listLayoutData } = usePageLayoutByMenu(`${MENU_ACTIVITY}_activity`, 'list');

  const { listQuerySchema, fields } = useMemo(() => {
    let fields = [];
    let listQuerySchema = '';
    if (groupBy == 'all') {
      if (listLayoutData && listLayoutData.data) {
        fields = listLayoutData.data;
      }
    } else {
      fields = listLayoutColumns?.[groupBy] || [];
    }
    fields = fields?.map((_ele: any) => {
      return {
        ..._ele,
        isViewing: _ele.defaultViewInList,
        disableSortBy: !_ele.sortable,
        isDisabled: BASE_FIELDS.includes(_ele.keyName)
      };
    });

    if (!_.isEmpty(fields)) {
      listQuerySchema = buildListSchema({ fields, configFields });
      const pos = listQuerySchema.includes('startTime');
      if (!pos) {
        listQuerySchema += '\nstartTime';
      }
    }
    // const listFullQuery = getListQuery(listQuerySchema);
    listQuerySchema = [listQuerySchema, 'isRead', 'type'].join('\n');
    return { listQuerySchema, fields };
  }, [listLayoutData, groupBy]);

  useEffect(() => {
    setListQuery(listQuerySchema);
  }, [listQuerySchema]);

  useEffect(() => {
    // set default for settingColumns
    if (fields?.length > 0) {
      setSettingColumns([...fields]);
    }
  }, [fields]);

  // Set fields for settingColumns when fields changed and  settingColumns is not empty
  useEffect(() => {
    if (fields?.length > 0) {
      setSettingColumns([...fields]);
    }
  }, [fields]);

  const { results: listData, refetch } = useActivityList(
    listQuerySchema,
    {
      filter: filtersQuery
    },
    {
      keepPreviousData: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      refetchInterval: 60000, // 60 seconds
      enabled: !!fields?.length && (listType == ListType.GRID || listType === ListType.LIST || listType === ListType.SPLIT)
    }
  );

  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  const handleOnDeleteCheckedRow = (ids: string[]) => {
    mDelete({ ids });
    handleOnChecked([]);
  };

  const handleOnBottomBarClick = (k: string) => {
    if (k === 'DELETE') {
      handleOnDeleteCheckedRow(selectedIds);
    }
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

  const rowIds = listData?.data?.map((v) => v.id) ?? [];
  const allCheckingProps: AllCheckingProps = {
    rowIds,
    checkedIds: selectedIds,
    onToggle: (ids) => {
      setSelectedIds(ids);
    }
  };

  const PageToolbarMemo = useMemo(() => {
    return (
      <PageToolbar
        isSplitMode={isSplitMode}
        category={category}
        onRefresh={refetch}
        onDelete={!!selectedIds?.length ? () => handleOnDeleteCheckedRow(selectedIds) : undefined}
      />
    );
  }, [isSplitMode, fields, category, selectedIds]);

  const PageHeaderMemo = useMemo(() => {
    return (
      <PageHeader
        listType={listType}
        isSplitMode={isSplitMode}
        onRefresh={refetch}
        moreMenuProps={{
          items: isDeleteGroup ? DeleteOptions : ActivityToolbarMoreOptions,
          onChange: (key: any) => {}
        }}
        // onChange={handleOnChange}
        category={category}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
      />
    );
  }, [listData, isSplitMode, listType, settingColumns, selectedIds, isDeleteGroup]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging ?? {}}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        refetch={refetch}
        // onChange={handleOnChange}
      />
    );
  }, [listData, fields, category, selectedIds]);

  const BottomToolbarMemo = useMemo(() => {
    return (
      <ListBottomToolbar checkedIds={selectedIds} onClick={handleOnBottomBarClick} onCancel={() => handleOnChecked([])} refetch={refetch} />
    );
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

export default ActivityListPage;
