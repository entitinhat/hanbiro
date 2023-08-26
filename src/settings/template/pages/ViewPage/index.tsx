import React, { Suspense, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// hooks
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';

// units
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';

// types
import { PageLayoutData } from '@base/types/pagelayout';

// menu import
import { MENU_SETTING_CTA } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

import Header from './Header';
import Left from './Left';
import Center from './Center';
import { useMenuTemplate } from '@settings/template/hooks/useMenuTemplate';
import { Template } from '@settings/template/types/template';

interface ViewProps {
  isSplitMode?: boolean;
  groupTemplate: Template;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode, groupTemplate } = props;
  // params
  console.log(`~~~~ groupTemplate index`, groupTemplate);

  const params = useParams();
  //-------------------------------Setting---------------------------------------------------------------------
  const menuSource = groupTemplate.menu;
  const group = groupTemplate.group;
  const menu = groupTemplate.path;
  const menuSourceId = params?.id as string;
  const ignoreFields = groupTemplate.ignoreFields;
  const parseFieldsView = groupTemplate.parseFieldsView;
  const viewConfig = groupTemplate.configView;
  //----------------------------------------------------------------------------------------------

  // layout
  const layoutMenu: string = MENU_SETTING_CTA;
  let { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');
  layoutView = parseFieldsView(layoutView, 'view');
  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig
  });
  const { data } = useMenuTemplate(viewSchema, menuSourceId);
  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  //-------------------------------------------Render-----------------------------------------------------------
  const HeaderMemo = useMemo(() => {
    return (
      <Header
        menu={menu}
        titleWrite={groupTemplate.title}
        templateGroup={groupTemplate.path}
        groupTemplate={group}
        isSplitMode={isSplitMode}
        layoutData={layoutData}
        viewConfig={viewConfig}
      />
    );
  }, [menu, isSplitMode, layoutData]);

  const LeftMemo = useMemo(() => {
    return <Left groupTemplate={group} layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData]);

  const CenterMemo = useMemo(() => {
    return (
      <Center groupTemplate={group} viewConfig={viewConfig} menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />
    );
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
