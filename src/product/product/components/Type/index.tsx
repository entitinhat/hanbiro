import React from 'react';

import { FormControl, FormControlLabel, Radio, RadioGroup, SelectChangeEvent } from '@mui/material';

import { PRODUCT_TYPE_OPTIONS } from '@product/main/config/constants';
import SpanLang from '@base/components/@hanbiro/SpanLang';

interface Props {
  value: string;
  onChange?: (type: string) => void;
}

const Type = (props: Props) => {
  const { value, onChange } = props;

  const handleChange = (event: SelectChangeEvent) => {
    onChange && onChange(event.target.value as string);
  };

  return (
    <FormControl sx={{ pl: 1 }}>
      <RadioGroup row name="product-type" value={value ?? ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}>
        {PRODUCT_TYPE_OPTIONS?.map((item: any, index: number) => (
          <FormControlLabel key={index} value={item?.value} control={<Radio />} label={<SpanLang keyLang={item?.label} />} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Type;
