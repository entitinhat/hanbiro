import React, { useEffect, useMemo } from 'react';
import { MENU_DESK, MENU_DESK_TICKET } from '@base/config/menus';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import { useTicketQuickView } from '@desk/ticket/hooks/useTicketQuickView';
import { Box, Grid, Link, Typography } from '@mui/material';
import * as keyNames from '@desk/ticket/config/keyNames';
import { usePageLayoutByMenu } from '@base/hooks/usePageLayout';
import { PageLayoutData } from '@base/types/pagelayout';
import { mergeLayoutData } from '@base/utils/helpers/pageLayoutUtils';
import { default as viewConfig } from '@desk/ticket/config/view-field';
import ViewFields from '@base/components/@hanbiro/ViewPage/ViewFields';
import RouteName from '@base/components/@hanbiro/RouteName';
export const TicketQuickView = (props: QuickViewComponentProps) => {
  const { id, setLoading } = props;

  const { data, isLoading } = useTicketQuickView(id);

  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading]);

  const url = `/m${MENU_DESK}/ticket/${id}`;
  const name = data?.subject ?? '';
  // =========================================================================Config===========================
  const menuSource = MENU_DESK_TICKET;
  const menu = 'ticket';
  const menuSourceId = id;
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
  const layoutData = useMemo(() => {
    return {
      ...mergeLayoutData(layoutView, data, viewConfig),
      menuSource: menuSource,
      menuSourceId: menuSourceId,
      data: data
    } as PageLayoutData;
  }, [layoutView, data]);

  const QuickViewFields = useMemo(() => {
    //Get Field Key like customer view page
    const basicFields = layoutData?.layout?.data?.[0]?.children ?? [];

    return (
      <ViewFields
        fields={basicFields}
        ignoreFields={[
          ...(ignoreFields ?? []),
          keyNames.KEY_TICKET_SUBJECT,
          keyNames.KEY_TICKET_STATUS,
          keyNames.KEY_TICKET_DURATION,
          keyNames.KEY_TICKET_REAL_DURATION,
          keyNames.KEY_TICKET_RESPONSE_DUE,
          keyNames.KEY_TICKET_RESOLUTION_DUE
        ]}
        menuSource={menuSource}
        menuSourceId={menuSourceId ?? ''}
        data={data}
        column={1}
        readOnly={true}
        divider
      />
    );
  }, [layoutData]);
  //===============================================================================================================

  //render
  return (
    <Grid container spacing={1.75} sx={{ p: 2, width: 400 }}>
      <Grid item xs={12}>
        <RouteName url={url} name={name} />
      </Grid>
      {QuickViewFields}
    </Grid>
  );
};

export default withTextAndPreviewModal(TicketQuickView, { title: 'Ticket Detail' });
