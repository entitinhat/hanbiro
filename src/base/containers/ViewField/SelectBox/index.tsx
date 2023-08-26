import React, { lazy } from 'react';
import { OptionValue } from '@base/types/common';

import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';

const View = lazy(() => import('./View'));
const Edit = lazy(() => import('./Edit'));

interface SelectBoxProps extends CommonViewFieldProps {
  value: OptionValue;
  options: OptionValue[];
}

const SelectBox = (props: SelectBoxProps) => {
  const { value } = props;
  return <CommonViewField {...props} value={value} componentView={View} componentEdit={Edit} />;
};

export default SelectBox;
