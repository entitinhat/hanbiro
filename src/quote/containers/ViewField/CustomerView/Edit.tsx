import React from 'react';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';

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
    console.log('🚀 ~ file: Edit.tsx:18 ~ newValue:', newValue);
    onChange && onChange(newValue);
  };

  return <CustomerAutoComplete {...componentProps} value={value} onChange={handleOnChange} />;
};

export default Edit;
