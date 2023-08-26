import React, { Suspense, useEffect, useMemo } from 'react';

//third-party
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';

//projects
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { PageLayoutData } from '@base/types/pagelayout';
import { MENU_SETTING_SURVEY } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

// menu import
import { default as viewConfig } from '@settings/digital/survey/config/view-field';
import { useSurvey } from '@settings/digital/survey/hooks/useSurvey';

//local
import Header from './Header';
import Left from './Left';
import Center from './Center';
import { headerHeight } from '@base/config/config';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();
  //console.log('router params', params);

  // defined
  const menuSource = MENU_SETTING_SURVEY;
  const menuCategory = 'survey';
  const menuSourceId = params?.id as string;

  // layout
  const pageDataKey: string = ['setting', menuCategory.toLowerCase()].join('_');
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(pageDataKey, 'view');
  // The fields on below : it has to request single api.
  const dataIgnoreFields: string[] = [];
  const ignoreFields: string[] = [...dataIgnoreFields];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields
  });

  const { data, isLoading, refetch } = useSurvey(viewSchema, menuSourceId);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  //console.log('...CUSTOMER.Data...', data);
  //console.log('...Survey.layoutData...', layoutData);

  const HeaderMemo = useMemo(() => {
    return (
      <Header
        isSplitMode={isSplitMode}
        menuCategory={menuCategory}
        menuSource={menuSource}
        menuSourceId={menuSourceId}
        layoutData={layoutData}
        ignoreFields={ignoreFields}
        onRefresh={refetch}
      />
    );
  }, [menuCategory, isSplitMode, layoutData, ignoreFields]);

  const LeftMemo = useMemo(() => {
    return <Left layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData, ignoreFields]);

  // const RightMemo = useMemo(() => {
  //   return (
  //     <Right
  //       menuSource={menuSource}
  //       menuCategory={menuCategory}
  //       menuSourceId={menuSourceId}
  //       layoutData={layoutData}
  //     />
  //   );
  // }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return (
      <Center menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={[]} />
    );
  }, [layoutData, ignoreFields]);

  // const TopMemo = useMemo(() => {
  //   return <Top />;
  // }, []);

  const ViewMemo = useMemo(() => {
    return (
      <ViewLayout
        componentHeader={HeaderMemo}
        //componentTop={TopMemo}
        componentLeft={LeftMemo}
        componentCenter={CenterMemo}
        // componentRight={RightMemo}
        containerSx={{ height: `calc(100vh - ${headerHeight * 2 + 40}px)` }}
      />
    );
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};

export default ViewPage;
