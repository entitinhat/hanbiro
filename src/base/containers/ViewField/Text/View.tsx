import _ from 'lodash';
import { useEffect, useState } from 'react';

import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers/generalUtils';
import { Typography } from '@mui/material';
import { CommonViewProps } from '../Common/interface';
import { useTranslation } from 'react-i18next';

interface Props extends CommonViewProps {
  value: number | string | null;
  format?: 'datetime' | 'date' | 'text';
}

const View = (props: Props) => {
  const { value, format = 'text' } = props;
  const { t } = useTranslation();

  // if (_.isEmpty(value) || (typeof value != 'number' && typeof value != 'string')) {
  //   return null;
  // }
  const [valueNew, setValueNew] = useState<any>(value);

  useEffect(() => {
    setValueNew(
      typeof value === 'string' || typeof value === 'number'
        ? format == 'text'
          ? t(value as string)
          : (convertDateTimeServerToClient({
              date: value as string,
              isTime: format == 'datetime' ? true : false,
              humanize: true
            }) as string)
        : moneyFormat(value || 0)
    );
  }, [value]);

  return <Typography sx={{ wordBreak: 'break-all' }}>{valueNew}</Typography>;
};

View.defaultProps = {
  value: ''
};

export default View;
