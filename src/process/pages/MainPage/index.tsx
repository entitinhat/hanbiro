import './diagram-new.scss';

import { memo, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';

import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';
import { MENU_PROCESS, MENU_PROCESS_BUSINESS } from '@base/config/menus';
import { useLanguageByMenu } from '@base/services/i18n';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { AutomationListPage, BusinessListPage, SettingListPage } from '@process/pages/ListPage';
import ViewPage from '@process/pages/ViewPage';

const ProcessMainPage = () => {
  useLanguageByMenu([MENU_PROCESS]);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const getListPage = (category: string, split: boolean = false) => {
    switch (category) {
      case 'business':
        return <BusinessListPage isSplitMode={split} />;

      case 'automation_rule':
        return <AutomationListPage isSplitMode={split} />;

      case 'setting':
        return <SettingListPage isSplitMode={split} />;

      default:
        return <BusinessListPage isSplitMode={split} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desk &gt; Process</title>
      </Helmet>
      <Routes>
        <Route
          path=":category"
          element={
            <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_PROCESS}_${category}` : MENU_PROCESS_BUSINESS)}>
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
            <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_PROCESS}_${category}` : MENU_PROCESS)}>
              {({ isSplitMode, category }: any) => {
                return !matchesSm && isSplitMode ? (
                  <SplitView
                    leftPane={getListPage(category, isSplitMode)}
                    rightPane={
                      <Box className="pane-content" sx={{ flex: 1 }}>
                        <Suspense fallback={<></>}>
                          <ViewPage isSplitMode />
                        </Suspense>
                      </Box>
                    }
                  />
                ) : (
                  <Suspense fallback={<></>}>
                    <ViewPage isSplitMode={false} />
                  </Suspense>
                );
              }}
            </SplitViewContainer>
          }
        />
        <Route path="/" element={<Navigate replace to={`/${MENU_PROCESS}/${MENU_PROCESS_BUSINESS}`} />} />
      </Routes>
    </>
  );
};

export default memo(ProcessMainPage);
