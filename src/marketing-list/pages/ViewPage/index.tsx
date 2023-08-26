import React, { Suspense, useMemo } from 'react';

//third-party
import { useParams } from 'react-router-dom';
import _ from 'lodash';

//projects
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { PageLayoutData } from '@base/types/pagelayout';
import { MENU_CUSTOMER, MENU_CUSTOMER_MARKETING, MENU_CUSTOMER_MARKETING_LIST } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

// menu import
//import * as keyNames from '@marketing-list/config/keyNames';
import { default as viewConfig } from '@marketing-list/config/view-field';

//local
import Header from './Header';
import Left from './Left';
import Right from './Right';
import Center from './Center';
import { useMarketingList } from '@marketing-list/hooks/useMarketingList';
import * as keyNames from '@marketing-list/config/keyNames';

// import Top from './Top';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_CUSTOMER_MARKETING_LIST;
  const menuCategory = 'marketing_list';
  const menuSourceId = params?.id as string;

  // layout
  const layoutMenu: string = menuSource;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // The fields on below : it has to request single api.
  const dataIgnoreFields: string[] = [
    keyNames.KEY_NAME_CUSTOMER_TOTAL_MEMBERS,
    keyNames.KEY_NAME_CUSTOMER_USED_DATE,
    keyNames.KEY_NAME_CUSTOMER_RELATED_CAMPAIGNS
  ];

  const ignoreFields: string[] = [...dataIgnoreFields];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields
  });

  // console.log('layoutView?.data: ', layoutView?.data);
  // console.log('viewConfig: ', viewConfig);
  // console.log('dataIgnoreFields: ', dataIgnoreFields);
  // console.log('viewSchema: ', viewSchema);

  const { data, isLoading, refetch } = useMarketingList(viewSchema, menuSourceId);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  // console.log('view data', data);
  // console.log('layoutData: ', layoutData);

  const HeaderMemo = useMemo(() => {
    return (
      <Header
        isSplitMode={isSplitMode}
        routeCategory="marketing"
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
    return <ViewLayout componentHeader={HeaderMemo} componentLeft={LeftMemo} componentCenter={CenterMemo} componentRight={RightMemo} />;
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};

export default ViewPage;
