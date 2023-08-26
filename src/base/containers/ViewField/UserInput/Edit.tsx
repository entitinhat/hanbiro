import React from 'react';

//project
import UserAutoComplete from '@sign-in/containers/UserAutoComplete';

//menu
import { CommonEditProps } from '../Common/interface';

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

  return <UserAutoComplete {...componentProps} value={value} onChange={handleOnChange} />;
};

export default Edit;
