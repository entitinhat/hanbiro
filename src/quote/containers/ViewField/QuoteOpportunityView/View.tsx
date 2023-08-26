import { useTranslation } from 'react-i18next';
import { Box, Stack } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import SelectBox from '@base/components/@hanbiro/SelectBox';
import * as keyNames from '@quote/config/keyNames';
import { default as TextView } from '@base/containers/ViewField/Text/View';
import { Typography } from '@mui/material';

interface ViewProps extends CommonViewProps {
  value?: any;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value } = props;

  return <>{value ? <Typography>{value?.code}</Typography> : ''}</>;
};

export default View;
