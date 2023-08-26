import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { default as TextView } from '@base/containers/ViewField/Text/View';
import { Customer } from '@customer/types/interface';
import { OptionValue } from '@base/types/common';
import { MARKETING_TYPE_OPTIONS } from '@marketing-list/config/constants';
import { useMemo } from 'react';

interface ViewProps extends CommonViewProps {
  value?: string | OptionValue;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value, componentProps } = props;

  const nVal = useMemo(() => {
    let parsedValue;
    if (typeof value === 'string') {
      parsedValue = MARKETING_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === value);
    } else {
      parsedValue = value;
    }
    return parsedValue;
  }, [value]);

  return (
    <Box>
      <Typography>{nVal?.languageKey || <em>(none)</em>}</Typography>
    </Box>
  );
};

export default View;
