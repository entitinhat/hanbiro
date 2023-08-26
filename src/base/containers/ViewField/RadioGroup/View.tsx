//third-party
import { useTranslation } from 'react-i18next';

//material
import { Box, Chip, Stack, Typography } from '@mui/material';

//local
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

  return <Box>{value ? <Typography>{t(value.label)}</Typography> : <em>(none)</em>}</Box>;
};

export default View;
