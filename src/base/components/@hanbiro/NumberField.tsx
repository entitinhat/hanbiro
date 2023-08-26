import React, { useEffect, useState } from 'react';
import { InputAdornment, SxProps, TextField } from '@mui/material';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { NumberSetting } from '@base/types/common';
import { useRecoilValue } from 'recoil';
import { numberSettingSelector } from '@base/store/selectors/app';
import { DIGIT_GROUPS } from '@settings/general/config/constants';

interface NumberFieldProps {
  thousandSeparator?: string | boolean;
  prefix?: string;
  value: number | string;
  onChange: (val: string | number) => void;
  size?: 'small' | 'medium' | undefined;
  sx?: SxProps;
  // All other props
  [x: string]: any;
}

const NumberField = (props: NumberFieldProps) => {
  const { prefix, value, onChange, size = 'medium', sx, ...others } = props;
  //state
  const [numberValue, setNumberValue] = useState<string | number>('');
  const [thousandsGroupStyle, setThousandsGroupStyle] = useState<'none' | 'thousand' | 'lakh' | 'wan'>('none');

  const numberFormat: NumberSetting = useRecoilValue(numberSettingSelector);
  const { decimalSymbol, noOfDecimal, digitGroupingSymbol, digitGroup, negativeNumberFormat } = numberFormat;
  //console.log('...NumberField.numberFormat...', numberFormat, thousandsGroupStyle);

  //init value
  useEffect(() => {
    //if (value) {
    if (value.toString() !== numberValue.toString()) {
      setNumberValue(value);
    }
    //}
    // else {
    //   setNumberValue('');
    // }
  }, [value]);

  useEffect(() => {
    const _thousandsGroupStyle =
      (DIGIT_GROUPS?.find((v: any) => v.value === digitGroup)?.alias as 'none' | 'thousand' | 'lakh' | 'wan') || 'none';
    setThousandsGroupStyle(_thousandsGroupStyle);
  }, [digitGroup]);

  const handleChange = (newVal: string | number) => {
    setNumberValue(newVal);
    //callback
    onChange && onChange(newVal);
  };

  return (
    <NumericFormat
      size={size}
      autoComplete="off"
      valueIsNumericString={true}
      thousandsGroupStyle={thousandsGroupStyle}
      decimalSeparator={decimalSymbol}
      decimalScale={noOfDecimal || 0}
      fixedDecimalScale={true}
      value={numberValue}
      onValueChange={(values, sourceInfo) => {
        handleChange(values.value);
      }}
      prefix={prefix}
      customInput={TextField}
      autoFocus
      sx={{
        ...sx,
        width: `100%`
      }}
      {...others}
      //thousandSeparator={thousandsGroupStyle != 'none' ? digitGroupingSymbol : false}
    />
    // <PatternFormat
    //   value={numberValue}
    //   format="### ###"
    // />
  );
};

export default NumberField;
