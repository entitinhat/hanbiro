import { memo, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';
import { LIST_STALE_TIME } from '@base/config/constant';
import { MENU_PROJECT, MENU_PROJECT_PROJECT } from '@base/config/menus';
import { useLanguageByMenu } from '@base/services/i18n';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useSetting } from '@project/hooks/useSetting';
import ProjectListPage from '@project/pages/ListPage/Project';
import ProjectViewPage from '@project/pages/ViewPage/Project';
import { GET_SETTINGS } from '@project/services/setting';
import { projectSettingsAtom } from '@project/store/atoms/setting';

import PlanningListPage from '../ListPage/Planning';
import TaskListPage from '../ListPage/Task';
import PlanningViewPage from '../ViewPage/Planning';
import TaskViewPage from '../ViewPage/Task';

const ProjectMainPage = () => {
  useLanguageByMenu([MENU_PROJECT]);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const setSettingData = useSetRecoilState(projectSettingsAtom);

  // get settings
  const { results: data } = useSetting(
    GET_SETTINGS,
    {},
    {
      staleTime: LIST_STALE_TIME
    }
  );

  useEffect(() => {
    if (data && data.results) {
      setSettingData(data.results);
    }
  }, [data]);

  const getListPage = (category: string, split: boolean = false) => {
    switch (category) {
      case 'project':
        return <ProjectListPage isSplitMode={split} />;

      case 'task':
        return <TaskListPage isSplitMode={split} />;

      case 'planning':
        return <PlanningListPage isSplitMode={split} />;

      default:
        return <ProjectListPage isSplitMode={split} />;
    }
  };

  const getViewPage = (category: string, split: boolean = false) => {
    switch (category) {
      case 'project':
        return <ProjectViewPage isSplitMode={split} />;

      case 'task':
        return <TaskViewPage isSplitMode={split} />;

      case 'planning':
        return <PlanningViewPage isSplitMode={split} />;

      default:
        return <ProjectViewPage isSplitMode={split} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>VoraWorks - Project</title>
      </Helmet>
      <Routes>
        <Route
          path=":category"
          element={
            <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_PROJECT}_${category}` : MENU_PROJECT_PROJECT)}>
              {({ isSplitMode, category }: any) => {
                console.log('category', category);
                return !matchesSm && isSplitMode ? (
                  <SplitView leftPane={getListPage(category, isSplitMode)} rightPane={<EmptySplitView />} />
                ) : (
                  <>{getListPage(category, false)}</>
                );
              }}
            </SplitViewContainer>
          }
        />
        <Route
          path=":category/:id"
          element={
            <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_PROJECT}_${category}` : MENU_PROJECT_PROJECT)}>
              {({ isSplitMode, category }: any) => {
                return !matchesSm && isSplitMode ? (
                  <SplitView
                    leftPane={getListPage(category, isSplitMode)}
                    rightPane={
                      <Box className="pane-content" sx={{ flex: 1 }}>
                        <Suspense fallback={<></>}>{getViewPage(category, isSplitMode)}</Suspense>
                      </Box>
                    }
                  />
                ) : (
                  <Suspense fallback={<></>}>{getViewPage(category, false)}</Suspense>
                );
              }}
            </SplitViewContainer>
          }
        />
        <Route path="/" element={<Navigate replace to={`/${MENU_PROJECT}/${MENU_PROJECT_PROJECT}`} />} />
      </Routes>
    </>
  );
};

export default memo(ProjectMainPage);
