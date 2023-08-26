import React, {Suspense, useMemo} from 'react';

//third-party
import {useParams} from 'react-router-dom';

//projects
import {usePageLayoutByMenu} from '@base/hooks/forms/usePageLayout';
import {mergeLayoutData} from '@base/utils/helpers/pageLayoutUtils';
import {buildViewSchema} from '@base/utils/helpers/schema';
import {PageLayoutData} from '@base/types/pagelayout';
import {MENU_ANALYTIC, MENU_ANALYTIC_SUS_LOG} from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

// menu import
import {default as viewConfig} from '@analytic/sus-log/config/view-field';
import * as baseKeyNames from "@base/config/keyNames";
import * as keyNames from '@analytic/sus-log/config/keyNames';
import useSusLogView from "@analytic/sus-log/hooks/useSusLogView";

//local
import Header from './Header';
import Left from './Left';
import Center from './Center';

interface ViewProps {
  isSplitMode: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;
  const params = useParams();

  // defined
  const menuSource = MENU_ANALYTIC;
  const menuCategory = MENU_ANALYTIC_SUS_LOG;
  const menuSourceId = params?.id as string;

  // layout
  const { data: layoutView } = usePageLayoutByMenu(MENU_ANALYTIC_SUS_LOG, 'view');

  // The fields on below : it has to request single api.
  const dataIgnoreFields: string[] = [];

  const ignoreFields: string[] = [
    ...dataIgnoreFields,
    keyNames.SUS_LOG_SURL,
    keyNames.SUS_LOG_CAMPAIGN,
    keyNames.SUS_LOG_CUSTOMER,
    keyNames.SUS_LOG_ACTIVITY,
    keyNames.SUS_LOG_PROCESS,
    keyNames.SUS_LOG_DOCUMENT,
    keyNames.SUS_LOG_EMAIL,
    keyNames.SUS_LOG_MOBILE,
    baseKeyNames.KEY_NAME_CREATED_AT,
    baseKeyNames.KEY_NAME_CREATED_BY,
    baseKeyNames.KEY_NAME_UPDATED_AT,
    baseKeyNames.KEY_NAME_UPDATED_BY
  ];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields
  });

  const { data, refetch } = useSusLogView(viewSchema, {id: menuSourceId});

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
        isSplitMode={isSplitMode}
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

  const CenterMemo = useMemo(() => {
    return (
      <Center menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={[]} />
    );
  }, [layoutData, ignoreFields]);

  const ViewMemo = useMemo(() => {
    return <ViewLayout componentHeader={HeaderMemo} componentLeft={LeftMemo} componentCenter={CenterMemo} />;
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};

export default ViewPage;
