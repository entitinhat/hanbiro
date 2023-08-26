import { Helmet } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { useLanguageByMenu } from '@base/services/i18n';
import { deviceAtom } from '@base/store/atoms';
import { ListType } from '@base/types/app';

import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import { MENU_SETTING } from '@base/config/menus';
import { MENU_SETTING_TICKET_FORM } from '@base/config/menus';

import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';

import ListPage from '@settings/digital/ticket-form/pages/ListPage';
import ViewPage from '@settings/digital/ticket-form/pages/ViewPage';
import { Suspense } from 'react';
import { Box } from '@mui/material';
const MainPage = () => {
  useLanguageByMenu([MENU_SETTING]);
  const pageDataKey = MENU_SETTING_TICKET_FORM;

  // const { listType } = useListPageSettings(pageDataKey);
  // const [{ innerHeight }] = useRecoilState(deviceAtom);

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desks &gt; Ticket Form</title>
      </Helmet>
      {/* {!isLoadingSetting && ( */}
      <Routes>
        <Route
          path="/"
          element={
            <SplitViewContainer getPageDataKey={() => pageDataKey}>
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
      </Routes>
      {/* )} */}
    </>
  );
};

export default MainPage;
