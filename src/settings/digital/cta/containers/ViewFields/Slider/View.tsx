import _ from 'lodash';
import { useEffect, useState } from 'react';

import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers/generalUtils';
import { Typography } from '@mui/material';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';

interface Props extends CommonViewProps {
  value: number | string | null;
}

const View = (props: Props) => {
  const { value } = props;

  return <Typography sx={{ wordBreak: 'break-all' }}>{value}</Typography>;
};

View.defaultProps = {
  value: ''
};

export default View;
