import React, { useEffect } from 'react';
import { TextField } from '@mui/material';
import { CommonEditProps } from '../Common/interface';

interface EditProps extends CommonEditProps {
  value: string;
  onChange: (nValue: string) => void;
}

const Edit = (props: EditProps) => {
  const { value, onChange } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(event.target.value);
  };

  return <TextField fullWidth focused multiline rows={4} value={value} onChange={handleChange} />;
};

export default Edit;
