import React, { useState, Suspense, useEffect, useRef, useMemo } from 'react';
import { Routes, Route, useMatch, Navigate, useParams } from 'react-router-dom';
import { useLanguageByMenu } from '@base/services/i18n'; //getLanguageByMenu
import { MENU_CUSTOMER } from '@base/config/menus';
// import ListPage from '@blocklist/pages/list';
//import ViewPage from '@blocklist/customer/pages/view';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { Helmet } from 'react-helmet-async';
import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';
import { CUSTOMER_CATEGORY_ALL } from '@blocklist/config/constants';
import Loader from '@base/components/App/Loader';

//menu import
import ListPage from '@blocklist/pages/ListPage';
// import ViewPage from '@blocklist/pages/ViewPage';

const CustomerMainPage = () => {
  //get lang
  useLanguageByMenu([MENU_CUSTOMER]);
  const category = 'block_list';
  //get page setting
  const pageDataKey = `${MENU_CUSTOMER}_${category}`;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  //console.log('Load Customer Page.......................', pageDataKey);

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
              <SplitViewContainer getPageDataKey={() => `${MENU_CUSTOMER}_${category}`}>
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
        </Routes>
      )}
    </Suspense>
  );
};

export default CustomerMainPage;
