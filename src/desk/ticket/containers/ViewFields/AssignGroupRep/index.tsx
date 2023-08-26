import React from 'react';

import View from './View';
import Edit from './Edit';
import CommonViewField from '@base/containers/ViewField/Common';

const AssignGroupRepViewField: React.FC = (props: any) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default AssignGroupRepViewField;
