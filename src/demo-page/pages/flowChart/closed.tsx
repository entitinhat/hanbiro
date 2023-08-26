import { Stack } from '@mui/material';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { NodeProps } from 'reactflow';
import { makeEdge } from './edge';
import { makeEdit } from './node';

export const nodeClosed = (props: NodeProps) => {
  console.log('props', props);

  return (
    <>
      <Stack
        alignItems="center"
        sx={{
          border: 'none',
          backgroundColor: 'rgba(67, 165, 246, 0.15)',
          width: 136,
          height: 262,
          borderRadius: '0.5rem'
        }}
      >
      </Stack>
      {makeEdge(props.data)}
    </>
  );
};
