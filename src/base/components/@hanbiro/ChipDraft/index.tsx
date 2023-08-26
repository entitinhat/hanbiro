import { Chip, useTheme } from '@mui/material';
import React from 'react';

const ChipDraft = () => {
  const theme = useTheme();
  return (
    <Chip
      variant="filled"
      sx={{ backgroundColor: theme.palette.secondary.lighter, color: 'inherit', display: 'inline-block', marginRight: 1 }}
      label="Draft"
      size="small"
    />
  );
};
export default ChipDraft;
