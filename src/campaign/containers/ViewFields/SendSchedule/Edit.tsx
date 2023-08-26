import React from 'react';

//project
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';

//menu
import SendSchedule from '@campaign/components/SendSchedule';

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

  return <SendSchedule {...componentProps} value={value} onChange={handleOnChange} />;
};

export default Edit;
