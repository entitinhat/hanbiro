import React from 'react';

import { Container, Box } from '@mui/material';
import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: string;
}

const View = (props: any) => {
  const { value } = props;

  return <Box sx={{ wordBreak: 'break-all' }}>{value}</Box>;
};

export default View;
