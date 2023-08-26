import React from 'react';

import { CommonEditProps } from '../Common/interface';
import NumberField from '@base/components/@hanbiro/NumberField';
import { useRecoilValue } from 'recoil';
import { defaultCurrencySelector } from '@base/store/selectors/app';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  //get default currency and set prefix
  const defaultCurrency = useRecoilValue(defaultCurrencySelector);

  const handleOnChange = (newValue: any) => {
    onChange && onChange(newValue);
  };

  return (
    <NumberField {...componentProps} prefix={defaultCurrency?.code || '$'} thousandSeparator="," value={value} onChange={handleOnChange} />
  );
};

export default Edit;
