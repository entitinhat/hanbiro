import React from 'react';

import CommonViewField from '@base/containers/ViewField/Common';
import { CommonViewFieldProps } from '@base/containers/ViewField/Common/interface';
import { AssignToName } from '@base/types/user';

import Edit from './Edit';
import View from './View';

interface UserProps extends CommonViewFieldProps {
  value: AssignToName[];
}

const User = (props: UserProps) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default User;
