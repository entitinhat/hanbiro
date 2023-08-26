import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { Box, Switch, Typography } from '@mui/material';
import { TEMPLATE_STAGE_ACTIVE } from '@settings/template/config/constants';
import _ from 'lodash';

interface ViewProps extends CommonViewProps {
  value: string;
}

const View = (props: ViewProps) => {
  const { value } = props;
  const checked = value === TEMPLATE_STAGE_ACTIVE
  return <Switch checked={checked} size="small" readOnly disabled />

};

export default View;
