import { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// hooks
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';

// units
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';

// types
import { PageLayoutData } from '@base/types/pagelayout';

// menu import
import { MENU_LEAD, MENU_SALES } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';
import { default as viewConfig } from '@lead/config/view-field';

import Header from './Header';
import Left from './Left';
import Right from './Right';
import Center from './Center';
import { EmptySplitView } from '@base/components/@hanbiro/SplitView';
import { useLead } from '@lead/hooks/useLead';
import { hiddenSchemas } from '@lead/services/graphql';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_LEAD;
  const menu = MENU_LEAD;
  const menuSourceId = params?.id as string;
  const ignoreFields: string[] = [];

  // layout
  const layoutKey: string = `${MENU_SALES}_${MENU_LEAD}`;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutKey, 'view');

  console.log('layoutView', layoutView);
  

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: [],
    hiddenSchemas
  });

  const { isLoading, data: data, refetch } = useLead(viewSchema, menuSourceId);
  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  //==================DEBUG=====================
  // console.log('Lead layoutData', layoutData);
  //==================END DEBUG=================
  const HeaderMemo = useMemo(() => {
    return (
      <Header
        menu={menu}
        isSplitMode={isSplitMode}
        // menuSource={menuSource}
        menuSourceId={menuSourceId}
        layoutData={layoutData}
      />
    );
  }, [menu, isSplitMode, layoutData]);

  const LeftMemo = useMemo(() => {
    return <Left layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData, ignoreFields]);

  const RightMemo = useMemo(() => {
    return <Right menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />;
  }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData]);

  const ViewMemo = useMemo(() => {
    return <ViewLayout componentHeader={HeaderMemo} componentLeft={LeftMemo} componentCenter={CenterMemo} componentRight={RightMemo} />;
  }, [layoutData]);

  return <Suspense fallback={<></>}>{menuSourceId == 'id' ? <EmptySplitView /> : ViewMemo}</Suspense>;
};
export default ViewPage;
