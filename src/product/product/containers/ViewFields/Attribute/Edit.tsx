import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import ProductAttribute from '@product/product/containers/ProductAttribute';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (params?: any) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  return <ProductAttribute value={value} onChange={onChange} />;
};

export default Edit;
