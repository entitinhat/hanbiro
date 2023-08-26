import _ from 'lodash';
import { Suspense, useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import RetryErrorBoundary from '@base/components/@hanbiro/Errors/RetryErrorBoundary';
import ListContainer from '@base/components/@hanbiro/List/ListContainer';
import SideBar from '@base/components/@hanbiro/Sidebar';
import { defaultPaging, LIST_STALE_TIME } from '@base/config/constant';
import { MENU_PROJECT_TASK, MENU_PROJECT_TEMPLATE } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { useTaskTemplateList } from '@project/hooks/useTemplate';
import { TaskView, TaskWrite } from '@project/pages/WritePage/Template/Task';
import { GET_TASK_TEMPLATES } from '@project/services/template';
import { taskTemplateOpenAtom } from '@project/store/atoms/template';

import PageBody from './Body';
import PageHeader from './Header';
import { fields, getQuery } from './Helper';
import PageToolbar from './Toolbar';

interface ListPageProps {}

const TaskTemplateListPage = (props: ListPageProps) => {
  console.log('TaskTemplateListPage');
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { category = MENU_PROJECT_TASK } = useParams();
  const [taskTemplateOpen, setTaskTemplateOpen] = useRecoilState(taskTemplateOpenAtom);

  const pageDataKey = `${MENU_PROJECT_TEMPLATE}_${category}`;
  const { filtersQuery } = useListPageSettings(pageDataKey, getQuery);

  const { results: listData, refetch } = useTaskTemplateList(
    GET_TASK_TEMPLATES,
    {
      filter: filtersQuery
    },
    {
      keepPreviousData: true,
      staleTime: LIST_STALE_TIME
    }
  );

  const PageToolbarMemo = useMemo(() => {
    return <PageToolbar category={category} onRefresh={refetch} />;
  }, [category]);

  const PageHeaderMemo = useMemo(() => {
    return <PageHeader category={category} onRefresh={refetch} />;
  }, [category]);

  const PageBodyMemo = useMemo(() => {
    return (
      <PageBody category={category} fields={fields || []} itemsList={listData?.data ?? []} paging={listData?.paging ?? defaultPaging} />
    );
  }, [listData, category]);

  const onCloseWrite = useCallback(() => {
    setTaskTemplateOpen({ open: false, id: '' });
  }, []);

  return (
    <RetryErrorBoundary>
      <ListContainer>
        <Stack
          sx={{
            width: taskTemplateOpen.open ? 'calc(100% - 600px)' : '100%',
            flexGrow: 1,
            overflow: 'hidden',
            height: '100%'
          }}
        >
          {PageToolbarMemo}
          {PageHeaderMemo}
          {PageBodyMemo}
        </Stack>
        <SideBar anchor="right" width={matchDownSM ? '100%' : 600} variant="permanent" open={taskTemplateOpen.open}>
          <Suspense fallback={<></>}>
            {taskTemplateOpen.id ? (
              <TaskView id={taskTemplateOpen.id} onClose={onCloseWrite} />
            ) : (
              <TaskWrite category={category} onClose={onCloseWrite} />
            )}
          </Suspense>
        </SideBar>
      </ListContainer>
    </RetryErrorBoundary>
  );
};

export default TaskTemplateListPage;
