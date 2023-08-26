import { Grid, styled } from '@mui/material';

export const ToolBarItem = styled(Grid)(({ theme }) => ({
  position: 'relative',
  // '&:hover': {
  //   backgroundColor: ' rgba(0, 0, 0, 0.04)',
  //   cursor: 'pointer'
  // },
  display: 'flex',
  alignItems: 'center',
  '&:after': {
    content: '""',
    height: '20px', //You can change this if you want smaller/bigger borders
    width: '1px',

    position: 'absolute',
    right: 0,
    top: '50%', // If you want to set a smaller height and center it, change this value
    transform: 'translateY(-50%)',
    backgroundColor: theme.palette.divider // The color of your border
  }
}));
