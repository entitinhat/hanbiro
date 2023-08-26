import React, { lazy, useEffect, useState } from 'react';
import CommonViewField from '@base/containers/ViewField/Common';

const View = lazy(() => import('./View'));
const Edit = lazy(() => import('./Edit'));

const InputColorViewField = (props: any) => {
  const [value, setValue] = useState(props?.value);

  //init data
  useEffect(() => {
    if (value !== props?.value) {
      setValue(props?.value);
    }
  }, [props?.value]);

  return <CommonViewField {...props} componentView={View} componentEdit={Edit} value={value} />;
};

export default InputColorViewField;
