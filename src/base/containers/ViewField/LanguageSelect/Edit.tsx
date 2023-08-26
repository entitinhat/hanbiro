import React from 'react';

import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import LangSelect from '@base/components/@hanbiro/LangSelect';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  //get value for edit
  const handleValueChange = (val: any) => {
    if (val) {
      onChange && onChange(val.key);
    }
  };

  return <LangSelect {...componentProps} value={value} onChange={handleValueChange} />;
};

export default Edit;
