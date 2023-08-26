import { useEffect, useMemo, useState } from 'react';
import PageToolbar from './Toolbar';
import PageHeader from './Header';
import BottomToolbar from './BottomToolbar';
import PageBody from './Body';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { LIST_STALE_TIME } from '@base/config/constant';
import { MENU_ANALYTIC, MENU_ANALYTIC_REPORT } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { buildListSchema } from '@base/utils/helpers/schema';
import { configFields } from '@analytic/report/config/list-field/columns';
import { FilterInput } from '@base/types/common';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { ColumnsSettingProps } from '@base/components/@hanbiro/List/ListHeader/ColumnsSetting';
import { ColumnSetting } from '@base/types/setting';
import { AllCheckingProps } from '@base/components/@hanbiro/List/ListHeader/AllChecking';
import { useReportList } from '@analytic/report/hooks/useReportList';
import { ListType } from '@base/types/app';
import { useNavigate } from 'react-router-dom';
import MiModal from '@base/components/@hanbiro/MiModal';
import ReportingContentPreview from '@analytic/report/containers/ReportingContentPreview';
import { Box, Button, Divider, useTheme } from '@mui/material';

interface ListPageProps {
  isSplitMode: boolean;
}

const ReportListPage = (props: ListPageProps) => {
  const { isSplitMode } = props;
  const category = MENU_ANALYTIC_REPORT;

  const { filterValues, listType, settingColumns, filterQuery, keyword, sort, paging, setSettingColumns } = useListPageSettings(category);

  //write recoil

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any>(null);

  const groupBy = filterValues?.groupBy;
  const layoutMenu = MENU_ANALYTIC_REPORT;

  const { data: listLayoutData } = usePageLayoutByMenu(layoutMenu, 'list');

  const navigate = useNavigate();

  const { listQuerySchema, fields } = useMemo(() => {
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
    let listQuerySchema = buildListSchema({ fields, configFields });
    return { fields, listQuerySchema };
  }, [listLayoutData, groupBy]);

  // list filters
  const filtersQuery: FilterInput = {
    keyword: keyword ?? '',
    sort: sort,
    paging: paging,
    query: filterQuery
  };

  const { data: listData, refetch } = useReportList(
    listQuerySchema,
    {
      filter: filtersQuery
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME,
      enabled: fields?.length > 0
    }
  );
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

  const handleOnChecked = (checkedIds: string[]) => {
    setSelectedIds(checkedIds);
  };

  const handleOnPreview = (data: any) => {
    setPreviewData(data);
  };

  const handleGoView = (id: string) => {
    navigate(`/${MENU_ANALYTIC}/report/${id}`);
  };

  useEffect(() => {
    setSelectedIds([]);
  }, [category]);

  useEffect(() => {
    if (fields?.length > 0 && settingColumns.length === 0) {
      setSettingColumns([...fields]);
    }
  }, [fields]);

  const rowIds = listData?.data?.map((v) => v?.id ?? null) ?? [];
  const allCheckingProps: AllCheckingProps = {
    rowIds,
    checkedIds: selectedIds,
    onToggle: (ids) => {
      setSelectedIds(ids);
    }
  };
  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar isSplitMode={isSplitMode} category={category} onRefresh={refetch} />;
  }, [isSplitMode, fields, filterQuery, category, selectedIds]);

  const PageHeaderMemo = useMemo(() => {
    return (
      <PageHeader
        isSplitMode={isSplitMode}
        category={category}
        onRefresh={refetch}
        columnsSettingProps={listType === ListType.LIST ? columnsSettingProps : undefined}
        allCheckingProps={listType === ListType.GRID || listType === ListType.SPLIT ? allCheckingProps : undefined}
      />
    );
  }, [isSplitMode, listType, settingColumns]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging}
        checkedIds={selectedIds}
        onChecked={handleOnChecked}
        refetch={refetch}
        onPreview={handleOnPreview}
      />
    );
  }, [listData, filterQuery, fields, category, selectedIds]);

  const BottomToolbarMemo = useMemo(() => {
    return <BottomToolbar checkedIds={selectedIds} onCancel={() => handleOnChecked([])} />;
  }, [selectedIds]);
  const theme = useTheme();
  return (
    <>
      <ListContainer>
        {PageToolbarMemo}
        {PageHeaderMemo}
        {PageBodyMemo}
        {BottomToolbarMemo}
      </ListContainer>
      {previewData !== null && (
        <MiModal
          title={previewData && previewData?.name ? previewData.name : 'Previewing Reporting Content'}
          onClose={() => setPreviewData(null)}
          fullScreen={true}
          size="lg"
          isOpen={previewData !== null}
        >
          <Box sx={{ padding: 2, backgroundColor: theme.palette.grey[100] }}>
            <Box sx={{ scrollbarWidth: 'none', overflowY: 'scroll', height: 'calc(-200px + 100vh)' }}>
              <ReportingContentPreview value={previewData} />
            </Box>
            <Divider sx={{ borderColor: theme.palette.grey[300] }} />
            <Box px={2} py={1} display="flex">
              <Box ml="auto">
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  onClick={() => setPreviewData(null)}
                  sx={{ mr: 1, border: '1px solid ' + theme.palette.grey[300] }}
                >
                  Cancel
                </Button>
                <Button size="small" variant="contained" color="success" onClick={() => handleGoView(previewData.id)}>
                  Go to Detail
                </Button>
              </Box>
            </Box>
          </Box>
        </MiModal>
      )}
    </>
  );
};

export default ReportListPage;
