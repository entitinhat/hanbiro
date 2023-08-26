import React from 'react';
import { TextField } from '@mui/material';
import { CommonEditProps } from '../Common/interface';
interface EditProps extends CommonEditProps {
  value: string;
  onChange: (params: any) => {};
}

const TitleEdit = (props: EditProps) => {
  const { value, onChange } = props;
  return (
    <TextField
      autoFocus
      defaultValue={value}
      fullWidth
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      }}
    />
  );
};

export default TitleEdit;
