import React, { Suspense } from 'react';

//third-party
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Helmet } from 'react-helmet-async';

//project base
import { useLanguageByMenu } from '@base/services/i18n'; //getLanguageByMenu
import { MENU_QUOTE, MENU_SALES } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';

//menu import
import ListPage from '@quote/pages/ListPage';
import ViewPage from '@quote/pages/ViewPage';

const MainPage = () => {
  useLanguageByMenu([MENU_QUOTE]);
  //const params = useParams();
  //const aParams = params['*'] ? params['*'].split('/') : ['all'];
  const layoutCategory = 'quote';
  const pageDataKey = `${MENU_SALES}_${layoutCategory}`;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desk &gt; Quote</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path=""
            element={
              <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_SALES}_${category}` : `${pageDataKey}`)}>
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
            path=":id"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_SALES}_${category}` : `${pageDataKey}`)}>
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

          <Route path="/" element={<Navigate replace to={`/${MENU_QUOTE}`} />} />
        </Routes>
      )}
    </>
  );
};

export default MainPage;
