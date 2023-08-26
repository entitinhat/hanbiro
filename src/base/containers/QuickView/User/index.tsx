import React, { useEffect } from 'react';
import withTextAndPreviewModal, { QuickViewComponentProps } from '@base/hooks/hocs/withTextAndPreviewModal';
import { Box, Grid, Link, Typography } from '@mui/material';
import { useUserQuickView } from '@sign-in/hooks/userUserQuickView';

export const UserQuickView = (props: QuickViewComponentProps) => {
  const { id, setLoading } = props;

  const { data, isLoading } = useUserQuickView(id);

  useEffect(() => {
    setLoading && setLoading(isLoading);
  }, [isLoading]);

  const url = `/user/${id}`;

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
              {data?.name || ''}
            </Link>
          </Grid>
        </Grid>
        {/* <Typography dangerouslySetInnerHTML={{ __html: data?.content || '' }} /> */}
      </Box>
    </Box>
  );
};

export default withTextAndPreviewModal(UserQuickView, { title: 'User Detail' });
