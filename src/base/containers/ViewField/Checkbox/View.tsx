import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Checkbox } from '@mui/material';
import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: boolean;
  componentProps?: {
    [x: string]: any;
  };
}

const View = (props: ViewProps) => {
  const { value, componentProps } = props;
  const { t } = useTranslation()
  return <FormControlLabel control={<Checkbox size="small" sx={{ my: 0, ml: 1, p: 0 }} checked={value} />} label={t(componentProps?.label)} />;
};

export default View;
