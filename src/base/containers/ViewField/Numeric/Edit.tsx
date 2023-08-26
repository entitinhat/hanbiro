import React from 'react';

import { CommonEditProps } from '../Common/interface';
import NumberField from '@base/components/@hanbiro/NumberField';

interface EditProps extends CommonEditProps {
  value: string | number;
  onChange: (nValue: string | number) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const prefix = componentProps?.prefix || '';
  const thousandSeparator = ',';

  const handleOnChange = (newValue: string | number) => {
    onChange && onChange(newValue);
  };
  console.log('...Numeric...', value, componentProps);
  return (
    <NumberField
      {...componentProps}
      // prefix={prefix}
      // thousandSeparator={thousandSeparator}
      value={value}
      onChange={handleOnChange}
    />
  );
};

export default Edit;
