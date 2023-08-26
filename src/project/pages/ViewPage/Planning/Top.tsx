import React from 'react';

import { Box, useTheme } from '@mui/material';
import ViewTop from '@project/containers/ViewTop/Planning';

interface TopProps {}

const Top = (props: TopProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: theme.palette.background.paper, px: 2, pt: 2, width: '100%' }}>
      <ViewTop />
    </Box>
  );
};

export default Top;
