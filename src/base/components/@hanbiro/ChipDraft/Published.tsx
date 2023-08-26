import { Chip, useTheme } from '@mui/material';
import React from 'react';

const ChipPublished = () => {
  const theme = useTheme();
  return (
    <Chip
      variant="filled"
      sx={{ backgroundColor: theme.palette.success.lighter, color: theme.palette.success.main, display: 'inline-block', marginRight: 1 }}
      label="Published"
      size="small"
    />
  );
};
export default ChipPublished;
