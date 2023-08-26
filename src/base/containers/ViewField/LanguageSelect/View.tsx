import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { useRecoilValue } from 'recoil';
import { LANGUAGES } from '@base/config/constant';

interface ViewProps extends CommonViewProps {
  value?: string;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value } = props; //value = language code
  const langLabel = LANGUAGES.find((_ele: any) => _ele.value === value)?.label;
  return (
    <Box>
      <Typography>{langLabel || value}</Typography>
    </Box>
  );
};

export default View;
