import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import WarrantyPeriod from '@base/components/@hanbiro/WarrantyPeriod';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (params?: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <WarrantyPeriod value={value} onChange={onChange} />;
};

export default Edit;
