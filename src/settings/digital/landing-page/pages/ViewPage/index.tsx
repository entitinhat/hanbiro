import React, { Suspense, useEffect, useMemo } from 'react';

//third-party
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import _ from 'lodash';

//projects
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { PageLayoutData } from '@base/types/pagelayout';
import { MENU_SETTING, MENU_SETTING_LANDINGPAGE } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

// menu import
import { default as viewConfig } from '@settings/digital/landing-page/config/view-field';
import { useLandingPage } from '../../hooks/useLandingPage';

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

  // defined
  // const menuSource = MENU_SETTING;
  const menuSource = MENU_SETTING_LANDINGPAGE;
  const menuCategory = 'landing_page';
  const menuSourceId = params?.id as string;

  // layout
  // const layoutMenu: string = `${MENU_SETTING}_${menuCategory}`
  const layoutMenu: string = `${menuSource}`;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // The fields on below : it has to request single api.
  const dataIgnoreFields: string[] = ['view', 'preview', 'click', 'clickRate'];

  const ignoreFields: string[] = [...dataIgnoreFields];

  const leftIgnoreFields: string[] = [
    ...dataIgnoreFields,
    'name',
    'assignTo',
    'template',
    'title',
    'html'
    // 'publish',
    // 'publishDate'
  ];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields
  });

  const { data, isLoading, refetch } = useLandingPage(viewSchema, menuSourceId);

  // useEffect(() => {
  //   if(isLoading){
  //     console.log('data', data)
  //   }
  // },[isLoading])

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

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
  }, [layoutMenu, isSplitMode, layoutData, ignoreFields, menuSource, layoutData]);

  const LeftMemo = useMemo(() => {
    return <Left layoutData={layoutData} ignoreFields={leftIgnoreFields} onRefetch={refetch} />;
  }, [layoutData, leftIgnoreFields]);

  const CenterMemo = useMemo(() => {
    return (
      <Center
        menuSource={MENU_SETTING_LANDINGPAGE}
        menuCategory={layoutMenu}
        menuSourceId={menuSourceId}
        layoutData={layoutData}
        ignoreFields={[]}
        viewConfig={viewConfig}
        refetch={refetch}
      />
    );
  }, [layoutData, ignoreFields]);

  const ViewMemo = useMemo(() => {
    return (
      <ViewLayout
        componentHeader={HeaderMemo}
        componentLeft={LeftMemo}
        componentCenter={CenterMemo}
        containerSx={{ height: `calc(100vh - ${headerHeight * 2 + 40}px)` }}
      />
    );
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};

export default ViewPage;
