import React from 'react';
import DvrIcon from '@mui/icons-material/Dvr';
import {Box, Typography} from "@mui/material";

const EmptySplitView = () => {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
      outline: 'none'
    }}>
      <Box sx={{
        width: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}>
        <DvrIcon sx={{
          width: '120px',
          height: '100px',
          fill: '#e2e2e2'
        }}/>
        <Typography my={0} component="h5">Select an item to view</Typography>
        <Typography my={0} component="p">Nothing is Selected</Typography>
      </Box>
    </Box>
  );
};

export default EmptySplitView;
