import React, { lazy } from 'react';

import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import { OptionValue } from '@base/types/common';

const View = lazy(() => import('./View'));
const Edit = lazy(() => import('./Edit'));

interface SettingBoxProps extends CommonViewFieldProps {
  value: OptionValue;
}

const SettingBox = (props: SettingBoxProps) => {
  const { value } = props;
  console.log('value in props', props)
  return <CommonViewField {...props} value={value} componentView={View} componentEdit={Edit} />;
};

export default SettingBox;
