import { Suspense, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';

import SplitView, { SplitViewContainer, EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { MENU_ACTIVITY, MENU_MYWORK } from '@base/config/menus';
import { useLanguageByMenu } from '@base/services/i18n';
import ListPage from '@activity/pages/ListPage';
import ViewPage from '@activity/pages/ViewPage';
import ComparisonPage from '@activity/pages/ComparisonPage';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';

const ActivityMainPage = () => {
  useLanguageByMenu([MENU_ACTIVITY]);
  const params = useParams();
  const aParams = params['*'] ? params['*'].split('/') : [MENU_ACTIVITY];
  const pageDataKey = `${MENU_ACTIVITY}_${aParams[0]}`;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);
  console.log('isLoadingSetting', isLoadingSetting);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desk &gt; Activity</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route path="comparison" element={<ComparisonPage />} />
          <Route
            path=":category"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_ACTIVITY}_${category}` : MENU_ACTIVITY)}>
                {({ isSplitMode }: any) => {
                  return !matchesSm && isSplitMode ? (
                    <SplitView leftPane={<ListPage isSplitMode />} rightPane={<EmptySplitView />} />
                  ) : (
                    <ListPage isSplitMode={false} />
                  );
                }}
              </SplitViewContainer>
            }
          />
          <Route
            path=":category/:type/:id/*"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_ACTIVITY}_${category}` : MENU_ACTIVITY)}>
                {({ isSplitMode }: any) => {
                  return !matchesSm && isSplitMode ? (
                    <SplitView
                      leftPane={<ListPage isSplitMode />}
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
          <Route path="/" element={<Navigate replace to={`/${MENU_ACTIVITY}/${MENU_MYWORK}`} />} />
        </Routes>
      )}
    </>
  );
};

export default memo(ActivityMainPage);
