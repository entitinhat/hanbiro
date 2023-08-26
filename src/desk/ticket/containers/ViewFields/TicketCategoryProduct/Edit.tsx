import React from 'react';
import ProductCategory, { ValueProps } from '@desk/ticket/containers/ProductCategory';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
interface EditProps extends CommonEditProps {
  value: ValueProps;
  onChange?: (value: ValueProps) => void;
  componentProps?: {
    [x: string]: any;
  };
}
const Edit: React.FC<EditProps> = (props: EditProps) => {
  const { value, componentProps, onChange } = props;

  return <ProductCategory {...componentProps} value={value} onChange={onChange} />;
};

export default Edit;
