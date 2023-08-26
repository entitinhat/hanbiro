import { Suspense, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes, useParams } from 'react-router-dom';

import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { useLanguageByMenu } from '@base/services/i18n';
import ListPage from '@desk/ticket/pages/ListPage';
import ViewPage from '@desk/ticket/pages/ViewPage';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import { MENU_DESK, MENU_DESK_TICKET } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { Box } from '@mui/material';
import { useOrg } from '@base/hooks/iam/useOrg';

const TicketMainPage = () => {
  const { id, tenantId } = useOrg();
  const params = useParams();
  console.log('TicketMainPage > render', id, tenantId);

  useLanguageByMenu([MENU_DESK]);
  const pageDataKey = MENU_DESK_TICKET;
  const { isLoadingSetting } = useListPageSettings(pageDataKey);

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desk &gt; Ticket</title>
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

export default TicketMainPage;
