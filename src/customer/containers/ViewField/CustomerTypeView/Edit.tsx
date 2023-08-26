import React from 'react';

import CustomerAutoComplete from '@customer/containers/CustomerAutoComplete';
import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import DataSourceSelect from '@base/containers/DataSourceSelect';

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
    <DataSourceSelect
      value={value}
      onChange={handleOnChange}
      sourceMenu={componentProps?.sourceMenu ?? ''}
      sourceKey={componentProps?.sourceKey ?? ''}
      sourceType={componentProps?.sourceType ?? 'setting'}
      {...componentProps}
    />
  );
};

export default Edit;
