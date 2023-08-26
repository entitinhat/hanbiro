import { Suspense, useMemo } from 'react';

//third-party
import { Helmet } from 'react-helmet-async';
import { Route, Routes, useParams } from 'react-router-dom';
import { Box } from '@mui/material';

//project base
import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { useLanguageByMenu } from '@base/services/i18n';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import { MENU_OPPORTUNITY, MENU_OPPORTUNITY_OPPORTUNITY } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { useOrg } from '@base/hooks/iam/useOrg';

//menu
import ListPage from '@opportunity/pages/ListPage';
import ViewPage from '@opportunity/pages/ViewPage';

const MainPage = () => {
  const { id, tenantId } = useOrg();
  const params = useParams();
  console.log('MainPage > render', id, tenantId);

  useLanguageByMenu([MENU_OPPORTUNITY]);
  const pageDataKey = MENU_OPPORTUNITY_OPPORTUNITY;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  return (
    <>
      <Helmet>
        <title>VoraWorks - Opportunity</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path=""
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
