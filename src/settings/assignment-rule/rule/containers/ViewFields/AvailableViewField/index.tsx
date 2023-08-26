import React from 'react';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';
import View from './View';
import Edit from './Edit';
import { EAREntryAssignCheckAvailable } from '@settings/assignment-rule/rule/types/rule';

interface FromUserProps extends CommonViewFieldProps {
  value: EAREntryAssignCheckAvailable;
}

const AvailableViewField = (props: FromUserProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default AvailableViewField;
