import React from 'react';

import { Box, useTheme } from '@mui/material';
import StatusBar from '@process/components/StatusBar';

interface TopProps {
  menuSource: string;
  menuSourceId: string;
  processId?: string;
}

const Top = (props: TopProps) => {
  const { menuSource, menuSourceId, processId } = props;
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        bgcolor: theme.palette.background.paper, 
        px: 2, 
        pt: 2, 
        width: '100%', 
        position: 'relative', zIndex: 0 // to display under moreAction on header Dropdown
        }}> 
      <StatusBar docId={menuSourceId} processId={processId} menu={menuSource} />
    </Box>
  );
};

export default Top;
