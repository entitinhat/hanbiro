import React, { useState, useMemo, useEffect, useCallback, ChangeEvent } from 'react';
//import SpanLang  from '@base/components/@hanbiro/SpanLang';
import { isArray, uniqueId, isObject } from 'lodash';
import { FormControl, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SpanLang from './SpanLang';

interface RadioGroupProps {
  value: any;
  options: any[];
  name?: string;
  fieldValue?: string;
  fieldLabel?: string;
  isVertical?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'xs' | 'md' | 'lg';
  onChange?: (params: any) => void;
}

const MuiRadioGroup = (props: RadioGroupProps) => {
  const {
    value = null, // {[fieldValue]: value, [fieldLabel]: label}
    options = [],
    name = uniqueId('radio-button-'),
    fieldValue = 'value',
    fieldLabel = 'label',
    isVertical = false,
    disabled = false,
    readOnly = false,
    size = 'sx',
    onChange = null
  } = props;

  const { t } = useTranslation();

  const [curValue, setCurValue] = useState(_getValue(value));

  function _getValue(_value: object) {
    if (_value) {
      if (isArray(_value)) return _value[0];
      return _value;
    }
    return options.length > 0 ? options[0][fieldValue]?.toString() : '';
  }

  useEffect(() => {
    const dataValue = Array.isArray(value) ? value[0] : value;
    if (isObject(dataValue)) {
      setCurValue(_getValue(dataValue));
      // return dataValue;
    } else {
      const findData = options.find((x: any) => x[fieldValue] === dataValue);
      setCurValue(_getValue(findData ? findData : null));
    }
  }, [value, options]);

  const onClick = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    if (newValue.toString() !== curValue?.[fieldValue]?.toString()) {
      onChange && onChange(options.find((item: any) => item[fieldValue] == newValue));
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'md':
        return 'size-medium';
      case 'lg':
        return 'size-large';
      default:
        return '';
    }
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup
        aria-label={name}
        name={name}
        row={!isVertical}
        value={curValue?.[fieldValue]?.toString()}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          return readOnly ? null : onClick(e);
        }}
      >
        {options.map((item: any, index: number) => (
          <FormControlLabel
            key={index}
            value={item[fieldValue]}
            control={<Radio className={getSizeClass()} />}
            label={<SpanLang keyLang={item[fieldLabel]} textOnly />}
            disabled={disabled || item?.disabled || readOnly}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MuiRadioGroup;
