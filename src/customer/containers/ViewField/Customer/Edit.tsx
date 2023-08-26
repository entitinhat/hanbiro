import React from 'react';

import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';

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

  return (
    <CustomerAutoComplete
      {...componentProps}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default Edit;
