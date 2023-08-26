import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

interface ViewProps {
  value: any;
}

const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { value = {} } = props;
  const name = value?.name ?? value?.fullName ?? '-No Name-';
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        mr: 1,
        px: '10px',
        py: '5px'
      }}
    >
      <Box>
        <HanAvatar name={name} size="sm" />
      </Box>
      <Typography ml={1}>{name}</Typography>
    </Box>
  );
};

export default View;
