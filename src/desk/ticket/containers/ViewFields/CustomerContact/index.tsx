import React from 'react';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
import Edit from './Edit';

const CustomerContactViewField: React.FC = (props: any) => {
  return <CommonViewField {...props} clickIconToEdit={true} componentView={View} componentEdit={Edit} />;
};

export default CustomerContactViewField;
