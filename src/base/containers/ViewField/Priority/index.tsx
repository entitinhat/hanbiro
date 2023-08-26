import React, { lazy } from 'react';

import { OptionValue } from '@base/types/common';
import { Selection } from '@settings/general/types/interface';
import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';

const View = lazy(() => import('./View'));
const Edit = lazy(() => import('./Edit'));

interface PrioirtyProps extends CommonViewFieldProps {
  value: Selection;
}

const Priority = (props: PrioirtyProps) => {
  const { value } = props;
  return <CommonViewField {...props} value={value} componentView={View} componentEdit={Edit} />;
};

export default Priority;
