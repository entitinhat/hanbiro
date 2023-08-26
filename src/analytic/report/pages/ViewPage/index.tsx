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
import { MENU_ANALYTIC_REPORT } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

// import Header from './Header';
// import Left from './Left';
// import Right from './Right';
import Center from './Center';
import viewFieldsConfig from '@analytic/report/config/view-field';
import { useReportView } from '@analytic/report/hooks/useReportView';
import Header from './Header';
// import Top from './Top';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_ANALYTIC_REPORT;
  const menu = 'report';
  const menuSourceId = params?.id as string;

  // layout
  const layoutMenu: string = MENU_ANALYTIC_REPORT;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewFieldsConfig,
    ignore: []
  });

  const { isLoading, data, refetch } = useReportView(viewSchema, {id:menuSourceId});
  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewFieldsConfig),
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
        // menuSource={menuSource}
        // menuSourceId={menuSourceId}
        layoutData={layoutData}
      />
    );
  }, [menu, isSplitMode, layoutData]);

  // const LeftMemo = useMemo(() => {
  //   return <>Left</>
  //   //  <Left layoutData={layoutData} ignoreFields={ignoreFields} />;
  // }, [layoutData, ignoreFields]);

  // const RightMemo = useMemo(() => {
  //   return <>Right</>
  //   //  <Right menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />;
  // }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />;
  }, [layoutData]);

  const TopMemo = useMemo(() => {
    return <>Top</>
    //  <Top />;
  }, []);

  const ViewMemo = useMemo(() => {
    return (
      <ViewLayout
        componentHeader={HeaderMemo}
        // componentTop={TopMemo}
        // componentLeft={LeftMemo}
        componentCenter={CenterMemo}
        // componentRight={RightMemo}
      />
    );
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
