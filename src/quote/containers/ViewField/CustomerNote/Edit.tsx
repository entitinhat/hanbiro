import React from 'react';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import CustomerNote from '@quote/containers/CustomerNote';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const handleOnChange = (newValue: any) => {
    onChange && onChange(newValue);
  };

  return <CustomerNote {...componentProps} value={value} onChange={handleOnChange} />;
};

export default Edit;
