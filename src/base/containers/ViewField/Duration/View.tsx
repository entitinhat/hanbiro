import { Typography } from '@mui/material';

import { DurationValue } from '@base/types/common';
import { parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: DurationValue;
}

const View = (props: ViewProps) => {
  const { value } = props;

  return <Typography>{value ? parseDurationValueToString(value) : ''}</Typography>;
};

export default View;
