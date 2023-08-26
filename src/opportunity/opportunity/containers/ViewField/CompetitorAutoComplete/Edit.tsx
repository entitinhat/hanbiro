import React from 'react';

import { CommonEditProps } from '@base/containers/ViewField/Common/interface';
import { Box } from '@mui/material';
import LinearProgressWithLabel from '@opportunity/components/LinearProgressWithLabel';
import CompetitorAutoComplete from '@competitor/containers/CompetitorAutoComplete';

interface EditProps extends CommonEditProps {
  value: any;
  onChange: (nValue: any) => void;
  componentProps?: {
    [x: string]: any;
  };
}

const Edit = (props: EditProps) => {
  const { value, onChange, componentProps } = props;

  const handleOnChange = (newValue: any) => {
    onChange && onChange(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CompetitorAutoComplete value={value} onChange={handleOnChange} {...componentProps} />
    </Box>
  );
};

export default Edit;
