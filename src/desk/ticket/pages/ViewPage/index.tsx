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
import { MENU_DESK_TICKET } from '@base/config/menus';
import * as keyNames from '@desk/ticket/config/keyNames';
import ViewLayout from '@base/layouts/ViewLayout';
import { default as viewConfig } from '@desk/ticket/config/view-field';

import Header from './Header';
import Left from './Left';
import Right from './Right';
import Center from './Center';
import Top from './Top';
import { useTicket } from '@desk/ticket/hooks/useTicket';
import { DUMMY_VIEW_DATA } from './dummyTicket';

interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_DESK_TICKET;
  const menu = 'ticket';
  const menuSourceId = params?.id as string;
  const ignoreFields = [
    keyNames.KEY_TICKET_CONTENT,
    keyNames.KEY_TICKET_CONTACT,
    keyNames.KEY_TICKET_PRODUCT,
    keyNames.KEY_TICKET_CREATED_AT,
    keyNames.KEY_TICKET_UPDATED_AT,
    keyNames.KEY_TICKET_CREATED_BY,
    keyNames.KEY_TICKET_UPDATED_BY,
    keyNames.KEY_TICKET_CLOSED_AT
  ];

  // layout
  const layoutMenu: string = MENU_DESK_TICKET;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: []
  });

  const { isLoading, data, refetch } = useTicket(viewSchema, menuSourceId);
  // const data = DUMMY_VIEW_DATA;

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);
  console.log('data index: ', data)
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

  const LeftMemo = useMemo(() => {
    return <Left layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData, ignoreFields]);

  const RightMemo = useMemo(() => {
    return <Right menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} />;
  }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return <Center menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData]);

  const TopMemo = useMemo(() => {
    return <Top menuSource="MENU_DESK" menuSourceId={menuSourceId} processId={data?.process?.id} />;
  }, [data]);

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

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
