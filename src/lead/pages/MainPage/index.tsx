import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Box } from '@mui/material';

import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { useLanguageByMenu } from '@base/services/i18n';
import { MENU_ACTIVITY, MENU_LEAD, MENU_SALES } from '@base/config/menus';
import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';

//menu import
import ListPage from '@lead/pages/ListPage';
import ViewPage from '@lead/pages/ViewPage';
import Loader from '@base/components/App/Loader';
import useIsSplitMode from '@base/hooks/useIsSplitMode';

const MainPage = () => {
  useLanguageByMenu([MENU_SALES, MENU_ACTIVITY]);

  const pageDataKey = `${MENU_SALES}_${MENU_LEAD}`;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);
  const isSplitMode = useIsSplitMode(pageDataKey);

  return (
    <Suspense fallback={<Loader />}>
      <Helmet>
        <title>VoraWorks - Desk &gt; Lead</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path="/"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => (category ? category : pageDataKey)}>
                {({ isSplitMode }: any) => {
                  return isSplitMode ? (
                    <SplitView
                      leftPane={
                        <Suspense fallback={<></>}>
                          <ListPage isSplitMode />
                        </Suspense>
                      }
                      rightPane={
                        <Suspense fallback={<></>}>
                          <EmptySplitView />
                        </Suspense>
                      }
                    />
                  ) : (
                    <ListPage isSplitMode={false} />
                  );
                }}
              </SplitViewContainer>
            }
          />
          <Route
            path=":id/*"
            loader={({ params }) => {
              console.log('...loader...', params);
            }}
            action={({ params }) => {
              console.log('...action...', params);
            }}
            element={
              <Suspense fallback={<></>}>
                {isSplitMode ? (
                  <SplitView
                    leftPane={
                      <Suspense fallback={<></>}>
                        <ListPage isSplitMode />
                      </Suspense>
                    }
                    rightPane={
                      // <Box className="pane-content" sx={{ flex: 1, display: 'flex' }}>
                      <Suspense fallback={<></>}>
                        <ViewPage isSplitMode />
                      </Suspense>
                      // </Box>
                    }
                  />
                ) : (
                  <ViewPage isSplitMode={false} />
                )}
              </Suspense>
            }
          />
          {/* <Route path=":id/*" element={<Navigate replace to={`/${MENU_SALES}/${MENU_LEAD}/id`} />} /> */}
        </Routes>
      )}
    </Suspense>
  );
};

export default MainPage;
