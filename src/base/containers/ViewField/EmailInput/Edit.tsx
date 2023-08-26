import React from 'react';

import { CommonEditProps } from '../Common/interface';
import EmailInput from '@base/components/@hanbiro/EmailInput';

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
    <EmailInput
      {...componentProps}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default Edit;
