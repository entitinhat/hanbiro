import React from 'react';

import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import SpanLang from '@base/components/@hanbiro/SpanLang';

interface Props {
  value: boolean;
  onChange?: (nVal: boolean) => void;
}

const CanBeSold = (props: Props) => {
  const { value, onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.checked);
  };

  return (
    <FormGroup onChange={handleChange}>
      <FormControlLabel
        sx={{ justifyContent: 'flex-end', ml: 0 }}
        control={<Checkbox checked={value} />}
        label={<SpanLang keyLang={'product_product_field_basic_canbesold'} />}
        labelPlacement="start"
      />
    </FormGroup>
  );
};

export default CanBeSold;
