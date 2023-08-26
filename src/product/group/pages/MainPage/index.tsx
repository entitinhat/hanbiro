import React, { Suspense, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';

// mui import
import { Box, useMediaQuery, useTheme } from '@mui/material';

// project import
import { useLanguageByMenu } from '@base/services/i18n';
import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { MENU_PRODUCT, MENU_PRODUCT_TREE } from '@base/config/menus';

import ListPage from '@product/group/pages/ListPage';
import ViewPage from '@product/group/pages/ViewPage';
import ItemView from '@product/item/pages/ViewPage';
import ProductView from '@product/product/pages/ViewPage';
import MobileListPage from '../MobileListPage';
import Loader from '@base/components/App/Loader';
import useDevice from '@base/hooks/useDevice';

interface MainPageProps {}

const MainPage = (props: MainPageProps) => {
  useLanguageByMenu([MENU_PRODUCT]);

  const layoutKey = MENU_PRODUCT_TREE;
  // const { isLoadingSetting } = useListPageSettings(layoutKey);

  const isLoadingSetting = false;

  const theme = useTheme();
  const { isMobile } = useDevice();

  const TreeMemo = useMemo(() => {
    return <ListPage isSplitMode />;
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Helmet>
        <title>VoraWorks - Desk &gt; Product-Tree</title>
      </Helmet>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path="/:type/:id"
            element={
              <SplitViewContainer getPageDataKey={({ category }) => layoutKey}>
                {({ isSplitMode }: any) => {
                  return (
                    <Suspense fallback={<></>}>
                      {isMobile ? (
                        <MobileListPage />
                      ) : (
                        <SplitView
                          leftPane={TreeMemo}
                          rightPane={
                            <Box className="pane-content" sx={{ flex: 1, height: '100%' }}>
                              <ViewPage isSplitMode />
                            </Box>
                          }
                        />
                      )}
                    </Suspense>
                  );
                }}
              </SplitViewContainer>
            }
          />
          <Route path="/" element={<Navigate replace to={`/product/group/${'type'}/${'id'}`} />} />
        </Routes>
      )}
    </Suspense>
  );
};

export default MainPage;
