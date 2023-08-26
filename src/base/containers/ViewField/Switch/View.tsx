import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { FormControlLabel, Switch } from '@mui/material';
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
  return <FormControlLabel control={<Switch size="small" sx={{my: 0}} checked={value} />} label={t(componentProps?.label)} />;
};

export default View;
