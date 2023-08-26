import { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import { SplitViewContainer } from '@base/components/@hanbiro/SplitView';
import { LIST_STALE_TIME } from '@base/config/constant';
import { MENU_PROJECT, MENU_PROJECT_TASK, MENU_PROJECT_TEMPLATE, MENU_SETTING } from '@base/config/menus';
import { useLanguageByMenu } from '@base/services/i18n';
import { useSetting } from '@project/hooks/useSetting';
import { GET_SETTINGS } from '@project/services/setting';
import { projectSettingsAtom } from '@project/store/atoms/setting';

import TemplateTaskListPage from './Task';

const TemplateMainPage = () => {
  useLanguageByMenu([MENU_PROJECT]);
  const setSettingData = useSetRecoilState(projectSettingsAtom);

  // get settings
  const { results: data } = useSetting(
    GET_SETTINGS,
    {},
    {
      staleTime: LIST_STALE_TIME
    }
  );

  useEffect(() => {
    if (data && data.results) {
      setSettingData(data.results);
    }
  }, [data]);

  const getListPage = (category: string) => {
    switch (category) {
      case 'group':
        return <TemplateTaskListPage />;

      case 'task':
        return <TemplateTaskListPage />;

      default:
        return <TemplateTaskListPage />;
    }
  };

  return (
    <>
      <Helmet>
        <title>VoraWorks - Project &gt; Template</title>
      </Helmet>
      <Routes>
        <Route
          path=":category"
          element={
            <SplitViewContainer getPageDataKey={({ category }) => `${MENU_PROJECT_TEMPLATE}_${category}`}>
              {({ isSplitMode, category }: any) => {
                console.log('category', category);
                return <>{getListPage(category)}</>;
              }}
            </SplitViewContainer>
          }
        />
        <Route path="/" element={<Navigate replace to={`/settings/template/${MENU_PROJECT}/${MENU_PROJECT_TASK}`} />} />
      </Routes>
    </>
  );
};

export default memo(TemplateMainPage);
