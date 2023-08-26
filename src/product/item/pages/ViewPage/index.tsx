import React, { Suspense, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
// import { useRecoilState, useSetRecoilState } from 'recoil';
import _ from 'lodash';

// hooks
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';

// units
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';

// types
import { PageLayoutData } from '@base/types/pagelayout';

// menu import
import Loader from '@base/components/App/Loader';
import { MENU_ITEM, MENU_PRODUCT, MENU_PRODUCT_ITEM } from '@base/config/menus';
// import { viewDataByMenuAtom } from '@base/store/atoms';
import ViewLayout from '@base/layouts/ViewLayout';
import * as keyNames from '@product/item/config/keyNames';
import { default as viewConfig } from '@product/item/config/view-field';
import { useItem } from '@product/item/hooks/useItem';

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
  const id = params?.id as string;

  // defined
  // const mainMenu = MENU_PRODUCT;
  const menuSource = MENU_ITEM;
  const menuSourceId = id;

  // const setViewData = useSetRecoilState(viewDataByMenuAtom(menuSource));

  // layout
  const layoutKey: string = MENU_PRODUCT_ITEM;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutKey, 'view');

  const ignoreFields: string[] = [];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: ignoreFields
  });

  const { isLoading, data, refetch } = useItem(viewSchema, menuSourceId);

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
        menu={menuSource}
        isSplitMode={isSplitMode}
        menuSource={menuSource}
        menuSourceId={menuSourceId}
        layoutData={layoutData}
        ignoreFields={ignoreFields}
        onRefresh={refetch}
      />
    );
  }, [menuSource, isSplitMode, layoutData, ignoreFields]);

  const LeftMemo = useMemo(() => {
    return <Left layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData, ignoreFields]);

  const RightMemo = useMemo(() => {
    return <Right menuSource={menuSource} menuSourceId={menuSourceId} />;
  }, [layoutData, menuSource, menuSourceId]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={_.cloneDeep(ignoreFields)} />;
  }, [layoutData, ignoreFields]);

  // const TopMemo = useMemo(() => {
  //   return <Top />;
  // }, []);

  console.log('...ITEM.layoutData...', layoutData);
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

  return <Suspense fallback={<Loader />}>{ViewMemo}</Suspense>;
};
export default ViewPage;
