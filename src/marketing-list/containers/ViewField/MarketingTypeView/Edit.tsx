import React, { useMemo } from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { MARKETING_TYPE_OPTIONS } from '@marketing-list/config/constants';
import { OptionValue } from '@base/types/common';
import SelectBox from '@base/components/@hanbiro/SelectBox';

interface EditProps extends CommonEditProps {
  value: string | OptionValue;
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

  const nVal = useMemo(() => {
    let parsedValue;
    if (typeof value === 'string') {
      parsedValue = MARKETING_TYPE_OPTIONS.find((v: OptionValue) => v.keyName === value);
    } else {
      parsedValue = value;
    }
    return parsedValue;
  }, [value]);

  return <SelectBox options={MARKETING_TYPE_OPTIONS} {...componentProps} value={nVal} onChange={handleOnChange} />;
};

export default Edit;
