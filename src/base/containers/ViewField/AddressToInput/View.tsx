import React from 'react';
import { useTranslation } from 'react-i18next';
import { InputLabel, Stack, Typography } from '@mui/material';
import { formatAddress } from '@base/utils/helpers/generalUtils';

import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return (
    <Stack direction={'row'} spacing={1} alignItems="center">
      <Typography variant="inherit">{value ? formatAddress(value) : ''}</Typography>
    </Stack>
  );
};

export default View;
