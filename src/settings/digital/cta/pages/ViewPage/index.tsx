import _ from 'lodash';
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
import { MENU_SETTING, MENU_SETTING_CTA } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';
import { default as viewConfig } from '@settings/digital/cta/config/view-field';
import * as keyNames from '@settings/digital/cta/config/keyNames';

import PageHeader from './PageHeader';
import PageLeft from './PageLeft';
import { useCta } from '../../hooks/useCta';
import PageCenter from './PageCenter';
import { headerHeight } from '@base/config/config';

interface ViewProps {
  isSplitMode?: boolean;
}

const CtaViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();
  const id = params?.id as string;

  // defined
  const menuSource = MENU_SETTING_CTA;
  const menuCategory = 'cta';
  const menuSourceId = id;

  // layout
  const pageDataKey: string = MENU_SETTING_CTA;
  const { data: layoutView } = usePageLayoutByMenu(pageDataKey, 'view');

  let ignoreFields: string[] = [];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: ignoreFields
  });

  const { isLoading, data, refetch } = useCta(viewSchema, menuSourceId);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId
      // data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  const HeaderMemo = useMemo(() => {
    return (
      <PageHeader
        menuCategory={menuCategory}
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
    return <PageLeft layoutData={layoutData} />;
  }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return (
      <PageCenter menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={_.cloneDeep(ignoreFields)} />
    );
  }, [layoutData, ignoreFields]);

  const ViewMemo = useMemo(() => {
    return (
      <ViewLayout
        componentHeader={HeaderMemo}
        componentLeft={LeftMemo}
        componentCenter={CenterMemo}
        containerSx={{ height: `calc(100vh - ${headerHeight * 2 + 40}px)` }}
      />
    );
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default CtaViewPage;
