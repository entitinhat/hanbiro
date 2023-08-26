import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';

// mui import
import { Box } from '@mui/material';

// project import
import { useLanguageByMenu } from '@base/services/i18n';
import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { MENU_PRODUCT, MENU_PRODUCT_PRODUCT } from '@base/config/menus';

import ListPage from '@product/product/pages/ListPage';
import ViewPage from '@product/product/pages/ViewPage';
import Loader from '@base/components/App/Loader';
import useDevice from '@base/hooks/useDevice';
import useIsSplitMode from '@base/hooks/useIsSplitMode';

interface MainPageProps {}

const MainPage = (props: MainPageProps) => {
  useLanguageByMenu([MENU_PRODUCT]);

  const { isMobile } = useDevice();

  const layoutKey = MENU_PRODUCT_PRODUCT;
  const { isLoadingSetting } = useListPageSettings(layoutKey);

  const isSplitMode = useIsSplitMode(layoutKey);

  return (
    <Suspense fallback={<Loader />}>
      <Helmet>
        <title>VoraWorks - Desk &gt; Product</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path="/"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => layoutKey}>
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
                    leftPane={<ListPage isSplitMode={isSplitMode} />}
                    rightPane={
                      <Box className="pane-content" sx={{ flex: 1 }}>
                        <Suspense fallback={<></>}>
                          <ViewPage isSplitMode={isSplitMode} />
                        </Suspense>
                      </Box>
                    }
                  />
                ) : (
                  <ViewPage isSplitMode={isSplitMode} />
                )}
              </Suspense>
            }
          />
        </Routes>
      )}
    </Suspense>
  );
};

export default MainPage;
