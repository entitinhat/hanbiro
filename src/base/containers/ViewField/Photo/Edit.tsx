import React from 'react';
import ImageUpload from '@base/components/@hanbiro/ImageUpload';
import { Box } from '@mui/material';

const Edit: React.FC<any> = (props: any) => {
  const { value, onChange } = props;

  return (
    <Box justifyContent={'center'} alignItems={'center'} sx={{ display: 'flex', marginRight: '3px' }}>
      <ImageUpload value={value} onChange={onChange} />
    </Box>
  );
};

export default Edit;
