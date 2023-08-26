import React, { Suspense, useMemo } from 'react';

//third-party
import { useParams } from 'react-router-dom';
import _ from 'lodash';

//projects
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { PageLayoutData } from '@base/types/pagelayout';
import { MENU_CAMPAIGN } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

// menu import
import * as keyNames from '@campaign/config/keyNames';
import { default as viewConfig } from '@campaign/config/view-field';
import { useCampaignView } from '@campaign/hooks/useCampaign';

//local
import Header from './Header';
import Left from './Left';
import Right from './Right';
import Center from './Center';
// import Top from './Top';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();
  //console.log('router params', params);

  // defined
  const menuSource = MENU_CAMPAIGN;
  const menuCategory = params.category === 'all' ? params['*'] || '' : params.category || '';
  const menuSourceId = params?.id as string;

  // layout
  const layoutMenu: string = [menuSource, menuCategory.toLowerCase()].join('_');
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // The fields on below : it has to request single api.
  const dataIgnoreFields: string[] = [keyNames.KEY_CAMPAIGN_ATTACHMENT];

  const ignoreFields: string[] = [...dataIgnoreFields];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields
  });

  const { data, isLoading, refetch } = useCampaignView(viewSchema, menuSourceId);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  //console.log('...CAMPAIGN.Data...', data);
  //console.log('...CAMPAIGN.layoutData...', layoutData);

  const HeaderMemo = useMemo(() => {
    return (
      <Header
        isSplitMode={isSplitMode}
        routeCategory={params.category as string}
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

  const RightMemo = useMemo(() => {
    return <Right menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} layoutData={layoutData} />;
  }, [layoutData, ignoreFields]);

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
        componentRight={RightMemo}
      />
    );
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};

export default ViewPage;
