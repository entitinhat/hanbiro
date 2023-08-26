import { Typography } from '@mui/material';

import { DurationValue } from '@base/types/common';
import { convertSecondsToDayHourMin, parseDurationValueToString } from '@base/utils/helpers/dateUtils';
import { CommonViewProps } from '../Common/interface';

interface ViewProps extends CommonViewProps {
  value: number;
}

const View = (props: ViewProps) => {
  const { value } = props;
  // console.log('🚀 ~ file: View.tsx:13 ~ View ~ value:', value);

  return <Typography>{value ? convertSecondsToDayHourMin(value / 1000) : ''}</Typography>;
  // return <Typography>{value}</Typography>;
};

export default View;
