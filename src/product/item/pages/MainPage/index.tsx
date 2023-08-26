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
import { MENU_PRODUCT, MENU_PRODUCT_ITEM } from '@base/config/menus';
import Loader from '@base/components/App/Loader';
import ListPage from '@product/item/pages/ListPage';
import ViewPage from '@product/item/pages/ViewPage';
import useIsSplitMode from '@base/hooks/useIsSplitMode';

interface MainPageProps {}

const MainPage = (props: MainPageProps) => {
  useLanguageByMenu([MENU_PRODUCT]);

  const layoutKey = MENU_PRODUCT_ITEM;
  const { isLoadingSetting } = useListPageSettings(layoutKey);
  const isSplitMode = useIsSplitMode(layoutKey);

  return (
    <Suspense fallback={<Loader />}>
      <Helmet>
        <title>VoraWorks - Desk &gt; Item</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <SplitViewContainer getPageDataKey={({ category }) => layoutKey}>
                  {({ isSplitMode }: any) => {
                    return isSplitMode ? (
                      <SplitView leftPane={<ListPage isSplitMode />} rightPane={<EmptySplitView />} />
                    ) : (
                      <ListPage isSplitMode={false} />
                    );
                  }}
                </SplitViewContainer>
              </Suspense>
            }
          />
          <Route
            path=":id/*"
            element={
              <Suspense fallback={<Loader />}>
                {isSplitMode ? (
                  <SplitView
                    leftPane={<ListPage isSplitMode />}
                    rightPane={
                      <Box className="pane-content" sx={{ flex: 1 }}>
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

export default MainPage;
