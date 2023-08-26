import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const TextPreview = (props: any) => {
  const { txtValue, bgColor, textColor, bdRounded, fontSize, fontWeight } = props;

  return (
    <Box
      sx={{
        '& button': {
          padding: '10px 20px',
          backgroundColor: bgColor ?? '',
          color: textColor ?? '',
          borderRadius: `${bdRounded ?? 0}px`
        },
        '& button:hover': {
          backgroundColor: bgColor ?? '',
          opacity: 0.9
        },
        '& button:active': {
          boxShadow: `0 0 2px 2px ${bgColor}`
        },
        '& button::after': {
          boxShadow: `none`
        }
      }}
    >
      <Button size="small">
        <Typography
          sx={{
            color: textColor ?? '',
            fontSize: fontSize ?? 11,
            fontWeight: fontWeight?.value ?? 'normal'
          }}
        >
          {txtValue ?? ''}
        </Typography>
      </Button>
    </Box>
  );
};

export default TextPreview;
