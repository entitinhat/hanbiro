import React, { Suspense, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// hooks
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { useAssignRule } from '@settings/assignment-rule/rule/hooks/useAssignRule';

// units
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';

// types
import { PageLayoutData } from '@base/types/pagelayout';

// menu import
import Header from './Header';
import Left from './Left';
import Right from './Right';
import Center from './Center';
import Top from './Top';
import { MENU_SETTING_CTA, MENU_SETTING_ASSIGNMENT_RULE } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';
import * as keyNames from '@settings/assignment-rule/rule/config/keyNames';
import { default as viewConfig } from '@settings/assignment-rule/rule/config/view-field';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_SETTING_ASSIGNMENT_RULE;
  //const menu = params.category as string;
  const menu = MENU_SETTING_ASSIGNMENT_RULE;
  const menuSourceId = params?.id as string;
  const ignoreFields: any[] = [
    'sortOrder',
    'criteria',
    'assignTo',
    'checkAvailability',
    'customer',
    'product',
    'owner',
    'attributes',
    'order',
    'tag',
    'category',
    'checkAvailable',
    'classifications'
  ]; //keyNames.KEY_NAME_ASSIGNMENT_RULE_NAME


  // layout
  const layoutMenu: string = MENU_SETTING_ASSIGNMENT_RULE;
  let { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: ignoreFields
  });

  const { isLoading, data, refetch } = useAssignRule(viewSchema, menuSourceId);
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
        layoutData={layoutData}
      />
    );
  }, [menu, isSplitMode, layoutData]);

  const LeftMemo = useMemo(() => {
    return <Left layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData, ignoreFields]);

  // const RightMemo = useMemo(() => {
  //   return <Right menuSource={menuSource} menuSourceId={menuSourceId} />;
  // }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData]);


  const ViewMemo = useMemo(() => {
    return (
      <ViewLayout
        componentHeader={HeaderMemo}
        componentLeft={LeftMemo}
        componentCenter={CenterMemo}
      />
    );
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
