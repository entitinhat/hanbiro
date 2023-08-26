import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { SETTING_ASSIGNMENT_RULE } from '@base/config/routeMenus';
import { useLanguageByMenu } from '@base/services/i18n';
import { deviceAtom } from '@base/store/atoms';
import { ListType } from '@base/types/app';
import ListPage from '@settings/manage-access/pages/ListPage';
import ViewPage from '@settings/manage-access/pages/ViewPage';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import { MENU_SETTING_MANAGE_ACCESS } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';

const MainPage = () => {
  // const params = useParams();
  // console.log('RuleMainPage > render', params);

  // useLanguageByMenu([MENU_SETTING_ASSIGNMENT]);
  const { listType } = useListPageSettings(MENU_SETTING_MANAGE_ACCESS);
  const [{ innerHeight }] = useRecoilState(deviceAtom);

  const isSplitMode = listType === ListType.SPLIT;
  const splitViewProps = {
    isSplitMode,
    styles: {
      height: innerHeight !== 0 ? innerHeight - 60 : 0
    }
  };

  let listProps = {
    categoryOptions: {}
  };

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desk &gt; Assignment Rule</title>
      </Helmet>
      {/* {!isLoadingSetting && ( */}
      <Routes>
        <Route
          path="/"
          element={
            <SplitViewContainer getPageDataKey={() => MENU_SETTING_MANAGE_ACCESS}>
              {({ isSplitMode }: any) => {
                return isSplitMode ? (
                  <SplitView {...splitViewProps} leftPane={<ListPage {...listProps} isSplitMode />} rightPane={<EmptySplitView />} />
                ) : (
                  <ListPage {...listProps} isSplitMode={false} />
                );
              }}
            </SplitViewContainer>
          }
        />
        <Route
          path=":id/*"
          element={
            <SplitViewContainer getPageDataKey={() => MENU_SETTING_MANAGE_ACCESS}>
              {({ isSplitMode }: any) => {
                return isSplitMode ? (
                  <SplitView
                    {...splitViewProps}
                    leftPane={<ListPage {...listProps} isSplitMode />}
                    rightPane={
                      <div className="pane-content" style={{ flex: 1 }}>
                        <ViewPage isSplitMode />
                      </div>
                    }
                  />
                ) : (
                  <ViewPage isSplitMode={false} />
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
