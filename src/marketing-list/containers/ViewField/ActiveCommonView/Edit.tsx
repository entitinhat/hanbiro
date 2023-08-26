import React, { useMemo } from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import Switch from '@base/components/@hanbiro/Switch';

interface EditProps extends CommonEditProps {
  value: boolean;
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

  return <Switch {...componentProps} value={value} onChange={handleOnChange} />;
};

export default Edit;
