import React, { useState, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useLanguageByMenu } from '@base/services/i18n'; //getLanguageByMenu
import { MENU_CUSTOMER } from '@base/config/menus';
import { ListType } from '@base/types/app';
import { Typography, Box } from '@mui/material';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { Helmet } from 'react-helmet-async';
import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';
import Loader from '@base/components/App/Loader';

//menu import
import ListPage from '@marketing-list/pages/ListPage';
import ViewPage from '@marketing-list/pages/ViewPage';
import useIsSplitMode from '@base/hooks/useIsSplitMode';

const CustomerMainPage = () => {
  //get lang
  useLanguageByMenu([MENU_CUSTOMER]);

  //get page setting
  const category = 'marketing_list';
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  //console.log('Load Customer Page.......................', pageDataKey);

  const isSplitMode = useIsSplitMode(pageDataKey);

  return (
    <Suspense fallback={<Loader />}>
      <Helmet>
        <title>VoraWorks - Desk &gt; Customer</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path="/"
            element={
              <SplitViewContainer getPageDataKey={() => (category ? `${MENU_CUSTOMER}_${category}` : MENU_CUSTOMER)}>
                {({ isSplitMode }: any) => {
                  return isSplitMode ? (
                    <SplitView leftPane={<ListPage isSplitMode />} rightPane={<EmptySplitView />} />
                  ) : (
                    <ListPage isSplitMode={false} />
                  );
                }}
              </SplitViewContainer>
            }
          />
          <Route
            path=":id/*"
            element={
              <Suspense fallback={<></>}>
                {isSplitMode ? (
                  <SplitView
                    leftPane={<ListPage isSplitMode />}
                    rightPane={
                      <Box className="pane-content" sx={{ flex: 1, display: 'flex' }}>
                        <ViewPage isSplitMode />
                      </Box>
                    }
                  />
                ) : (
                  <ViewPage isSplitMode={false} />
                )}
              </Suspense>
            }
          />
        </Routes>
      )}
    </Suspense>
  );
};

export default CustomerMainPage;
