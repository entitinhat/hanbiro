import React, { Suspense, useEffect, useMemo } from 'react';

//third-party
import { useNavigate, useParams } from 'react-router-dom';
import _ from 'lodash';

//projects
import { usePageLayoutByMenu } from '@base/hooks/forms/usePageLayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { buildViewSchema } from '@base/utils/helpers/schema';
import { PageLayoutData } from '@base/types/pagelayout';
import ViewLayout from '@base/layouts/ViewLayout';

// menu import
import { default as viewConfig } from '@settings/digital/ticket-form/config/view-field';
// menu import
import { MENU_SETTING, MENU_SETTING_TICKET_FORM } from '@base/config/menus';

//local
import Header from './Header';
import Left from './Left';
import Center from './Center';
import { useTicketForm } from '../../hooks/useTicketForm';
import * as keyNames from '@settings/digital/ticket-form/config/keyNames';
import { headerHeight } from '@base/config/config';
interface ViewProps {
  isSplitMode?: boolean;
}

const ViewPage = (props: ViewProps) => {
  const { isSplitMode } = props;

  // params
  const params = useParams();
  //console.log('router params', params);
  //-------------------------------Setting---------------------------------------------------------------------
  const menuSource = MENU_SETTING_TICKET_FORM;
  // const group = groupTemplate.group;
  const menuSourceId = params?.id as string;

  // defined
  const menuCategory = 'form';

  // layout
  const pageDataKey: string = MENU_SETTING_TICKET_FORM;
  const { data: layoutView, isLoading: layoutLoading } = usePageLayoutByMenu(pageDataKey, 'view');
  // The fields on below : it has to request single api.
  const dataIgnoreFields: string[] = ['views', 'submissions', 'submissionRate'];
  const ignoreFields = [...dataIgnoreFields];

  // build query
  const hiddenSchemas = [
    keyNames.KEY_TICKET_FORM_SUBMISSION_BEHAVIOR,
    `
    linkToResource {
      id,
      name
    }
    `,
    // keyNames.KEY_TICKET_FORM_LINK_TO_RESOURCE,
    keyNames.KEY_TICKET_FORM_CREATE_TICKET,
    keyNames.KEY_TICKET_FORM_TICKET_NAME,
    keyNames.KEY_TICKET_FORM_DISPLAY_MESSAGE,
    // keyNames.KEY_TICKET_FORM_IS_ALL_PRODUCT,
    keyNames.KEY_TICKET_FORM_LINK_TO_PAGE,
    keyNames.KEY_TICKET_FORM_LINK_TO_TYPE,
    // keyNames.KEY_TICKET_FORM_STAGE,
    keyNames.KEY_TICKET_FORM_TEMPLATE
  ];
  const viewSchema = buildViewSchema({
    sections: layoutView?.data,
    configFields: viewConfig,
    ignore: dataIgnoreFields,
    hiddenSchemas
  });

  const { data, isLoading, refetch } = useTicketForm(viewSchema, menuSourceId);

  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig, dataIgnoreFields),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  //-------------------------------------------Render-----------------------------------------------------------

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
  }, [layoutData]);

  const CenterMemo = useMemo(() => {
    return (
      <Center menuSource={menuSource} menuCategory={menuCategory} menuSourceId={menuSourceId} layoutData={layoutData} ignoreFields={[]} />
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

  return <>{ViewMemo}</>;
};

export default ViewPage;
