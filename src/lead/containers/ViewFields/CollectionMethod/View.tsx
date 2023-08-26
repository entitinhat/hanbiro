import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { LABEL_VALUE_CUSTOM } from '@base/config/constant';
import { EmailType } from '@base/types/common';

import { LabelValue } from '@base/types/app';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

interface ViewProps extends CommonViewProps {
  value?: LabelValue | null;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return (
    <Box>
      <Box>
        <Typography variant="inherit" color="primary">
          {value?.label ?? '(none)'}
        </Typography>
      </Box>
    </Box>
  );
};

export default View;
