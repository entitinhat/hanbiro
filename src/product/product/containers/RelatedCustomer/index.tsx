import React from 'react';

import AssignCustomersContaner from '@customer/containers/AssignCustomersContainer';

interface Props {
  menuSource: string;
  menuSourceId: string;
}

const RelatedCustomer = (props: Props) => {
  const { menuSource, menuSourceId } = props;

  return <AssignCustomersContaner items={[]} readOnly />;
};

export default RelatedCustomer;
