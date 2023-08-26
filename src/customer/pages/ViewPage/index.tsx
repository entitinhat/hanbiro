import React, { Suspense, useMemo } from 'react';

//third-party
import { useParams } from 'react-router-dom';
import _ from 'lodash';

//projects
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { PageLayoutData } from '@base/types/pagelayout';
import { MENU_CUSTOMER } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

// menu import
//import * as keyNames from '@customer/config/keyNames';
import { default as viewConfig } from '@customer/config/view-field';
import { useCustomer } from '@customer/hooks/useCustomer';

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
  const menuSource = MENU_CUSTOMER;
  const menuCategory = params.category === 'all' ? params['*'] || '' : params.category || '';
  const menuSourceId = params?.id as string;

  // layout
  const layoutMenu: string = [menuSource, menuCategory.toLowerCase()].join('_');
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // The fields on below : it has to request single api.
  const dataIgnoreFields: string[] = [];

  const ignoreFields: string[] = [...dataIgnoreFields];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields
  });

  const { data, isLoading, refetch } = useCustomer(viewSchema, menuSourceId);
  console.log('🚀 ~ file: index.tsx:60 ~ data:', data);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);
  console.log('🚀 ~ file: index.tsx:64 ~ layoutData:', layoutData);

  //console.log('...CUSTOMER.Data...', data);
  //console.log('...CUSTOMER.layoutData...', layoutData);

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
    return <Left layoutData={layoutData} menuCategory={menuCategory} ignoreFields={ignoreFields} onRefetch={refetch} />;
  }, [layoutData, ignoreFields]);

  const RightMemo = useMemo(() => {
    return <Right menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} layoutData={layoutData} />;
  }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return (
      <Center
        menuSource={menuSource}
        menuCategory={menuCategory}
        menuSourceId={menuSourceId}
        layoutData={layoutData}
        ignoreFields={[]}
        onRefetch={refetch}
      />
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
