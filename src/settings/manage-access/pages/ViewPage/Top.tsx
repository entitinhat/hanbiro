import React from 'react';

import { Box } from '@mui/material';

interface TopProps {}

const Top = (props: TopProps) => {
  return <Box sx={{ flexGrow: 1, display: 'flex', flex: 1, height: '50px' }}>{`View > Top`}</Box>;
};

export default Top;
