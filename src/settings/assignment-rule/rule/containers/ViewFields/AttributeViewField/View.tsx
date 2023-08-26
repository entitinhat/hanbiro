import _ from 'lodash';
import { useEffect, useState } from 'react';

import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers/generalUtils';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { AttributesOptions } from '@settings/assignment-rule/rule/config/constants';

interface Props extends CommonViewProps {
  value: {
    date: Date;
    opt: any;
  };
  format?: 'datetime' | 'date' | 'text';
}

const View = (props: Props) => {
  const { value, format = 'text' } = props;
  const { t } = useTranslation();
  const [curCreatedDate, setCurCreatedDate] = useState<Date>(new Date());
  const [opts, setOpts] = useState<string>('');
  useEffect(() => {
    if (value) {
      setCurCreatedDate(value.date);
      const optLabel = AttributesOptions[AttributesOptions.findIndex((item) => item.value === value?.opt?.key)].label;
      setOpts(`${optLabel} ${value?.opt?.days ? ': ' + value?.opt?.days + 'day(s)' : ''}`);
    }
  }, [value]);
  return (
    <Box>
      <Typography sx={{ wordBreak: 'break-all' }}>
        {`Created Date: ` + convertDateTimeServerToClient({ date: curCreatedDate.toString(), isTime: false, humanize: true })}
      </Typography>
      <Typography sx={{ wordBreak: 'break-all' }}> {opts}</Typography>
    </Box>
  );
};

View.defaultProps = {
  value: ''
};

export default View;
