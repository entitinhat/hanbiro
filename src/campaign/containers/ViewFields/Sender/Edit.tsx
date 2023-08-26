import React from 'react';

//project
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';

//menu
import Sender from '@campaign/components/Sender';

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

  return <Sender {...componentProps} value={value} onChange={handleOnChange} />;
};

export default Edit;