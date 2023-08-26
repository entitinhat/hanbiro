import React from 'react';

import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import CommonViewField from '@base/containers/ViewField/Common';
import { UserOrCustomer } from '@activity/types/activity';

import Edit from './Edit';
import View from './View';

interface FromUserProps extends CommonViewFieldProps {
  value: UserOrCustomer[];
}

const ToUser = (props: FromUserProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default ToUser;
