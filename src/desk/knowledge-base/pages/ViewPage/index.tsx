import { Suspense, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

// hooks
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';

// units
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';

// types
import { PageLayoutData } from '@base/types/pagelayout';

// menu import
import { MENU_DESK_KNOWLEDGE } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';
import * as keyNames from '@desk/knowledge-base/config/keyNames';
import { default as viewConfig } from '@desk/knowledge-base/config/view-field';

import Header from './Header';
import Left from './Left';
import Center from './Center';
import { useKnowledgeBase } from '@desk/knowledge-base/hooks/useKnowledgeBase';
import Top from './Top';
import { KnowledgeBase } from '@desk/knowledge-base/types/knowledge';

interface ViewProps {
  isSplitMode?: boolean;
  isViewMode?: boolean;
  getData?: (val: KnowledgeBase) => void;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode, getData, isViewMode = true } = props;

  // params
  const params = useParams();

  // defined
  const menuSource = MENU_DESK_KNOWLEDGE;
  const menu = 'knowledge';
  const menuSourceId = params?.id as string;
  const ignoreFields: string[] = [
    keyNames.KEY_KNOWLEDGE_BASE_SUBJECT,
    keyNames.KEY_KNOWLEDGE_BASE_CONTENT,
    keyNames.KEY_KNOWLEDGE_BASE_HELPED,
    keyNames.KEY_KNOWLEDGE_BASE_NOTHELPED,
    keyNames.KEY_KNOWLEDGE_BASE_INSERTED,
    keyNames.KEY_KNOWLEDGE_BASE_VIEWED
  ];

  // layout
  const layoutMenu: string = MENU_DESK_KNOWLEDGE;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(layoutMenu, 'view');

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: [],
    hiddenSchemas: ['isPublish']
  });
  //=========== KBreload
  const reloadKB = () => {
    refetch && refetch();
  };

  //=========
  const { isLoading, data, refetch } = useKnowledgeBase(viewSchema, menuSourceId);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);
  useEffect(() => {
    getData && getData(layoutData?.data);
  }, [layoutData?.data]);
  console.log('view-index', layoutData, layoutView);
  const HeaderMemo = useMemo(() => {
    return (
      <Header
        menu={menu}
        isSplitMode={isSplitMode}
        menuSource={menuSource}
        menuSourceId={menuSourceId}
        layoutData={layoutData}
        onRefresh={reloadKB}
        isViewMode={isViewMode}
      />
    );
  }, [menu, isSplitMode, layoutData]);

  const LeftMemo = useMemo(() => {
    return <Left layoutData={layoutData} ignoreFields={ignoreFields} />;
  }, [layoutData]);

  const CenterMemo = useMemo(() => {
    return (
      <Center menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={ignoreFields} reloadKB={reloadKB} />
    );
  }, [layoutData]);
  const TopMemo = useMemo(() => {
    return <Top menuSource={menuSource} menuSourceId={menuSourceId} layoutData={layoutData} onRefresh={reloadKB} />;
  }, [layoutData]);

  const ViewMemo = useMemo(() => {
    return (
      <ViewLayout
        componentHeader={HeaderMemo}
        componentLeft={LeftMemo}
        componentCenter={CenterMemo}
        componentTop={TopMemo}
        disableCollapseLeft
        extraHeight={163}
      />
    );
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};
export default ViewPage;
