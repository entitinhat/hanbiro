import React, { ReactNode } from 'react';
import { Box, SxProps, useMediaQuery, useTheme } from '@mui/material';
import useDevice from '@base/hooks/useDevice';

interface ListBodyProp {
  isSplitMode?: boolean;
  split?: React.ReactNode;
  normal?: React.ReactNode;
  children?: ReactNode;
  sx?: SxProps;
}

const ListBody = (props: ListBodyProp) => {
  const { isSplitMode, split, normal, children, ...others } = props;

  // const theme = useTheme();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  const { isMobile } = useDevice();
  console.log('%cisMobile', 'color: blue', isMobile);

  return (
    <Box className="scroll-box" sx={{ width: '100%', height: isMobile ? 'calc(100vh - 180px)' : '100%' }} {...others}>
      {isSplitMode ? <>{split}</> : <>{normal}</>}
      {children}
    </Box>
  );
};

export default ListBody;
