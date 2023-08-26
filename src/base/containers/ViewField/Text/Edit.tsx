import React from 'react';

import { TextField } from '@mui/material';

import { CommonEditProps } from '../Common/interface';

interface EditProps extends CommonEditProps {
  value: string | number;
  onChange: (nValue: string | number) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return (
    <TextField
      autoComplete="off"
      autoFocus
      fullWidth
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      }}
      {...componentProps}
    />
  );
};

export default Edit;
