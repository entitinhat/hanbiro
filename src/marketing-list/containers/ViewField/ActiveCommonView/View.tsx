import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { default as TextView } from '@base/containers/ViewField/Text/View';
import { Customer } from '@customer/types/interface';
import { OptionValue } from '@base/types/common';
import { MARKETING_TYPE_OPTIONS } from '@marketing-list/config/constants';
import { useMemo } from 'react';
import Switch from '@base/components/@hanbiro/Switch';

interface ViewProps extends CommonViewProps {
  value?: boolean;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  return <Switch {...componentProps} value={value} />;
};

export default View;
