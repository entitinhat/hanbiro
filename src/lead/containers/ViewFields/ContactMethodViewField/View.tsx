import _ from 'lodash';
import { useEffect, useState } from 'react';

import { convertDateTimeServerToClient, moneyFormat } from '@base/utils/helpers/generalUtils';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CommonViewProps } from '@base/containers/ViewField/Common/interface';
import { IdName } from '@base/types/common';

interface Props extends CommonViewProps {
  value: IdName;
}

const View = (props: Props) => {
  const { value, componentProps } = props;
  const { t } = useTranslation();
  const [valueNew, setValueNew] = useState<IdName>(value);

  useEffect(() => {
    if (value) {
      setValueNew(value);
    } else {
      setValueNew({ id: '', name: '' });
    }
  }, [value]);

  return <Typography sx={{ wordBreak: 'break-all' }}>{t(valueNew.name)}</Typography>;
};

View.defaultProps = {
  value: ''
};

export default View;
