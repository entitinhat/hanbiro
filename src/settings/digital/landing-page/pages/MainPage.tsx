import { Suspense, } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box } from '@mui/material';
import { MENU_SETTING_LANDINGPAGE } from '@base/config/menus'
import SplitView, { EmptySplitView, SplitViewContainer } from '@base/components/@hanbiro/SplitView';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';


//menu import
import ListPage from '@settings/digital/landing-page/pages/ListPage';
import ViewPage from '@settings/digital/landing-page/pages/ViewPage';

const LandingPage = () => {

  const pageDataKey = MENU_SETTING_LANDINGPAGE;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  return (
    <>
      <Helmet>
        <title>VoraWorks - Setting &gt; Landing Page</title>
      </Helmet>

      {!isLoadingSetting && (
        <>
        <Routes>
          <Route
            path="/"
            element={
              <SplitViewContainer getPageDataKey={() => pageDataKey}>
                {({ isSplitMode }: any) => {
                  return isSplitMode ? (
                    // <SplitView leftPane={<ListPage isSplitMode />} rightPane={<EmptySplitView />} />
                    <SplitView leftPane={<ListPage isSplitMode />} rightPane={<EmptySplitView />} />
                  ) : (
                    <ListPage isSplitMode={false} />
                  );
                }}
              </SplitViewContainer>
            }
          />

          <Route
            path="/:id"
            element={
              <SplitViewContainer getPageDataKey={() => pageDataKey}>
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

          <Route path="/*" element={<Navigate replace to={`/settings/digital/landing-page/`} />} />
        </Routes>
        </>
      )}
      
    </>
  );
};

export default LandingPage;
