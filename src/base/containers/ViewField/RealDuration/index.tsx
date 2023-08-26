import React from 'react';
import { DurationValue } from '@base/types/common';
import { CommonViewFieldProps } from '../Common/interface';
import CommonViewField from '../Common';

import View from './View';
import Edit from './Edit';

interface DurationProps extends CommonViewFieldProps {
  value: DurationValue;
}

const RealDuration = (props: DurationProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default RealDuration;
