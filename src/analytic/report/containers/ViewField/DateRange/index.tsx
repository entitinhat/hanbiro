import React, { lazy } from 'react';
import { OptionValue } from '@base/types/common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
const View = lazy(() => import('./View'));
const Edit = lazy(() => import('@analytic/report/containers/DateRangeSelectBox'));
import CommonViewField from '@base/containers/ViewField/Common';

interface DateRangeProps extends CommonViewFieldProps {
  value: OptionValue;
  options: OptionValue[];
}

const DateRange = (props: DateRangeProps) => {
  const { value } = props;
  return <CommonViewField {...props} value={value} componentView={View} componentEdit={Edit} />;
};

export default DateRange;
