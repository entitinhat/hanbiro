import React, { Suspense, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import * as keyNames from '@settings/sites/config/key-names';
// hooks
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';

// units
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';

// types
import { PageLayoutData } from '@base/types/pagelayout';

// menu import
import { MENU_SETTING_CTA, MENU_SETTING_SITE_DESK } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';
import { default as viewConfig } from '@settings/sites/desk/config/view-field';
import Header from './Header';
import Left from './Left';
import Center from './Center';
import { useSite } from '@settings/sites/hooks/useSite';
import { parseFields } from '../MainPage/Helper';
import { dummyData } from './dummy-data';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_SETTING_SITE_DESK;
  const menu = 'desk';
  const menuSourceId = params?.id as string;
  const ignoreFields = [keyNames.KEY_MENU_SITE_SUBJECT, keyNames.KEY_MENU_SITE_NAME];

  // layout
  const layoutMenu: string = MENU_SETTING_CTA;
  let { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');
  layoutView = parseFields(layoutView, 'view');
  // build query

  /*const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig
  });*/
  const viewSchema = `id
  name
  description
  createdAt`;
  let { isLoading, data, refetch } = useSite(viewSchema, menuSourceId);
  data = dummyData;
  
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
        menu={menu}
        isSplitMode={isSplitMode}
        //menuSource={menuSource}
        //menuSourceId={menuSourceId}
        layoutData={layoutData}
      />
    );
  }, [menu, isSplitMode, layoutData]);

  const LeftMemo = useMemo(() => {
    return <Left layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />;
  }, [layoutData]);

  const ViewMemo = useMemo(() => {
    return (
      <ViewLayout
        componentHeader={HeaderMemo}
        // componentTop={TopMemo}
        componentLeft={LeftMemo}
        componentCenter={CenterMemo}
      />
    );
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
