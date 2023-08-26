import HanAvatar from '@base/components/@hanbiro/HanAvatar';
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

interface ViewProps {
  value: any;
}
const View: React.FC<ViewProps> = (props: ViewProps) => {
  const { value: values = [] } = props;
  const theme = useTheme();
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
      {values &&
        values?.map((v: any, i: number) => {
          const name = v?.name ?? v?.fullName ?? '-No Name-';
          return (
            <Box
              key={i}
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: '30px',
                border: '1px solid ' + theme.palette.grey[200],
                mr: 1,
                px: '10px',
                py: '5px'
              }}
            >
              <Box>
                <HanAvatar name={name} size="sm" />
              </Box>
              <Typography ml={1}>{name}</Typography>
            </Box>
          );
        })}
    </Box>
  );
};

export default View;
