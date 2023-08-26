import React, { useState, useEffect } from 'react';

import CommonViewField from '../Common';
import { CommonViewFieldProps } from '../Common/interface';

import View from './View';
import Edit from './Edit';
interface TextAreaProps extends CommonViewFieldProps {
  value: string;
}

const TextAreaViewField = (props: TextAreaProps) => {
  const [value, setValue] = useState(props?.value ?? '');

  // init data
  useEffect(() => {
    if (value !== props?.value) {
      setValue(props?.value);
    }
  }, [props?.value]);

  return <CommonViewField {...props} componentView={View} componentEdit={Edit} value={value} />;
};

export default TextAreaViewField;
