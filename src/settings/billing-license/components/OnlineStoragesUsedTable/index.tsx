import React, { Suspense, useState } from 'react';
//mui
import { Box, Typography, Stack, LinearProgress, linearProgressClasses, Button, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import MiModal from '@base/components/@hanbiro/MiModal';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#fd7e14' : '#fd7e48'
  }
}));
interface OnlineStorageUsedTable {
  handleOpen: () => void;
}
const OnlineStorageUsedTable = ({ handleOpen }: OnlineStorageUsedTable) => {
  const theme = useTheme();
  const border = `1px solid ${theme.palette.divider}`;

  return (
    <>
      <Box border={border}>
        <Box sx={{ borderBottom: border }} p={2}>
          <Typography fontWeight={500}>Online Storage Used</Typography>
        </Box>
        <Box sx={{ borderBottom: border }} p={2}>
          <Stack direction="row">
            <Box>
              <Typography>5GB used of 11GB(/a Domain)</Typography>
              <BorderLinearProgress variant="determinate" value={50} />
            </Box>
          </Stack>
        </Box>
        <Box p={2}>
          <Button
            size="small"
            onClick={() => {
              handleOpen();
            }}
            variant="contained"
          >
            Purchase Online Storage
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default OnlineStorageUsedTable;
