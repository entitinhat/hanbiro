import React from 'react';

import { CommonEditProps } from '../Common/interface';
import AddressInput from '@base/components/@hanbiro/AddressInput';

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
    <AddressInput
      {...componentProps}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default Edit;
