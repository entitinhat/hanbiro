import React from 'react';

import { TextField } from '@mui/material';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;
  return (
    <TextField
      autoFocus
      fullWidth
      value={value?.name}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
          name: event.target.value,
          isPrioritize: value?.isPrioritize
        });
      }}
      {...componentProps}
    />
  );
};

export default Edit;
