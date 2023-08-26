import React, { Suspense, useEffect, useMemo } from 'react';

//third-party
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';

//projects
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { PageLayoutData } from '@base/types/pagelayout';
import { MENU_QUOTE, MENU_SALES_QUOTE } from '@base/config/menus';
import ViewLayout from '@base/layouts/ViewLayout';

// menu import
import { default as viewConfig } from '@quote/config/view-field';
import { useQuote } from '@quote/hooks/useQuote';
import * as keyNames from '@quote/config/keyNames';

//local
import Header from './Header';
import Left from './Left';
import Center from './Center';
import Right from './Right';

interface ViewProps {
  isSplitMode: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();
  //console.log('router params', params);

  // defined
  const menuSource = MENU_QUOTE;
  const menuCategory = params?.category ?? MENU_QUOTE;
  const menuSourceId = params?.id as string;

  // layout
  const pageDataKey = MENU_SALES_QUOTE;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(pageDataKey, 'view');
  // The fields on below : it has to request single api.
  const dataIgnoreFields: string[] = [
    keyNames.KEY_NAME_QUOTE_REVISION_ID,
    keyNames.KEY_NAME_QUOTE_DELETED_BY
    //keyNames.KEY_NAME_QUOTE_UPDATED_AT,
    //keyNames.KEY_NAME_QUOTE_UPDATED_BY
  ];
  const ignoreFields: string[] = [...dataIgnoreFields];

  // build query
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields
  });
  //console.log('🚀 ~ file: index.tsx:75 ~ viewSchema:', viewSchema);

  const { data, isLoading, refetch } = useQuote(viewSchema, menuSourceId, { enabled: viewSchema !== '' });

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  //console.log('...CUSTOMER.Data...', data);
  //console.log('...Quote.layoutData...', layoutData);

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
    return <Left layoutData={layoutData} ignoreFields={ignoreFields} onRefetch={refetch} />;
  }, [layoutData, ignoreFields]);

  const RightMemo = useMemo(() => {
    return <Right menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} layoutData={layoutData} />;
  }, [layoutData, ignoreFields]);

  const CenterMemo = useMemo(() => {
    return (
      <Center menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={[]} />
    );
  }, [layoutData, ignoreFields]);

  const ViewMemo = useMemo(() => {
    return <ViewLayout componentHeader={HeaderMemo} componentLeft={LeftMemo} componentCenter={CenterMemo} componentRight={RightMemo} />;
  }, [layoutData]);

  return <Suspense fallback={<></>}>{ViewMemo}</Suspense>;
};

export default ViewPage;
