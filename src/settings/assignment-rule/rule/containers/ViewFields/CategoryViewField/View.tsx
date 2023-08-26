import _ from 'lodash';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { ValueProps } from '@desk/ticket/containers/ProductCategory';

interface Props extends CommonViewProps {
  value: ValueProps | null;
  format?: 'datetime' | 'date' | 'text';
}

const View = (props: Props) => {
  const { value, format = 'text' } = props;
  const { t } = useTranslation();

  return <Typography sx={{ wordBreak: 'break-all' }}> {` ${value?.category?.name ?? '(none)'}: ${value?.product?.name ?? ''}`}</Typography>;
};

View.defaultProps = {
  value: ''
};

export default View;
