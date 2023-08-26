import _ from 'lodash';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import { defaultPaging, LIST_STALE_TIME } from '@base/config/constant';
import { MENU_PROJECT, MENU_PROJECT_PROJECT } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { useProjectList } from '@project/hooks/useProject';
import { GET_PROJECTS } from '@project/services/project';
import { Stack, useMediaQuery, useTheme } from '@mui/material';

import PageBody from './Body';
import PageHeader from './Header';
import { fields, getQuery } from './Helper';
import PageToolbar from './Toolbar';

interface ListPageProps {
  isSplitMode: boolean;
}

const ProjectListPage = ({ isSplitMode }: ListPageProps) => {
  console.log('ProjectListPage');
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { category = MENU_PROJECT_PROJECT } = useParams();
  const pageDataKey = `${MENU_PROJECT}_${category}`;
  const { filtersQuery } = useListPageSettings(pageDataKey, getQuery);

  const { results: listData, refetch } = useProjectList(
    GET_PROJECTS,
    {
      filter: filtersQuery
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME
    }
  );

  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar isSplitMode={isSplitMode} category={category} onRefresh={refetch} />;
  }, [isSplitMode, category]);

  const PageHeaderMemo = useMemo(() => {
    return <PageHeader isSplitMode={isSplitMode} onRefresh={refetch} category={category} />;
  }, [category, isSplitMode]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody
        isSplitMode={isSplitMode}
        category={category}
        fields={fields || []}
        itemsList={listData?.data ?? []}
        paging={listData?.paging ?? defaultPaging}
      />
    );
  }, [listData, category]);

  return (
    <RetryErrorBoundary>
      <ListContainer>
        <Stack
          sx={{
            width: '100%',
            // flexGrow: 1,
            overflow: 'hidden',
            height: '100%'
          }}
        >
          {PageToolbarMemo}
          {PageHeaderMemo}
          {PageBodyMemo}
        </Stack>
      </ListContainer>
    </RetryErrorBoundary>
  );
};

export default ProjectListPage;
