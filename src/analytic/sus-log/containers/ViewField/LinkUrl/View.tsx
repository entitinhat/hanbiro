import React from 'react';
import {CommonViewProps} from '@base/containers/ViewField/Common/interface';
import {Link, Typography} from '@mui/material';

interface ViewProps extends CommonViewProps {
  value: string;
}

const View = (props: ViewProps) => {
  const {value} = props;
  return (
    !!value ? <Link href={value} target="_blank" underline="none">
      {value}
    </Link> : <Typography>-</Typography>
  );
};

export default View;
