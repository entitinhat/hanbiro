import { useTranslation } from 'react-i18next';
import { Box, TextField } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { default as TextView } from '@base/containers/ViewField/Text/View';

interface ViewProps extends CommonViewProps {
  value?: string;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { t } = useTranslation();

  const { value } = props;

  return <Box>{value || value === '' ? <TextView value={value || ''} /> : <em>(none)</em>}</Box>;
};

export default View;
