import { useEffect, useState } from 'react';
import _ from 'lodash';

import { CommonViewProps } from '../Common/interface';
import TextView from '@base/containers/ViewField/Text/View';
import { Country } from '@base/types/setting';

interface Props extends CommonViewProps {
  value: Country;
}

const View = (props: Props) => {
  const { value } = props;
  return <TextView value={value?.country || ''} />;
};

export default View;
