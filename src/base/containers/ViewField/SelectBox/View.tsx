import { OptionValue } from '@base/types/common';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: OptionValue;
}

const View = (props: ViewProps) => {
  const { value } = props;
  const { t } = useTranslation();

  //console.log('selected view', value);

  return <Box>{value?.languageKey ? <Typography>{t(value.languageKey)}</Typography> : ''}</Box>;
};

export default View;
