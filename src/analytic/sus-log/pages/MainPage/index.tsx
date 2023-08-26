import { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { useLanguageByMenu } from '@base/services/i18n';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import {MENU_ANALYTIC, MENU_ANALYTIC_SUS_LOG, MENU_DASHBOARD} from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';

import ListPage from '@analytic/sus-log/pages/ListPage';
import ViewPage from '@analytic/sus-log/pages/ViewPage';

const SusLogMainPage = () => {
  const params = useParams();
  useLanguageByMenu([MENU_ANALYTIC, MENU_DASHBOARD]);
  const pageDataKey = MENU_ANALYTIC_SUS_LOG;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desk &gt; SUS Log</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path="/"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => pageDataKey}>
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
            path=":id"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => pageDataKey}>
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
        </Routes>
      )}
    </>
  );
};

export default SusLogMainPage;
