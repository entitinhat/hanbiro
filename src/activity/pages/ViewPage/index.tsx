import _ from 'lodash';
import React, { Suspense, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import * as keyNames from '@activity/config/keyNames';
import { default as viewConfig } from '@activity/config/view-field';
import { useActivity } from '@activity/hooks/useActivity';
import NotFound from '@base/components/@hanbiro/Errors/NotFound';
import { MENU_ACTIVITY } from '@base/config/menus';
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import ViewLayout from '@base/layouts/ViewLayout';
import { viewDataByMenuAtom } from '@base/store/atoms';
import { PageLayoutData } from '@base/types/pagelayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';

import Center from './Center';
import Header from './Header';
import Left from './Left';
import Right from './Right';
import Top from './Top';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_ACTIVITY;
  const menu = params.category as string;
  const activityType = params.type as string;
  const menuSourceId = params?.id as string;
  // const [activityType, menuSourceId] = id?.split('_');

  // const [viewData, setViewData] = useRecoilState(viewDataByMenuAtom(menuSource));

  // layout
  const layoutMenu: string = [menuSource, activityType.toLowerCase()].join('_');
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // The fields on below : IT has to request single api.
  const dataIgnoreFields = [
    keyNames.KEY_NAME_ACTIVITY_TASK_CHECKLIST,
    keyNames.KEY_NAME_ACTIVITY_TASK_SEQUENCE,
    keyNames.KEY_NAME_ACTIVITY_ATTACHMENTS,
    // keyNames.KEY_NAME_ACTIVITY_RELATED_TO,
    // keyNames.KEY_NAME_ACTIVITY_TAGS,
    // keyNames.KEY_NAME_ACTIVITY_PRODUCTS,
    // keyNames.KEY_NAME_ACTIVITY_TASK_KNOWLEDGE,
    keyNames.KEY_NAME_ACTIVITY_SMS_IMAGE
  ];

  const ignoreFields = [
    ...dataIgnoreFields,
    keyNames.KEY_NAME_ACTIVITY_CONTENT,
    // keyNames.KEY_NAME_ACTIVITY_DESCRIPTION,
    // keyNames.KEY_NAME_ACTIVITY_STATUS,
    keyNames.KEY_NAME_ACTIVITY_MAIL_SEND_INDIVIDUAL
  ];

  if (activityType == 'task') {
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_TO);
    ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_DIRECTION);
    // dataIgnoreFields.push(keyNames.KEY_NAME_ACTIVITY_TO);
  } else if (activityType == 'sms') {
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_FROM);
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_TO);
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_DIRECTION);
  } else if (activityType == 'email') {
    ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_DIRECTION);
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_FROM);
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_TO);
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_CC);
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_BCC);
  } else if (activityType == 'call') {
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_DIRECTION);
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_FROM);
    // ignoreFields.push(keyNames.KEY_NAME_ACTIVITY_TO);
  } else {
    return <NotFound />;
  }

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields
  });

  const { isLoading, data, refetch } = useActivity(viewSchema, menuSourceId);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  // useEffect(() => {
  //   if (!isLoading && !layoutLoading && layoutData) {
  //     setViewData(layoutData);
  //   }
  // }, [layoutView, data]);
  console.log('...ACTIVITY.layoutData...', layoutData);

  const HeaderMemo = useMemo(() => {
    return (
      <Header
        menu={menu}
        isSplitMode={isSplitMode}
        menuSource={menuSource}
        menuSourceId={menuSourceId}
        activityType={activityType}
        layoutData={layoutData}
        ignoreFields={ignoreFields}
        onRefresh={refetch}
      />
    );
  }, [menu, isSplitMode, layoutData, ignoreFields]);

  const LeftMemo = useMemo(() => {
    return <Left layoutData={layoutData} ignoreFields={ignoreFields} activityType={activityType} />;
  }, [layoutData, ignoreFields]);

  const RightMemo = useMemo(() => {
    return <Right layoutData={layoutData} menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={_.cloneDeep(ignoreFields)} />;
  }, [layoutData, ignoreFields]);

  const TopMemo = useMemo(() => {
    return <Top />;
  }, []);

  const ViewMemo = useMemo(() => {
    return (
      <ViewLayout
        componentHeader={HeaderMemo}
        // componentTop={TopMemo}
        componentLeft={LeftMemo}
        componentCenter={CenterMemo}
        componentRight={RightMemo}
      />
    );
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
