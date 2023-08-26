import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Routes, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { SETTING_ASSIGNMENT_RULE } from '@base/config/routeMenus';
import { useLanguageByMenu } from '@base/services/i18n';
import { deviceAtom } from '@base/store/atoms';
import { ListType } from '@base/types/app';
import ListPage from '@settings/assignment-rule/report/pages/ListPage';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';
import { MENU_SETTING_ASSIGNMENT, MENU_SETTING_ASSIGNMENT_RULE } from '@base/config/menus';
import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';

const ReportMainPage = () => {
  const params = useParams();
  console.log('RuleMainPage > render', params);

  useLanguageByMenu([MENU_SETTING_ASSIGNMENT]);
  const { listType } = useListPageSettings(MENU_SETTING_ASSIGNMENT_RULE);
  const [{ innerHeight }] = useRecoilState(deviceAtom);

  const isSplitMode = listType === ListType.SPLIT;
  const splitViewProps = {
    isSplitMode,
    styles: {
      height: innerHeight !== 0 ? innerHeight - 60 : 0
    }
  };

  const categoryOptions = useMemo(() => {
    const menus: { [index: string]: string } = {};
    for (const menu of SETTING_ASSIGNMENT_RULE) {
      menus[menu.value] = menu.label;
    }
    return menus;
  }, []);

  let listProps = {
    categoryOptions
  };

  return (
    <>
      <Helmet>
        <title>VoraWorks - Desk &gt; Assignment Report</title>
      </Helmet>
      {/* {!isLoadingSetting && ( */}
      <Routes>
        <Route
          path="/"
          element={
            <SplitViewContainer getPageDataKey={() => MENU_SETTING_ASSIGNMENT_RULE}>
              {({ isSplitMode }: any) => {
                return isSplitMode ? (
                  //UI dont have slitView in Report Page
                  // <SplitView {...splitViewProps} leftPane={<ListPage {...listProps} isSplitMode />} rightPane={<EmptySplitView />} />
                  <ListPage {...listProps} isSplitMode={false} />
                ) : (
                  <ListPage {...listProps} isSplitMode={false} />
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

export default ReportMainPage;
