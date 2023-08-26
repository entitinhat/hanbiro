import React, { Suspense } from 'react';

//third-party
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

//project
import { useLanguageByMenu } from '@base/services/i18n'; //getLanguageByMenu
import { MENU_CAMPAIGN } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';
import Loader from '@base/components/App/Loader';

//menu import
import ListPage from '@campaign/pages/ListPage';
import ViewPage from '@campaign/pages/ViewPage';
import { CAMPAIGN_CATEGORY_ALL } from '@campaign/config/constants';

const CampaignMainPage = () => {
  //get lang
  useLanguageByMenu([MENU_CAMPAIGN]);

  //get page setting
  const params = useParams();
  const aParams = params['*'] ? params['*'].split('/') : [CAMPAIGN_CATEGORY_ALL];
  const pageDataKey = `${MENU_CAMPAIGN}_${aParams[0]}`;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  //console.log('Load Customer Page.......................', pageDataKey);

  return (
    <Suspense fallback={<Loader />}>
      <Helmet>
        <title>VoraWorks - Desk &gt; Campaign</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path=":category"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_CAMPAIGN}_${category}` : MENU_CAMPAIGN)}>
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
            path=":category/:id/*"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => (category ? `${MENU_CAMPAIGN}_${category}` : MENU_CAMPAIGN)}>
                {({ isSplitMode }: any) => {
                  return isSplitMode ? (
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
          <Route path="/" element={<Navigate replace to={`/${MENU_CAMPAIGN}/${CAMPAIGN_CATEGORY_ALL}`} />} />
        </Routes>
      )}
    </Suspense>
  );
};

export default CampaignMainPage;
