import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { useLanguageByMenu } from '@base/services/i18n';
import { deviceAtom } from '@base/store/atoms';
import { ListType } from '@base/types/app';
import * as keyNames from '@settings/sites/config/key-names';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import ListPage from '../../../containers/ListPage';
import { queryKeys } from '@settings/sites/config/queryKeys';
import { SITES_GROUP } from '@settings/sites/config/constants';
import ViewPage from '../ViewPage';

interface DeskMainPageProps {}

const DeskMainPage = (props: DeskMainPageProps) => {
  useLanguageByMenu([queryKeys.settingMenuSiteGet]);
  const groupSite = SITES_GROUP[keyNames.KEY_MENU_SETTING_SITE_DESK];
  const { listType } = useListPageSettings(groupSite.menu);
  const [{ innerHeight }] = useRecoilState(deviceAtom);
  const isSplitMode = listType === ListType.SPLIT;
  const splitViewProps = {
    isSplitMode,
    styles: {
      height: innerHeight !== 0 ? innerHeight - 60 : 0
    }
  };

  let listProps = {
    groupSite,
    isSplitMode
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
            <SplitViewContainer getPageDataKey={() => groupSite.menu}>
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
          path="/:id"
          element={
            <SplitViewContainer getPageDataKey={() => groupSite.menu}>
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

export default DeskMainPage;
