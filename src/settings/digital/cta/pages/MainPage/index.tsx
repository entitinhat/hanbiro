import { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

// mui import
import { Box } from '@mui/material';

// project import
import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import { MENU_SETTING } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { useLanguageByMenu } from '@base/services/i18n';

import CtaListPage from '@settings/digital/cta/pages/ListPage';
import CtaViewPage from '@settings/digital/cta/pages/ViewPage';
import { Helmet } from 'react-helmet-async';

interface MainPageProps {}

const MainPage = (props: MainPageProps) => {
  const navigate = useNavigate();

  useLanguageByMenu([MENU_SETTING]);
  let layoutCategory = 'cta';
  const pageDataKey = `${MENU_SETTING}_${layoutCategory}`;

  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desk &gt; CTA</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          {/* <Route path="/" element={<Navigate replace to={`/settings/digital/cta/all`} />} /> */}
          <Route
            path="/"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => pageDataKey}>
                {({ isSplitMode }: any) => {
                  return isSplitMode ? (
                    <SplitView leftPane={<CtaListPage isSplitMode />} rightPane={<EmptySplitView />} />
                  ) : (
                    <CtaListPage isSplitMode={false} />
                  );
                }}
              </SplitViewContainer>
            }
          />
          <Route
            path="/:id"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => pageDataKey}>
                {({ isSplitMode }: any) => {
                  return isSplitMode ? (
                    <SplitView
                      leftPane={<CtaListPage isSplitMode />}
                      rightPane={
                        <Box className="pane-content" sx={{ flex: 1 }}>
                          <Suspense fallback={<></>}>
                            <CtaViewPage isSplitMode />
                          </Suspense>
                        </Box>
                      }
                    />
                  ) : (
                    <Suspense fallback={<></>}>
                      <CtaViewPage isSplitMode={false} />
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
