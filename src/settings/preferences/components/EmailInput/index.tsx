import { useEffect, useState } from 'react';
import _ from 'lodash';

//project
import { EmailType } from '@base/types/common';

//material
import { AddCircleOutline, AlternateEmail, CancelOutlined } from '@mui/icons-material';
import { Stack, TextField, Typography } from '@mui/material';

interface EmailInputProps {
  value: string;
  onChange: (val: string) => void;
  endText?: boolean;
}

const EmailInput = (props: EmailInputProps) => {
  const { value, onChange, endText = '' } = props;

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <TextField
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        InputProps={{ endAdornment: <AlternateEmail fontSize="small" color="secondary" /> }}
      />
      <Typography>{endText}</Typography>
    </Stack>
  );
};

export default EmailInput;
