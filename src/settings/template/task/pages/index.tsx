import { Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import SplitView, { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { useLanguageByMenu } from '@base/services/i18n';
import { deviceAtom } from '@base/store/atoms';
import { ListType } from '@base/types/app';
import * as keyNames from '@settings/template/config/key-names';
import SplitViewContainer from '@base/components/@hanbiro/SplitView/SplitViewContainer';

import useListPageSettings from '@base/hooks/user-setting/useListPageSetting';
import { queryKeys } from '@settings/template/config/queryKeys';

import ListPage from '@settings/template/pages/ListPage';

import ViewPage from '@settings/template/pages/ViewPage';
import { groupTemplates } from '@settings/template/config/tabs-config';

interface TaskMainPageProps {}

const TaskMainPage = (props: TaskMainPageProps) => {
  const groupTemplate = groupTemplates[keyNames.KEY_MENU_TEMPLATE_TASK];

  useLanguageByMenu([queryKeys.settingMenuTemplatesGet]);

  const { listType, isLoadingSetting } = useListPageSettings(groupTemplate.menu);
  const [{ innerHeight }] = useRecoilState(deviceAtom);
  const isSplitMode = listType === ListType.SPLIT;
  const splitViewProps = {
    isSplitMode,
    styles: {
      height: innerHeight !== 0 ? innerHeight - 60 : 0
    }
  };

  let listProps = {
    groupTemplate,
    isSplitMode
  };
  return (
    <>
      {!isLoadingSetting && (
        <Routes>
          <Route
            path="/"
            element={
              <SplitViewContainer getPageDataKey={() => groupTemplate.menu}>
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
              <SplitViewContainer getPageDataKey={() => groupTemplate.menu}>
                {({ isSplitMode }: any) => {
                  return isSplitMode ? (
                    <SplitView
                      {...splitViewProps}
                      leftPane={<ListPage {...listProps} isSplitMode />}
                      rightPane={
                        <div className="pane-content" style={{ flex: 1 }}>
                          <ViewPage {...listProps} isSplitMode />
                        </div>
                      }
                    />
                  ) : (
                    <ViewPage {...listProps} isSplitMode={false} />
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

export default TaskMainPage;
