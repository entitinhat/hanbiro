import { Suspense, useMemo } from 'react';

//third-party
import { Helmet } from 'react-helmet-async';
import { Route, Routes, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

//project base
import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { useLanguageByMenu } from '@base/services/i18n';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import { MENU_OPPORTUNITY, MENU_OPPORTUNITY_COMPETITOR } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { useOrg } from '@base/hooks/iam/useOrg';

//menu
import ListPage from '@competitor/pages/ListPage';
import ViewPage from '@competitor/pages/ViewPage';

const MainPage = () => {
  const { id, tenantId } = useOrg();
  const params = useParams();
  console.log('MainPage > render', id, tenantId);

  //get languages by menu
  useLanguageByMenu([MENU_OPPORTUNITY]);

  //get config
  const pageDataKey = MENU_OPPORTUNITY_COMPETITOR;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  return (
    <>
      <Helmet>
        <title>VoraWorks - Competitor</title>
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

export default MainPage;
