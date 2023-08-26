import React from 'react';
import { Typography } from '@mui/material';
import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: string;
}
const TitleView = (props: ViewProps) => {
  const { value } = props;

  return <Typography variant="h5">{value}</Typography>;
};

export default TitleView;
