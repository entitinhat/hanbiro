import React, { useEffect } from 'react';
import { MENU_ACTIVITY } from '@base/config/menus';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
// import { useTicketQuickView } from '@desk/ticket/hooks/useTicketQuickView';
import { Box, Grid, Link, Typography } from '@mui/material';
import { useActivity } from '@activity/hooks/useActivity';
import { ACITIVITY_QUICK_VIEW } from '@activity/services/graphql';
import { ACTIVITY_MENU_KEYS } from '@activity/config/constants';

export const ActivityQuickView = (props: QuickViewComponentProps) => {
  const { id, setLoading, type } = props;

  const { data, isLoading } = useActivity(ACITIVITY_QUICK_VIEW, id);

  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading]);

  const url = `/${MENU_ACTIVITY}/mywork/${ACTIVITY_MENU_KEYS[type]}_${id}`; //`/${MENU_DESK}/ticket/${id}`;

  //render
  return (
    <Box sx={{ position: 'relative', padding: '20px' }}>
      <Box
        sx={{
          scrollbarWidth: 'none',
          overflowY: 'auto !important',
          msOverflowStyle: 'none',
          maxHeight: 'calc(100vh - 210px)',
          overflowX: 'hidden'
        }}
      >
        <Grid container>
          <Grid item xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
            <Link href={url} sx={{ fontSize: '18px', fontWeight: 700 }}>
              {data?.subject || ''}
            </Link>
          </Grid>
        </Grid>
        <Typography dangerouslySetInnerHTML={{ __html: data?.content || '' }} />
      </Box>
    </Box>
  );
};

export default withTextAndPreviewModal(ActivityQuickView, { title: 'Related Activity Detail' });
