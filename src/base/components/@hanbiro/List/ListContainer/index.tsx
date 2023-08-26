import React, { ReactNode } from 'react';
import { Stack } from '@mui/material';
import RetryErrorBoundary from '../../Errors/RetryErrorBoundary';

interface ListContainerProps {
  children?: ReactNode;
}

const ListContainer = ({ children }: ListContainerProps) => {
  return (
    <RetryErrorBoundary>
      <Stack
        sx={{
          height: '100%',
          overflow: 'hidden',
          bgcolor: (t) => t.palette.background.paper
        }}
      >
        {children}
      </Stack>
    </RetryErrorBoundary>
  );
};

export default ListContainer;
