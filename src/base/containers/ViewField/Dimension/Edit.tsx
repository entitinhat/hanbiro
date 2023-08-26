import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import Dimension from '@base/components/@hanbiro/Dimension';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (params?: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <Dimension value={value} onChange={onChange} />;
};

export default Edit;
