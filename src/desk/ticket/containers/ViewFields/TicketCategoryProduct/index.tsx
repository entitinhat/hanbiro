import React from 'react';
import CommonViewField from '@base/containers/ViewField/Common';

import View from './View';
import Edit from './Edit';

const TicketCategoryProductViewField: React.FC = (props: any) => {
  return <CommonViewField {...props} componentView={View} componentEdit={Edit} />;
};

export default TicketCategoryProductViewField;
