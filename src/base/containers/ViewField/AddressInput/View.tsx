import React from 'react';
import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
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

  const { value } = props;

  return (
    <Stack spacing={1}>
      {Array.isArray(value) ? (
        value.length === 0 ? (
          <Typography variant="inherit">
            <em>(none)</em>
          </Typography>
        ) : (
          value.map((_ele: any, index: number) => (
            <Stack key={index}>
              <Typography variant="inherit">{formatAddress(_ele)}</Typography>
            </Stack>
          ))
        )
      ) : (
        <Typography variant="inherit">{value ? formatAddress(value) : <em>(none)</em>}</Typography>
      )}
    </Stack>
  );
};

export default View;
