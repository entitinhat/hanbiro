import React, { Suspense, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import _ from 'lodash';

// hooks
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';

// units
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';

// types
import { PageLayoutData } from '@base/types/pagelayout';

// menu import
import { MENU_PRODUCT, MENU_PRODUCT_UNIT, MENU_UNIT } from '@base/config/menus';
import { viewDataByMenuAtom } from '@base/store/atoms';
import ViewLayout from '@base/layouts/ViewLayout';
import * as keyNames from '@product/unit/config/keyNames';
import { default as viewConfig } from '@product/unit/config/view-field';
import { useBaseUnit } from '@product/unit/hooks/useBaseUnit';

import Header from './Header';
import Left from './Left';
import Center from './Center';
import Right from './Right';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();
  const id = params?.id as string;

  // defined
  const mainMenu = MENU_PRODUCT;
  const menuSource = MENU_UNIT;
  const menuSourceId = id;

  // const setViewData = useSetRecoilState(viewDataByMenuAtom(menuSource));

  // layout
  const layoutKey: string = MENU_PRODUCT_UNIT;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutKey, 'view');

  const ignoreFields: string[] = [];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: ignoreFields
  });

  const { isLoading, data, refetch } = useBaseUnit(viewSchema, menuSourceId);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId
      // data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  // useEffect(() => {
  //   if (!isLoading && !layoutLoading && layoutData) {
  //     setViewData(layoutData);
  //   }
  // }, [layoutView, data]);

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
    return <Left layoutData={layoutData} ignoreFields={[...ignoreFields, keyNames.KEY_UNIT_VALUES]} />;
  }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={_.cloneDeep(ignoreFields)} />;
  }, [layoutData, ignoreFields]);

  const RightMemo = useMemo(() => {
    return <Right menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />;
  }, [layoutData, ignoreFields]);

  const ViewMemo = useMemo(() => {
    return <ViewLayout componentHeader={HeaderMemo} componentLeft={LeftMemo} componentCenter={CenterMemo} componentRight={RightMemo} />;
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
