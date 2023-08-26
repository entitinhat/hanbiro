import React from 'react';
import TextView from '@base/containers/ViewField/Text/View';

//TODO: convert value to address string
const View: React.FC = (props: any) => {
  const { value } = props;
  return <TextView value={value?.name || ''} />;
};

export default View;
